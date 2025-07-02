<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Stringification <Package name="format"/>

> **[stringify](../../../api/_localizer/format/stringify/index.md)** ( `value`: _any_ )
>
> - `value` - The value to format. Can be any JavaScript value.

Converts any value into a locale-independent `Localizable` using [string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion). Suitable for simple string representations.

::: warning

Only use `stringify` for simple string representations. For other data types, use specialized formatters.

:::

**Examples:**

<DemoValueFormatter :demo="demos.stringify"/>
