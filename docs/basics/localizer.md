---
order: 4
---

# Localizer <Badge type="info" text="@localizer/core" />

<script setup>
  import localizerString from './localizer-string';
  import localizerFunction from './localizer-function';
  import localizerImplicit from './localizer-implicit';
  import localizerIdentity from './localizer-identity';
</script>

Localizer is a utility function designed to apply a selected locale to [`Localizable`](./localizable.md) objects. The primary method to obtain an instance of a `Localizer` is by invoking the `getLocalizer()` function:

<<< ./localizer-string.ts#example{ts}

```console-vue
{{ localizerString }}
```

A `Localizer` function can process either a `Localizable` object directly or a function that generates a `Localizable` object, such as a value formatter. When provided with a function, the `Localizer` returns a new function that accepts the same arguments but produces a localized string as its output:

<<< ./localizer-function.ts#example{ts}

```console-vue
{{ localizerFunction }}
```

## Locale resolution

Localizable objects typically accept a single locale and perform localization based on that value. However, in the context of translations, it is common for translations to be defined at the _language_ level (e.g., `en` for English) rather than the _locale_ level (e.g., `en-US` for U.S. English). This distinction can lead to situations where translations for a specific locale are incomplete, making it necessary to fall back to a predefined set of locales.

The fallback mechanism is controlled by the [`fallbackLocales`](./configuration.md#fallbacklocales) configuration property. Below is an example of how locale resolution works with the default configuration (`fallbackLocales` set to `['en']`):

| Input Locale | Resolution Chain      |
| ------------ | --------------------- |
| `en`         | `en`                  |
| `en-US`      | `en-US` → `en`        |
| `sv-FI`      | `sv-FI` → `sv` → `en` |

In the example above:

- For `en`, the library directly uses the `en` translations.
- For `en-US`, the library first attempts to use `en-US` translations. If unavailable, it falls back to `en`.
- For `sv-FI`, the library tries `sv-FI` first, then `sv`, and finally falls back to `en`.

This fallback mechanism ensures that translations are as complete as possible, even when specific locale data is missing.

## Implicit localization <Badge type="warning" text="experimental" />

In scenarios where strict typing becomes cumbersome, such as during the development of _throw-away_ prototypes, explicitly applying `Localizer` functions to localizable objects may feel overly burdensome. To streamline such workflows, the library offers an _implicit_ localization feature. This feature can be enabled either through the [`activeLocale`](./configuration.md#activelocale) configuration property or by using the `setActiveLocale()` function, allowing for a more lightweight approach to localization during rapid prototyping.

<<< ./localizer-implicit.ts#example{ts}

```console-vue
{{ localizerImplicit }}
```

::: warning
It is strongly recommended to avoid using implicit localization in production applications. This approach may inadvertently allow plain stringification in scenarios where precise, locale-aware formatting is required, potentially leading to inconsistent or incorrect outputs.
:::

## Special localizers

### `UninitializedLocalizer`

This special localizer is designed to throw a `TypeError` whenever it is invoked. Its primary purpose is to assist in identifying and debugging race conditions related to improper or delayed locale initialization.

```typescript
import { UninitializedLocalizer, Empty } from '@localizer/core';

console.log(UninitializedLocalizer(Empty)); // [!code error]
> RangeError: Attempt to use Localizer before locale was set // [!code error]
```

### `ImplicitLocalizer` <Badge type="warning" text="experimental" />

This special localizer facilitates [implicit localization](#implicit-localization), making it particularly useful when working with external libraries that require a `Localizer` as input. By leveraging this localizer, you can simplify integration scenarios where explicit localization might otherwise be cumbersome or impractical.

### `IdentityLocalizer` <Badge type="warning" text="experimental" />

This special localizer enables the use of `Localizable` values directly as stable identifiers. This can be particularly useful for scenarios such as assigning `test-id` attributes in UI components or other cases where consistent, human-readable identifiers are preferred.

<<< ./localizer-identity.ts#example{ts}

```console-vue
{{ localizerIdentity }}
```
