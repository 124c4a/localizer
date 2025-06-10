import { Listr } from 'listr2';

import { currencyTasks } from './currency';
import { localeTasks } from './locale';
import { writeUnitTs } from './unit';

/**
 * Main entry point for the data generation tool.
 */
const tasks = new Listr(
  [
    {
      title: 'Generating locales',
      task: () => localeTasks,
    },
    {
      title: 'Generating currencies',
      task: () => currencyTasks,
    },
    {
      title: 'Generating units',
      task: writeUnitTs,
    },
  ],
  { concurrent: true }
);

tasks
  .run()
  .then(async () => undefined)
  .catch((err) => {
    console.error(err);
  });
