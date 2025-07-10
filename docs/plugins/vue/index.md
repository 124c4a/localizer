---
title: Vue.js
---

# Localization in Vue.js <Experimental /> <Package name="x-vue" />

The library provides low-effort integration with Vue.js UI framework.

::: tip REQUIREMENTS

- [Vue.js](https://vuejs.org/) **^3.5.0**

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
app.use(localizerPlugin, { initialLocale: 'en-US' }); //[!code ++]
```

Plugin registration is an optional step that globally sets up the localization context with the provided initial locale. Additionally, it registers custom components like [`x-localization-context`](#localizationcontext) and [`x-localized`](#localized), making them available throughout your application for seamless integration.

For additional configuration options and advanced usage, refer to the [Plugin Options](#plugin-options) section. This section provides detailed information on customizing the plugin to suit your application's specific localization needs.

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

For more details on how to use the localization functionality, refer to the [`useLocalizer`](#uselocalizer) section. This section provides an in-depth explanation of its API and practical examples to help you integrate it effectively into your Vue.js components.

:::

## Functions

### `useLocalizer`

`useLocalizer` is a main tool, that provides components with localization functions and allows to change current language (locale). This function can be called from functional component bodies and `setup()`

## Components

### `LocalizationContext`

### `Localized`

## Plugin options

## Testing
