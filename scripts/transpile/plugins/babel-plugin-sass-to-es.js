const path = require('path');

// This plugin transpiles sass imports to imports from dist/es
// this solves the problem for ssr where we have classname mismatch.

function transpileSASS(api, state) {
  const originalPath = api.node.source.value;
  if (/[A-Za-z]*\.scss/.test(originalPath)) {
    const { file } = state;

    // we check which files tries to import the sass file
    const ComponentFile = file.opts.generatorOpts.sourceFileName;

    // then we can get absolute path of sass file
    const absolutePathSass = path.resolve(
      file.opts.filename.replace(ComponentFile, ''),
      originalPath,
    );

    // we construct sass import to be from es folder
    const sassES = absolutePathSass.replace('src/', 'dist/es/src/');

    // we construct the component that tries to import sass file to be in
    // common js path
    const fileCJS = file.opts.filename
      .replace(ComponentFile, '')
      .replace('src/', 'dist/src/');

    // we get a relative path for component to import from es
    const relative = path.relative(fileCJS, sassES);

    api.node.source.value = relative;
  }
}

module.exports = function() {
  return {
    name: 'sass-to-es',
    visitor: {
      ImportDeclaration(api, state) {
        transpileSASS(api, state);
      },
    },
  };
};
