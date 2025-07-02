---
order: 1
---

<script setup>
  import DemoValueFormatter from '../../DemoValueFormatter.vue';
  import { demos } from '../preconfigured-formatters';
</script>

# Language name <Package name="format"/>

> **[langaugeName](../../../api/_localizer/format/languageName/index.md)** ( `value`: _[LocaleCode](../../../api/_localizer/core/LocaleCode/index.md)_ )
>
> - `value` - The value to format, a valid [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag), optionally combined with an [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

This formatter returns the name of the specified locale in the target language.

**Examples:**

<DemoValueFormatter :demo="demos.languageName"/>
