/* eslint no-console: 0 */
const ProgressBar = require('progress');

const STEPS = 5;
const TOTAL_STEPS_WIDTH = 20;
const START_TIME = new Date();
const STEP_WIDTH = TOTAL_STEPS_WIDTH / STEPS;

const progress = new ProgressBar(
  'Transpiling `src` -> `dist` :bar :percent :dir',
  {
    total: STEP_WIDTH * STEPS,
  },
);

const makeTask = params =>
  require(params.path)({
    ...params,
    progress,
    opts: {
      step: STEP_WIDTH,
      desc: params.progress,
    },
  });

const tasks = [
  {
    task: () =>
      makeTask({
        path: './tasks/cleanDist',
        progress: 'cleaning ./dist',
      }),
  },
  {
    task: () =>
      makeTask({
        path: './tasks/transpileCopyFiles',
        name: 'testkit',
        progress: 'transpile testkit => dist/testkit',
      }),
  },
  {
    task: () =>
      makeTask({
        path: './tasks/transpileCopyFiles',
        name: 'test',
        progress: 'transpile test => dist/test',
      }),
  },
  {
    task: () =>
      makeTask({
        path: './tasks/transpileSrc',
        progress: 'transpile src => dist/src ',
      }),
  },
  {
    task: () =>
      makeTask({
        path: './tasks/replaceStylableImports',
        progress: 'stylable /dist/src => /dist/es/src',
      }),
  },
  {
    task: () =>
      console.log(`🚀 Done in ${Math.round(new Date() - START_TIME) / 1000}s`),
  },
];

tasks.reduce(
  (promise, { task }) => promise.then(() => task()),
  Promise.resolve(),
);
