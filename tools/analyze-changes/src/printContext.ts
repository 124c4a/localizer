import { Context } from './common';

export function printContext(ctx: Context) {
  console.log('Major Changes:');
  if (ctx.majorChanges && ctx.majorChanges.length > 0) {
    ctx.majorChanges.forEach((file) => console.log(`- ${file}`));
  } else {
    console.log('No major changes detected.');
  }

  console.log('\nMinor Changes:');
  if (ctx.minorChanges && ctx.minorChanges.length > 0) {
    ctx.minorChanges.forEach((file) => console.log(`- ${file}`));
  } else {
    console.log('No minor changes detected.');
  }

  console.log('\nModule Names:');
  if (ctx.moduleNames && Object.keys(ctx.moduleNames).length > 0) {
    for (const [file, name] of Object.entries(ctx.moduleNames)) {
      console.log(`File: ${file}, Module: ${name}`);
    }
  }

  console.log('\nFile Changes:');
  if (ctx.fileChanges && Object.keys(ctx.fileChanges).length > 0) {
    for (const [file, changes] of Object.entries(ctx.fileChanges)) {
      console.log(`File: ${file}`);
      changes.forEach((change) =>
        console.log(`- ${change.type} (${change.hash}): ${change.description}`),
      );
    }
  }

  console.log('\nModule Changes:');
  if (ctx.moduleChanges && Object.keys(ctx.moduleChanges).length > 0) {
    for (const [module, files] of Object.entries(ctx.moduleChanges)) {
      console.log(`Module: ${module}`);
      files.forEach((file) => console.log(`- ${file}`));
    }
  } else {
    console.log('No module changes detected.');
  }

  console.log('\nModule Levels:');
  if (ctx.moduleLevels && Object.keys(ctx.moduleLevels).length > 0) {
    for (const [module, level] of Object.entries(ctx.moduleLevels)) {
      console.log(`Module: ${module}, Level: ${level}`);
    }
  }
}
