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

Plugin registration is an optional step that glopbally registers custom components ([`x‑localization‑context`](#localizationcontext) and [`x‑localized`](#localized)) and sets up global localization context using supplied initial locale.
See [plugin options](#plugin-options) for more details.

### 3. Usage

Once localization context is available, you can start using all localization functionality that the library provides.

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

## Functions

### `useLocalizer`

## Components

### `LocalizationContext`

### `Localized`

## Plugin options

## Testing
