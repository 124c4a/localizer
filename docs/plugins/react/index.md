---
title: React
card:
  title: React
  icon: /react.svg
  kind: ['ui', 'guide']
  related:
    - vanilla
---

# Localization in React <Experimental /> <Package name="x-react" />

The library provides low-effort integration with React UI library.

::: tip REQUIREMENTS

- [React](https://react.dev/) **^18.0**

:::

## Quick start

This guide walks you through the process of integrating **@localizer** into your React applications. For a comprehensive introduction and advanced topics beyond React, refer to the [Getting Started](../../introduction/getting-started.md) section.

### 1. Installation

To get started, install `@localizer/all` and `@localizer/x-react` packages. Use one of the following commands based on your package manager:

::: code-group

```sh [npm]
npm install @localizer/all @localizer/x-react
```

```sh [pnpm]
pnpm install @localizer/all @localizer/x-react
```

```sh [yarn]
yarn add @localizer/all @localizer/x-react
```

```sh [bun]
bun add @localizer/all @localizer/x-react
```

:::

### 2. Creation of localization context

To enable localization throughout your React application, you must set up a localization context. This context serves as a provider, granting all nested components access to localization capabilities. Follow these steps to configure it:

1. Import the `LocalizationContext` component from the `@localizer/x-react` package.
2. Wrap your application's root component (or any specific subtree) with the `LocalizationContext` component.
3. Optionally, specify the initial locale and a callback to handle locale changes using the `locale` and `onUpdateLocale` properties.

Here's an example:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocalizationContext } from '@localizer/x-react'; //[!code ++]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*[!code ++]*/}
    <LocalizationContext locale="en-US">
      {/* Your application components */}
      {/*[!code ++]*/}
    </LocalizationContext>
  </React.StrictMode>,
);
```

By setting up the localization context, you ensure that all components within its scope can seamlessly access and utilize localization features.

### 3. Usage

With the localization context in place, you can now utilize the comprehensive localization capabilities offered by the library. These include effortless content translation, formatting of dates, numbers, and currencies, as well as handling dynamic locale changes within your React application.

```tsx
import { CurrentLanguage } from '@localizer/format';
import { useLocalizer } from '@localizer/x-react';

export default function Component() {
  const { localize } = useLocalizer();

  return <div>{localize(CurrentLanguage)}</div>;
}
```

For more details on how to use the localization functionality, refer to the [`useLocalizer()`](#uselocalizer) section. This section provides an in-depth explanation of its API and practical examples to help you integrate it effectively into your React components.

## `useLocalizer()`

`useLocalizer()` is a React hook that grants access to localization functions and enables dynamic updates to the active locale (language) within components.

`useLocalizer()` utilizes the active localization context provided by [`<LocalizationContext>`](#localizationcontext). If no context is available, it defaults to the global localizer configured in the [global configuration](#global-configuration).

::: danger

If there is no context defined via `<LocalizationContext>`, retrieved localizer will throw an Error on localization attempts. Make sure to set `defaultLocalizer` in [global configuration](#global-configuration) to use localization features without localization contexts.

:::

The function offers the following core features:

- **Localization functions**: Includes `localize`, `localizeArray`, and `localizeObject`. These functions are bound to the currently active locale, enabling seamless localization of values, formatters, arrays, and objects. For detailed usage, refer to [localizing values](../../introduction/localizer.md), [localizing array items](../../introduction/helpers.md#localizing-array-items), and [localizing object properties](../../introduction/helpers.md#localizing-object-properties).

  ```typescript twoslash
  import { useLocalizer } from '@localizer/x-react';

  function Component() {
    const { localize, localizeArray, localizeObject } = useLocalizer();

    // ...
  }
  ```

- **Accessing the active locale**: The `activeLocale` property allows you to retrieve the currently active locale.

  ```typescript twoslash
  import { useLocalizer } from '@localizer/x-react';

  function Component() {
    const { activeLocale } = useLocalizer();

    // ...
  }
  ```

- **Updating the active locale**: Calling the asynchronous `setActiveLocale` method dynamically updates the active locale for the current context. This can be either the global context (set up during [plugin registration](#_2-registration)) or a local context created using [`<LocalizationContext>`](#localizationcontext).

  ```typescript twoslash
  import { useLocalizer } from '@localizer/x-react';

  function Component() {
    const { setActiveLocale } = useLocalizer();
    setActiveLocale('en-US');

    // ...
  }
  ```

## `<LocalizationContext>`

This component can be used to create a local localization context and allow changing selected locale. Localization context can be accessed by [`useLocalizer()`](#uselocalizer) and [`<Localized>`](#localized) down the component tree.

Component provides the following properties:

| Property          | Type              | Default value                                                                                             | Description                                                                                                                                                                                                                                          |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale?`         | `LocaleCode`      | First fallback locale, set in [global configuration](../../introduction/configuration.md#fallbacklocales) | Active locale for current localization context. If not specified, it will use the fallback locale value. Changing this property will automatically update all child components that use localization.                                                |
| `onUpdateLocale?` | `(locale) ⇒ void` | `undefined`                                                                                               | This callback is invoked each time current locale is changed from child components via [`useLocalizer()`](#uselocalizer). The callback is not called, if active locale is changed via `locale` property. It can be used to persist language changes. |

**Example use:**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocaleCode } from '@localizer/core';
import { LocalizationContext } from '@localizer/x-react';

const handleLocaleChange = (locale: LocaleCode) => {
  console.log(`New locale: ${locale}`);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LocalizationContext locale="en-US" onUpdateLocale={handleLocaleChange}>
      {/* root component */}
    </LocalizationContext>
  </React.StrictMode>,
);
```

:::

## `<Localized>`

This component serves as a simpler alternative to [`useLocalizer()`](#uselocalizer) for localizing values. It offers the following properties:

| Property   | Type                                               | Default value                                    | Description                                                                        |
| ---------- | -------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `content?` | [`Localizable`](../../introduction/localizable.md) | [`Empty`](../../introduction/constants/empty.md) | The value to localize. If the value is `undefined`, empty string will be rendered. |

**Example use:**

```tsx
import { CurrentLanguage } from '@localizer/format';
import { Localized } from '@localizer/x-react';

export default function Component() {
  return <Localized content={CurrentLanguage} />;
}
```

## Global configuration

This configuration allows to change the default behavior of React integration:

```typescript twoslash
import { configure, UninitializedLocalizer } from '@localizer/core';
import { ReactIntegration } from '@localizer/x-react';

configure(
  { ReactIntegration },
  {
    ReactIntegration: {
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

To help with unit testing, React plugin provides a global configuration option [`defaultLocalizer`](#defaultlocalizer), which can be configured to use [`TestLocalizer`](../../introduction/localizer.md#testlocalizer), which outputs locale-independent representations instead of localized values.

```tsx
import { render, screen, cleanup } from '@testing-library/react';
import { CurrentLanguage } from '@localizer/format';
import { Localized } from '@localizer/x-react';
import { configure, TestLocalizer } from '@localizer/core'; // [!code ++:2]
import { ReactIntegration } from '@localizer/x-react';

describe('Localized', () => {
  // [!code ++:3]
  beforeEach(() => {
    configure(ReactIntegration, { defaultLocalizer: TestLocalizer });
  });

  afterEach(() => {
    cleanup();
  });

  it('uses configured default localizer', () => {
    render(<Localized content={CurrentLanguage} />);

    expect(screen.getByText('[CurrentLanguage]')).toBeInTheDocument();
  });
});
```
