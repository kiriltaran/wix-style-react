const rm = require('rimraf');
const mkdirp = require('mkdirp');

module.exports = function({ progress, opts }) {
  return new Promise((resolve, reject) => {
    try {
      rm.sync('./dist');
      mkdirp.sync('./dist');
      resolve(progress.tick(opts.step, { dir: opts.desc }));
    } catch (e) {
      progress.interrupt('Error');
      reject(e);
    }
  });
};
