# Dictionary <Package name="translate"/> <Experimental/>

<script setup>
import { dictionary } from '@localizer/translate';
import { currency } from '@localizer/format';

const dict = dictionary('Dictionary', {
  en: {
    yes: 'Yes',
    no: 'No',
    hello: 'Hello {$name}!',
    price: 'Price: {$value}',
  },
  fi: {
    yes: 'Kyllä',
    no: 'Ei',
    hello: 'Hei {$name}!',
    price: 'Hinta: {$value}'
  },
  sv: {
    yes: 'Ja',
    no: 'Nej',
    hello: 'Hej {$name}!',
    price: 'Pris: {$value}'
  }
});

const yes = dict.key('yes');
const no = dict.key('no');
const hello = dict.key('hello', true);
const price = dict.key('price', true);
</script>

For complex translation tasks, the library provides support for translation dictionaries defined using [Unicode MessageFormat 2.0](https://messageformat.unicode.org/docs/quick-start/) format. This functionality supports both static dictionaries which are defined at the compilation time, and dynamic dictionaries, where locale data can be lazily loaded on-demand.

## Static loading

For straightforward scenarios, you can define all translations directly within your dictionary declaration.

```typescript twoslash
import { getLocalizer } from '@localizer/core';
import { dictionary } from '@localizer/translate';

const dict = dictionary('Dictionary', {
  en: {
    yes: 'Yes',
    no: 'No',
    hello: 'Hello {$name}!',
  },
  fi: {
    yes: 'Kyllä',
    no: 'Ei',
    hello: 'Hei {$name}!',
  },
  sv: {
    yes: 'Ja',
    no: 'Nej',
    hello: 'Hej {$name}!',
  },
});

const yes = dict.key('yes');
const no = dict.key('no');
const hello = dict.key<{ name: string }>('hello', true);

const localizer = getLocalizer('en-US');

console.log(localizer(yes));
console.log(localizer(hello({ name: 'Maria' })));
```

```console-vue
{{ yes.localize('en-US') }}
{{ hello({ name: 'Maria' }).localize('en-US') }}
```

## Dynamic loading

In applications supporting multiple languages, bundling all translations together can significantly increase the application size and impact performance. To address this, it's recommended to use asynchronous dictionaries, which allow translations to be loaded on demand for each locale as needed.

::: code-group

```typescript [index.ts]
import { getLocalizer } from '@localizer/core';
import { asyncDictionary, globalRegistry } from '@localizer/translate';

// Indicate that translations for english language should be preloaded
await globalRegistry.loadLocale('en-US');

const dict = await asyncDictionary('Dictionary', {
  en: import('./en.js'),
  fi: import('./fi.js'),
  sv: import('./sv.js'),
});

const yes = dict.key('yes');
const no = dict.key('no');
const hello = dict.key<{ name: string }>('hello', true);

const localizer = getLocalizer('en-US');

console.log(localizer(yes));
console.log(localizer(hello({ name: 'Maria' })));
```

```typescript [en.ts]
export default {
  yes: 'Yes',
  no: 'No',
  hello: 'Hello {$name}!',
} as const;
```

```typescript [fi.ts]
export default {
  yes: 'Kyllä',
  no: 'Ei',
  hello: 'Hei {$name}!',
} as const;
```

```typescript [sv.ts]
export default {
  yes: 'Ja',
  no: 'Nej',
  hello: 'Hej {$name}!',
} as const;
```

:::

```console-vue
{{ yes.localize('en-US') }}
{{ hello({ name: 'Maria' }).localize('en-US') }}
```

You can also "bake in" specific languages directly into your application bundle. This approach allows you to preload certain locales—such as your primary language—while keeping others loaded asynchronously. This is useful for optimizing performance and reducing initial load times, especially when you want to guarantee that at least one language is always available without additional network requests.

```typescript
import { getLocalizer } from '@localizer/core';
import { asyncDictionary, globalRegistry } from '@localizer/translate';
import en from './en.js'; // [!code ++]

// Indicate that translations for english language should be preloaded
globalRegistry.loadLocale('en-US');

const dict = await asyncDictionary('Dictionary', {
  en: import('./en.js'), // [!code --]
  en, // [!code ++]
  fi: import('./fi.js'),
  sv: import('./sv.js'),
});

const yes = dict.key('yes');
const no = dict.key('no');
const hello = dict.key<{ name: string }>('hello', true);

// ...
```

## Formatting

As shown in previous examples, translations could include placeholders for value interpolation. When built-in [MessageFormat 2 formatting functions](https://messageformat.unicode.org/docs/reference/functions/) are not used, the library uses [auto-formatting](../formatting/other/auto-format.md) to convert values to their locale-dependent representation. This allows to use custom formatters which might be necessary when dealing with complex data:

```typescript twoslash
import { getLocalizer, Localizable } from '@localizer/core';
import { currency } from '@localizer/format';
import { dictionary } from '@localizer/translate';

const dict = dictionary('Dictionary', {
  en: {
    price: 'Price: {$value}',
  },
  fi: {
    price: 'Hinta: {$value}',
  },
  sv: {
    price: 'Pris: {$value}',
  },
});

const price = dict.key<{ value: Localizable }>('price', true);

const localizer = getLocalizer('en-US');

console.log(localizer(price({ value: currency(1005, 'EUR') })));
```

```console-vue
{{ price({ value: currency(1005, 'EUR') }).localize('en-US') }}
```

::: tip

For more details and hands-on experimentation, refer to the [Unicode MessageFormat 2.0 Quick Start Guide](https://messageformat.unicode.org/docs/quick-start/) and try out the [MessageFormat Playground](https://messageformat.unicode.org/playground/).

:::
