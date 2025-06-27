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

The formatting style to use. Possible values are `"narrow"`, `"short"`, and `"long"`; the default is `"long"`.

**Examples:**

<DemoValueFormatterOptions option="style" :values="['narrow', 'short', 'long']" :factory=factory :inputs=inputs />

## `fallback`

What to return from formatter if the input is structurally valid but there's no matching display name. Possible values are:

- `"code"` **(default)** - Return the input code itself.
- `"none"` - Return empty string.

**Examples:**

<DemoValueFormatterOptions option="fallback" :values="['code', 'none']" :factory=factory :inputs=inputs />

## `languageDisplay`

How language names should be displayed.

- `"dialect"` **(default)** Display special regional dialects using their own name. E.g. "nl-BE" will be displayed as "Flemish".
- `"standard"` - Display all languages using standard format. E.g. "nl-BE" will be displayed as "Dutch (Belgium)".

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
