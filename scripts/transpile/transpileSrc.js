/* eslint no-console: 0 */

const copy = require('copy');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { parse } = require('@babel/parser');
const { transformFromAstAsync } = require('@babel/core');

const srcDir = path.resolve(__dirname, '../../dist');
const esDir = path.resolve(__dirname, '../../dist/es');

const srcToEsBabelPlugin = path.resolve(
  __dirname,
  './plugins/babel-plugin-src-to-es.js',
);

const sassToES = path.resolve(
  __dirname,
  './plugins/babel-plugin-sass-to-es.js',
);

const readFileAsync = fileLoc => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileLoc, 'utf8', (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
};

const writeFileAsync = (fileLoc, dir, code) => {
  const fullPath = path.join(dir, fileLoc);
  return new Promise((resolve, reject) => {
    mkdirp(path.parse(fullPath).dir, () => {
      fs.writeFile(fullPath, code, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
};

const copyAsync = ({ src, dist, withESTransform }) => {
  return new Promise((resolve, reject) => {
    copy(src, dist, function(err, files) {
      files.forEach(file => {
        if (withESTransform && file.dest.includes('st.css')) {
          fs.readFile(file.dest, 'utf-8', function(error, content) {
            content = content
              .replace(
                /wix-ui-backoffice\/dist\/src/g,
                'wix-ui-backoffice/dist/es/src',
              )
              .replace(/wix-ui-core\/dist\/src/g, 'wix-ui-core/dist/es/src');
            fs.writeFile(file.dest, content, function(writeErr) {
              if (writeErr) {
                console.warn(writeErr);
              }
            });
          });
        }
      });
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
};

const run = () => {
  const esCopied = copyAsync({
    src: './src/**/!(*.js)',
    dist: './dist/es/src',
    withESTransform: true,
  });
  const srcCopied = copyAsync({
    src: './src/**/!(*.js)',
    dist: './dist/src',
  });

  const files = glob.sync('./src/**/*.js', {
    ignore: [
      './src/**/*.story.js',
      './src/**/test/**/*',
      './src/**/docs/**/*',
      './src/**/*.meta.js',
      './src/**/*.spec.js',
      './src/**/*.e2e.js',
    ],
  });

  const result = Promise.all(
    files
      .map(async fileLoc => {
        const fileContent = await readFileAsync(fileLoc, 'utf8');

        const ast = parse(fileContent, {
          sourceType: 'module',
          tokens: false,
          plugins: [
            'jsx',
            'asyncGenerators',
            'classProperties',
            'decorators-legacy',
            'dynamicImport',
            'exportDefaultFrom',
            'exportNamespaceFrom',
            'objectRestSpread',
          ],
        });

        // transform wix-ui-core/dist/es/src to wix-ui-core/dist/src for es modules
        const transformedWithModules = await transformFromAstAsync(ast, null, {
          babelrc: true,
          ast: true,
          filename: fileLoc,
          plugins: [[srcToEsBabelPlugin, { esToSrc: false }]],
        });

        const writeModules = writeFileAsync(
          fileLoc,
          esDir,
          transformedWithModules.code,
        );

        // transform wix-ui-core/dist/es/src to wix-ui-core/dist/src for commonjs
        const transformedES5 = await transformFromAstAsync(
          transformedWithModules.ast,
          null,
          {
            babelrc: false,
            ast: false,
            filename: fileLoc,
            plugins: [
              [srcToEsBabelPlugin, { esToSrc: true }],
              sassToES,
              '@babel/plugin-transform-modules-commonjs',
              'babel-plugin-dynamic-import-node',
            ],
          },
        );

        return Promise.all([
          writeModules,
          writeFileAsync(fileLoc, srcDir, transformedES5.code),
        ]);
      })
      .concat(esCopied, srcCopied),
  );
  return result;
};

module.exports = run;
