---
order: 4
---

# Localizer <Package name="core"/>

<script setup>
  import localizerString from './localizer-string';
  import localizerFunction from './localizer-function';
  import localizerImplicit from './localizer-implicit';
</script>

Localizer applies a selected locale to [`Localizable`](../api/_localizer/core/Localizable/index.md) objects. Use [`getLocalizer()`](../api/_localizer/core/getLocalizer/index.md) to create a `Localizer` instance.

<<< ./localizer-string.ts#example{ts}

```console-vue
{{ localizerString }}
```

A `Localizer` can process a `Localizable` object or a function that generates one, such as a value formatter. When given a function, it returns a new function that produces a localized string.

<<< ./localizer-function.ts#example{ts}

```console-vue
{{ localizerFunction }}
```

## Locale resolution

Translations are often defined at the _language_ level (e.g., `en` for English) rather than the _locale_ level (e.g., `en-US` for U.S. English). When specific locale translations are incomplete, the library falls back to a predefined set of locales to ensure comprehensive coverage.

The fallback mechanism is controlled by the [`fallbackLocales`](./configuration.md#fallbacklocales) configuration property. Below is an example of how locale resolution works with the default configuration (`fallbackLocales` set to `['en']`):

| Input Locale | Resolution Chain      |
| ------------ | --------------------- |
| `en`         | `en`                  |
| `en-US`      | `en-US` → `en`        |
| `sv-FI`      | `sv-FI` → `sv` → `en` |

For `en`, the library uses `en` translations.
For `en-US`, it tries `en-US` first, then falls back to `en`.
For `sv-FI`, it checks `sv-FI`, then `sv`, and finally `en`.

This ensures translations remain comprehensive even with missing locale data.

## Implicit localization <Experimental/>

In rapid prototyping, applying `Localizer` functions explicitly can be tedious. The library supports _implicit_ localization, activated via the [`activeLocale`](./configuration.md#activelocale) property or the [`setActiveLocale()`](../api/_localizer/core/setActiveLocale/index.md) function, simplifying workflows for temporary projects.

<<< ./localizer-implicit.ts#example{ts}

```console-vue
{{ localizerImplicit }}
```

::: warning

Implicit localization is not recommended for production use, as it may lead to inconsistent or incorrect outputs due to accidental plain stringification instead of precise, locale-aware formatting.

:::

## Special localizers

### `UninitializedLocalizer`

This localizer throws a `TypeError` when invoked, helping identify race conditions caused by delayed or improper locale initialization.

```typescript
import { UninitializedLocalizer, Empty } from '@localizer/core';

console.log(UninitializedLocalizer(Empty)); // [!code error]
> RangeError: Attempt to use Localizer before locale was set // [!code error]
```

### `TestLocalizer` <Experimental/>

This localizer consistently produces locale-independent machine representations of localizable values. It is particularly useful for unit or integration testing, where ensuring reproducibility and avoiding locale-specific variations is critical.

```typescript
import { TestLocalizer } from '@localizer/format';
import { decimal, date } from '@localizer/format';
import { dictionary } from '@localizer/translate';

const translations = dictionary({
  files: (count: number) => ({
    en: loc`${decimal(count)} files`,
    fi: loc`${decimal(count)} tiedostoa`,
    sv: loc`${decimal(count)} filer`,
  }),
});

describe('TestLocalizer', () => {
  it('should produce locale-independent representations', () => {
    expect(TestLocalizer(date(1751555555000))).toBe('"2025-07-03T15:12:35.000Z"');
    expect(TestLocalizer(translations.files(5))).toBe('files(5)');
  });
});
```
