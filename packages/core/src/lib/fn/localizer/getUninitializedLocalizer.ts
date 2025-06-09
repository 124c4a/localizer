import { Localizer } from '../../types/localizer.js';

const _uninitializedLocalizer = ((): never => {
  throw new TypeError('Attempt to use Localizer before locale was set');
}) as unknown as Localizer;

/**
 * Retrieves the uninitialized `Localizer`.
 *
 * The `getUninitializedLocalizer` function returns the singleton localizer instance,
 * which throws an error when used. This function is useful for scenarios where
 * a `Localizer` is required but has not yet been initialized.
 *
 * @returns {Localizer} The uninitialized `Localizer` that throws an error when invoked.
 *
 * @internal
 */
export function getUninitializedLocalizer(): Localizer {
  return _uninitializedLocalizer;
}
