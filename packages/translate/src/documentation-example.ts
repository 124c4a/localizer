import { loc } from '@localizer/core';
import { transform, upperCase } from '@localizer/transform';

const localizable = loc((locale) => `Hello, ${locale}!`);

const transformed = transform(localizable, [upperCase]);
// Get the implicit localizer
console.log(transformed.localize('en')); // Output: HELLO, EN!
