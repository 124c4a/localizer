---
title: Vue.js
card:
  title: Vue.js
  icon: /vuejs.svg
  kind: ['ui', 'guide']
  related:
    - vanilla
---

# Localization in Vue.js <Experimental /> <Package name="x-vue" />

The library provides low-effort integration with Vue.js UI framework.

::: tip REQUIREMENTS

- [Vue.js](https://vuejs.org/) **^3.4.0**

:::

## Quick start

This guide provides step-by-step instructions for integrating **@localizer** into your Vue.js applications. For a broader overview and advanced topics unrelated to Vue.js, see the [Getting Started](../../introduction/getting-started.md) section.

### 1. Installation

To get started, install `@localizer/all` and `@localizer/x-vue` packages. Use one of the following commands based on your package manager:

::: code-group

```sh [npm]
npm install @localizer/all @localizer/x-vue
```

```sh [pnpm]
pnpm install @localizer/all @localizer/x-vue
```

```sh [yarn]
yarn add @localizer/all @localizer/x-vue
```

```sh [bun]
bun add @localizer/all @localizer/x-vue
```

:::

### 2. Registration

To enable seamless integration with Vue.js and provide a global localization context, register the `localizerPlugin` with your Vue application. This step ensures that localization features are available throughout your app.

```typescript twoslash
import { createApp } from 'vue';
import localizerPlugin from '@localizer/x-vue'; //[!code ++]

const app = createApp({
  /* root component options */
});
app.use(localizerPlugin); //[!code ++]
```

Plugin registration is an optional step that globally sets up the localization context with the provided initial locale. Additionally, it registers custom components like [`<x-localization-context>`](#localizationcontext) and [`<x-localized>`](#localized), making them available throughout your application for seamless integration.

For additional configuration options and advanced usage, refer to the [plugin options](#plugin-options) section. This section provides detailed information on customizing the plugin to suit your application's specific localization needs.

### 3. Usage

With the localization context set up, you can now leverage the full range of localization features provided by the library. These features enable you to seamlessly translate content, format dates, numbers, and currencies, and manage dynamic locale changes within your Vue.js application.

::: code-group

```vue [Component.vue]
<script setup lang="ts">
  import { useLocalizer } from '@localizer/x-vue';
  import { CurrentLanguage } from '@localizer/format';

  const { localize } = useLocalizer();
</script>

<template>
  <div>{{ localize(CurrentLanguage) }}</div>
</template>
```

```tsx [Component.tsx]
import { useLocalizer } from '@localizer/x-vue';
import { CurrentLanguage } from '@localizer/format';

export default defineComponent(() => {
  const { localize } = useLocalizer();

  return () => <div>{localize(CurrentLanguage)}</div>;
});
```

:::

For more details on how to use the localization functionality, refer to the [`useLocalizer()`](#uselocalizer) section. This section provides an in-depth explanation of its API and practical examples to help you integrate it effectively into your Vue.js components.

## `useLocalizer()`

`useLocalizer()` is a utility, that provides components with localization functions and allows to change current language (locale). Similar to lifecycle hook registration APIs, `useLocalizer()` must be called synchronously during a component's `setup()` phase.

`useLocalizer()` tracks the current localization context, defined via [plugin registration](#_2-registration) or [`<LocalizationContext>`](#localizationcontext). If none of those are used, it takes the default localizer, globally set via [global configuration](#global-configuration).

::: danger

If there is no global context defined via plugin or `<LocalizationContext>`, retrieved localizer will throw an Error on localization attempts. Make sure to set `defaultLocalizer` in [global configuration](#global-configuration) to use localization features without localization contexts.

:::

The function offers the following core features:

- **Localization functions**: Includes `localize`, `localizeArray`, and `localizeObject`. These functions are bound to the currently active locale, enabling seamless localization of values, formatters, arrays, and objects. For detailed usage, refer to [localizing values](../../introduction/localizer.md), [localizing array items](../../introduction/helpers.md#localizing-array-items), and [localizing object properties](../../introduction/helpers.md#localizing-object-properties).

  ```typescript twoslash
  import { useLocalizer } from '@localizer/x-vue';

  function setup() {
    const { localize, localizeArray, localizeObject } = useLocalizer();

    // ...
  }
  ```

- **Accessing the active locale**: The `activeLocale` property allows you to retrieve the currently active locale.

  ```typescript twoslash
  import { useLocalizer } from '@localizer/x-vue';

  function setup() {
    const { activeLocale } = useLocalizer();

    // ...
  }
  ```

- **Updating the active locale**: Calling the asynchronous `setActiveLocale` method dynamically updates the active locale for the current context. This can be either the global context (set up during [plugin registration](#_2-registration)) or a local context created using [`<LocalizationContext>`](#localizationcontext).

  ```typescript twoslash
  import { useLocalizer } from '@localizer/x-vue';

  function setup() {
    const { setActiveLocale } = useLocalizer();
    setActiveLocale('en-US');

    // ...
  }
  ```

## `<LocalizationContext>`

This component can be used to create a local localization context and allow changing selected locale. Localization context can be accessed by [`useLocalizer()`](#uselocalizer) and [`<Localized>`](#localized) down the component tree.

Component provides the following properties:

| Property  | Type         | Default value                                                                                             | Description                                                                                                                                                                                           |
| --------- | ------------ | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale?` | `LocaleCode` | First fallback locale, set in [global configuration](../../introduction/configuration.md#fallbacklocales) | Active locale for current localization context. If not specified, it will use the fallback locale value. Changing this property will automatically update all child components that use localization. |

Component emits the following events:

| Event           | Payload      | Description                                                                                                                                                                                                                                      |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `update:locale` | `LocaleCode` | This event is emitted each time current locale is changed from child components via [`useLocalizer()`](#uselocalizer). This event is not emitted, if active locale is changed via `locale` property. It can be used to persist language changes. |

**Example use:**

::: code-group

```vue twoslash [App.vue]
<script setup lang="ts">
  import { LocaleCode } from '@localizer/core';
  import { LocalizationContext } from '@localizer/x-vue';

  const handleLocaleChange = (locale: LocaleCode) => {
    console.log(`New locale: ${locale}`);
  };
</script>

<template>
  <LocalizationContext locale="en-US" @update:locale="handleLocaleChange">
    <slot></slot>
  </LocalizationContext>
</template>
```

```tsx [App.tsx]
import { defineComponent } from 'vue';
import { LocaleCode } from '@localizer/core';
import { LocalizationContext } from '@localizer/x-vue';

export default defineComponent((props, { slots }) => {
  const handleLocaleChange = (locale: LocaleCode) => {
    console.log(`New locale: ${locale}`);
  };

  return () => (
    <LocalizationContext locale="en-US" onUpdate:locale={handleLocaleChange}>
      {slots.default?.()}
    </LocalizationContext>
  );
});
```

:::

::: tip

When [plugin registration](#_2-registration) is done, the component is also globally available as `<x‑localizer‑context>`.

:::

## `<Localized>`

This component serves as a simpler alternative to [`useLocalizer()`](#uselocalizer) for localizing values. It offers the following properties:

| Property   | Type                                               | Default value                                    | Description                                                                        |
| ---------- | -------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `content?` | [`Localizable`](../../introduction/localizable.md) | [`Empty`](../../introduction/constants/empty.md) | The value to localize. If the value is `undefined`, empty string will be rendered. |

**Example use:**

::: code-group

```vue twoslash [Component.vue]
<script setup lang="ts">
  import { CurrentLanguage } from '@localizer/format';
  import { Localized } from '@localizer/x-vue';
</script>

<template>
  <Localized :content="CurrentLanguage" />
</template>
```

```tsx [Component.tsx]
import { defineComponent } from 'vue';
import { CurrentLanguage } from '@localizer/format';
import { Localized } from '@localizer/x-vue';

export default defineComponent(() => {
  return () => <Localized content={CurrentLanguage} />;
});
```

:::

::: tip

When [plugin registration](#_2-registration) is done, the component is also globally available as `<x‑localized>`.

:::

## Plugin options

The Vue.js plugin accepts the following configuration properties:

- **`useGlobalContext`**: A boolean that determines whether a global localization context is created. When set to `false`, you must explicitly use the [`<LocalizationContext>`](#localizationcontext) component to enable localization functionality. Defaults to `true`.

- **`initialLocale`**: Specifies the initial locale for the global localization context. This property is ignored if `useGlobalContext` is set to `false`. Defaults to the fallback locale defined in the [global configuration](../../introduction/configuration.md#fallbacklocales).

For detailed examples and usage, refer to the sections below.

---

### `useGlobalContext`

Determines whether a global localization context is created. When disabled, you must explicitly use [`<LocalizationContext>`](#localizationcontext) to enable localization functionality. By default, the global localization context is enabled.

**Type:** `boolean`

**Default:** `true`

**Usage:**

```typescript twoslash
import { createApp } from 'vue';
import localizerPlugin from '@localizer/x-vue'; // [!code ++]

const app = createApp({
  /* root component options */
});
app.use(localizerPlugin, { useGlobalContext: false }); // [!code ++]
```

---

### `initialLocale`

Sets the initial locale for the global localization context. This option is ignored if `useGlobalContext` is set to `false`.

**Type:** `LocaleCode`

**Default:** fallback locale defined in [global configuration](../../introduction/configuration.md#fallbacklocales).

**Usage:**

```typescript twoslash
import { createApp } from 'vue';
import localizerPlugin from '@localizer/x-vue'; // [!code ++]

const app = createApp({
  /* root component options */
});
app.use(localizerPlugin, { initialLocale: 'en-US' }); // [!code ++]
```

## Global configuration

This configuration allows to change the default behavior of Vue.js integration:

```typescript twoslash
import { configure, UninitializedLocalizer } from '@localizer/core';
import { VueIntegration } from '@localizer/x-vue';

configure(
  { VueIntegration },
  {
    VueIntegration: {
      defaultLocalizer: UninitializedLocalizer,
    },
  },
);
```

---

### `defaultLocalizer`

Specifies the default localizer to be used when no localization context is available. If not configured, any attempt to localize values without an active context will result in an error.

This option is useful for reliable [unit testing](#testing).

**Type:** `Localizer`

**Default:** [`UninitializedLocalizer`](../../introduction/localizer.md#uninitializedlocalizer)

## Testing

Reliable testing of localized components could be a challenging task, due to differences in run-time environments of locale development machines and CI/CD runners. The need to provide localization context would also overcomplicate test code, making it less readable and more suspecible to errors.

To help with unit testing, Vue.js plugin provides a global configuration option [`defaultLocalizer`](#defaultlocalizer), which can be configured to use [`TestLocalizer`](../../introduction/localizer.md#testlocalizer), which outputs locale-independent representations instead of localized values.

```typescript
import { configure, TestLocalizer } from '@localizer/core'; // [!code ++:2]
import { VueIntegration } from '@localizer/x-vue';
import { mount } from '@vue/test-utils';

import { CurrentLanguage } from '@localizer/format';
import { Localized } from '@localizer/x-vue';

describe('Localized', () => {
  beforeAll(() => {                                                 // [!code ++:3]
    configure(VueIntegration, { defaultLocalizer: TestLocalizer });
  });

  it('uses configured default localizer', () => {
    const wrapper = mount(<Localized content={CurrentLanguage} />);
    expect(wrapper.html()).toContain('[CurrentLanguage]');
  });

  // ...
});
```
