---
order: 2
---

# Preconfigured formatters <Badge type="info" text="@localizer/format" />

<script setup>
  import DemoValueFormatter from './DemoValueFormatter.vue';
  import { demos } from './preconfigured-formatters';
</script>

The **@localizer** library provides a set of pre-configured value formatters for the most common scenarios. These formatters can be used out-of-the-box and does not explicit instantiation. To enhance flexibility, the configuration of these formatters can be adjusted in a centralized manner via [configuration](../basics/configuration.md).

## `stringify`

[`stringify`](../api/_localizer/format/stringify/index.md) is a fundamental data formatter that converts any value into a locale-independent `Localizable` using [string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion). It is ideal for scenarios where a straightforward string representation of the value is sufficient.

<DemoValueFormatter :demo="demos.stringify"/>

**Usage:**

```typescript
import { stringify } from '@localizer/format';

const localizable = stringify(42);
```

::: warning

Only use `stringify` for formatting string values or when a simple string representation of the value is sufficient. For other data types, consider using more specialized formatters tailored to the specific data type or formatting requirements.

:::
