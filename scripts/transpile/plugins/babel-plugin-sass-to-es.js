const path = require('path');

// This plugin transpiles sass imports to imports from dist/es
// this solves the problem for ssr where we have classname mismatch.

module.exports = function() {
  return {
    name: 'sass-to-es',
    visitor: {
      ImportDeclaration(api, state) {
        const originalPath = api.node.source.value;

        if (/[A-Za-z]*\.scss/.test(originalPath)) {
          const { file } = state;

          // we check which files tries to import the sass file
          const ComponentFile = file.opts.generatorOpts.sourceFileName;

          // then we can get absolute path of sass file
          const absolutePath = path.resolve(
            file.opts.filename.replace(ComponentFile, ''),
            originalPath,
          );

          const es = absolutePath.replace('src/', 'dist/es/src/');
          const cjs = absolutePath.replace('src/', 'dist/src/');

          const relative = path.relative(cjs, es);

          // finally construct sass import
          api.node.source.value = relative;
        }
      },
    },
  };
};
