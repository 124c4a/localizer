---
order: 2
---

# Formatter options

<script setup>
import DemoValueFormatterOptions from '../DemoValueFormatterOptions.vue';
import { displayNameFormatter } from '@localizer/all';

function withLabels(inputs) {
  return inputs.map((input) => [input, input]);
}

const factory = (options) => displayNameFormatter('language', options);

const inputs = () => withLabels(['nl-BE','nl-NL','en-US', 'xx']);

</script>

## `style`

The formatting style to use. Options are `"narrow"`, `"short"`, and `"long"` (default: `"long"`).

**Examples:**

<DemoValueFormatterOptions option="style" :values="['narrow', 'short', 'long']" :factory=factory :inputs=inputs />

## `fallback`

What to return if the input is valid but no matching display name is found:

- `"code"` **(default)** - Returns the input code.
- `"none"` - Returns an empty string.

**Examples:**

<DemoValueFormatterOptions option="fallback" :values="['code', 'none']" :factory=factory :inputs=inputs />

## `languageDisplay`

How language names are displayed:

- `"dialect"` **(default)** - Shows regional dialects by their specific names (e.g., "nl-BE" as "Flemish").
- `"standard"` - Uses a standard format for all languages (e.g., "nl-BE" as "Dutch (Belgium)").

::: warning

This option is only usable when formatting language names

:::

**Examples:**

<DemoValueFormatterOptions option="languageDisplay" :values="['dialect', 'standard']" :factory=factory :inputs=inputs />

## `transform`

Specifies array of transformers to apply to the result.

::: info NOTE

This option is not part of [`Intl.DisplayNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames) API.

:::

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
