---
order: 2
---

# Options

<script setup>
import { displayNameFormatter } from '@localizer/format-displayname';

function withLabels(inputs) {
  return inputs.map((input) => [input, input]);
}

const factory = (options) => displayNameFormatter('language', options);

const inputs = () => withLabels(['nl-BE','nl-NL','en-US', 'xx']);

</script>

## `style`

The formatting style to use. Options are `"narrow"`, `"short"`, and `"long"` (default: `"long"`).

**Examples:**

<OptionsDemo option="style" :values="['narrow', 'short', 'long']" :factory=factory :inputs=inputs />

## `fallback`

What to return if the input is valid but no matching display name is found:

- `"code"` **(default)** - Returns the input code.
- `"none"` - Returns an empty string.

**Examples:**

<OptionsDemo option="fallback" :values="['code', 'none']" :factory=factory :inputs=inputs />

## `languageDisplay`

How language names are displayed:

- `"dialect"` **(default)** - Shows regional dialects by their specific names (e.g., "nl-BE" as "Flemish").
- `"standard"` - Uses a standard format for all languages (e.g., "nl-BE" as "Dutch (Belgium)").

::: warning

This option is only usable when formatting language names

:::

**Examples:**

<OptionsDemo option="languageDisplay" :values="['dialect', 'standard']" :factory=factory :inputs=inputs />

---

<small>

["Attributions and copyright licensing"](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) by Mozilla Contributors, licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

</small>
