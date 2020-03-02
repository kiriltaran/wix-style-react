const resolve = require('path').resolve;

// This plugin transpiles sass imports for commonjs to imports from dist/es
// this solves the problem for ssr where we have classname mismatch.

module.exports = function() {
  return {
    name: 'sass-to-es',
    visitor: {
      ImportDeclaration(path, state) {
        const originalPath = path.node.source.value;

        if (/[A-Za-z]*\.scss/.test(originalPath)) {
          const { file } = state;

          // we check which files tries to import the sass file
          const ComponentFile = file.opts.generatorOpts.sourceFileName;

          // then we can get absolute path of sass file
          const absolutePath = resolve(
            file.opts.filename.replace(ComponentFile, ''),
            originalPath,
          );

          // we remove the project root
          const projectRoot = absolutePath.match(
            /.+?(?=wix-style-react)wix-style-react\/src\//,
          )[0];
          const srcPath = absolutePath.replace(projectRoot, '');

          // finally construct sass import
          path.node.source.value = `../../es/dist/src/${srcPath}`;
        }
      },
    },
  };
};
