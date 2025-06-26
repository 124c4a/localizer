<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Stringification <Badge type="info" text="@localizer/format" />

> **[stringify](../../../api/_localizer/format/stringify/index.md)** ( `value`: _any_ )
>
> - `value` - The value to format. Can be any JavaScript value.

This is a fundamental data formatter that converts any value into a locale-independent `Localizable` using [string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion). It is ideal for scenarios where a straightforward string representation of the value is sufficient.

::: warning

Only use `stringify` for formatting string values or when a simple string representation of the value is sufficient. For other data types, consider using more specialized formatters tailored to the specific data type or formatting requirements.

:::

**Examples:**

<DemoValueFormatter :demo="demos.stringify"/>
