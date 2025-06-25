---
order: 2
---

# Configuration <Badge type="info" text="@localizer/core" />

While most of the functionality in `@localizer` is stateless, certain aspects can be customized at runtime using the [`configure()`](../api/_localizer/core/configure/index.md) method. It is recommended to apply configuration changes as early as possible, ideally within the application shell, to ensure consistent behavior throughout the application lifecycle.

The `configure()` method takes two parameters: an array of configuration domains and a configuration object. The configuration domains specify which parts of the library you want to configure, while the configuration object provides the corresponding settings for those domains.

```typescript
import { configure, Core } from '@localizer/core';
import { DefaultDecimalFormat } from '@localizer/format';

const configuration = {
  Core: {
    fallbackLocales: ['fi', 'en'];
  },
  DefaultDecimalFormat: {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
}

configure([Core, DefaultDecimalFormat], configuration);
```

Below is a list of configuration domains that can be customized using the `configure()` method.
Each domain corresponds to a specific aspect of the library, enabling fine-grained control over its behavior.

## [Core](../api/_localizer/core/CoreOptions/index.md) <Badge type="info" text="@localizer/core" />

This is the basic configuration for `@localizer`. Below are the key configuration properties available:

```typescript
configure([Core], {
  Core: {
    fallbackLocales: ['en'],
    activeLocale: undefined,
  },
});
```

---

### `fallbackLocales`

Specifies an ordered list of fallback locale codes to use when a translation for the requested locale is unavailable in the dictionary. For more information, refer to the [locale resolution process](./localizer.md#locale-resolution).

**Type:** `LocaleCode[]`

**Default:** `['en']`

---

### `activeLocale` <Badge type="warning" text="experimental" />

Activates [implicit localization](./localizer.md#implicit-localization) by defining the current locale. If left undefined, implicit localization remains disabled.

**Type:** `LocaleCode | undefined`

**Default:** `undefined`

::: tip

You can also use the [`setActiveLocale()`](../api/_localizer/core/setActiveLocale/index.md) method to dynamically change the active locale when using implicit localization mode. This allows you to update the current locale at runtime as needed:

```typescript
import { setActiveLocale } from '@localizer/core';

setActiveLocale('en');
```

:::
