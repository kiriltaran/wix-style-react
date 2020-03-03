const execa = require('execa');

const options = { stdio: 'pipe', env: { FORCE_COLOR: true } };

module.exports = function({ name, progress, opts }) {
  return new Promise((resolve, reject) => {
    try {
      const promise = execa
        .shell(
          `babel ${name} --out-dir dist/${name} --copy-files --plugins=@babel/plugin-transform-modules-commonjs`,
          {
            ...options,
          },
        )
        .then(() => {
          progress.tick(opts.step, {
            dir: opts.desc,
          });
        });

      return resolve(promise);
    } catch (e) {
      reject(e);
    }
  });
};
