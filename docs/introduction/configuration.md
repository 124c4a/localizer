---
order: 2
---

# Configuration <Package name="core"/>

Use the [`configure()`](../api/_localizer/core/configure/index.md) method to customize **@localizer** behavior. Apply configuration early, preferably in the application shell, for consistent behavior throughout the app lifecycle.

The `configure()` method offers maximum flexibility by accepting two arguments: an array of configuration domains and a corresponding configuration object. The domains specify the library components to configure, while the configuration object defines their respective settings.

```typescript
import { configure, Core } from '@localizer/core';

const configuration = {
  Core: {
    fallbackLocales: ['fi', 'en'];
  },
}

configure({ Core }, configuration);
```

This approach centralizes configuration in a single location while providing the flexibility to selectively configure specific domains as needed.

When only one single domain needs to be configured, it is possible to use simpler notation:

```typescript
import { configure, Core } from '@localizer/core';

configure(Core, { fallbackLocales: ['fi', 'en'] });
```

Below is a list of configuration domains that can be customized using the `configure()` method.
Each domain corresponds to a specific aspect of the library, enabling fine-grained control over its behavior.

## [Core](../api/_localizer/core/CoreOptions/index.md) <Package name="core"/>

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

### `activeLocale` <Experimental/>

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
