---
order: 2
---

# Configuration <Badge type="info" text="@localizer/core" />

Use the [`configure()`](../api/_localizer/core/configure/index.md) method to customize **@localizer** behavior. Apply configuration early, preferably in the application shell, for consistent behavior throughout the app lifecycle.

The `configure()` method accepts two arguments: an array of configuration domains and a configuration object. The domains define the library components to configure, and the object specifies their settings.

```typescript
import { configure, Core } from '@localizer/core';

const configuration = {
  Core: {
    fallbackLocales: ['fi', 'en'];
  },
}

configure({ Core }, configuration);
```

Below is a list of configuration domains that can be customized using the `configure()` method.
Each domain corresponds to a specific aspect of the library, enabling fine-grained control over its behavior.

## [Core](../api/_localizer/core/CoreOptions/index.md) <Badge type="info" text="@localizer/core" />

This is the basic configuration for **@localizer**. Below are the key configuration properties available:

```typescript
configure(
  { Core },
  {
    Core: {
      fallbackLocales: ['en'],
      activeLocale: undefined,
    },
  },
);
```

---

### `fallbackLocales`

Defines fallback locales used when a translation is missing. See the [locale resolution process](./localizer.md#locale-resolution) for details.

**Type:** `LocaleCode[]`

**Default:** `['en']`

---

### `activeLocale` <Badge type="warning" text="experimental" />

Enables [implicit localization](./localizer.md#implicit-localization) by setting the current locale. If undefined, implicit localization is disabled.

**Type:** `LocaleCode | undefined`

**Default:** `undefined`

::: tip

You can dynamically change the active locale at runtime using the [`setActiveLocale()`](../api/_localizer/core/setActiveLocale/index.md) method:

```typescript
import { setActiveLocale } from '@localizer/core';

setActiveLocale('en');
```

:::
