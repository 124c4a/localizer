---
entity:
  type: transformer
  pkg: transform
  name: apply
  summary: Applies provided string function.
  example: transform(loc`Custom function`, [apply((str) => `**${str}**`)])
  argument: loc`Custom function`
  fn: (value) => transform(loc(() => value), [apply((str) => `**${str}**`)])
  configurable: true
  maturity: public
---

# apply <Package name="transform"/>

This factory allows to use any custom string function as a transformer for localizable values.

## Usage

This utility allows you to define a transformation function that modifies the localized output in any way you need. For example, you can wrap text in markdown-style bold formatting:

```typescript twoslash
import { loc } from '@localizer/core';
import { transform, apply } from '@localizer/transform';

const bold = apply((text) => `**${text}**`);

const value = loc`Custom function`;
const result = transform(value, [bold]);
```

::: info NOTE
Such transformations are not tied to any specific locale. For scenarios requiring locale-aware transformations, you can implement a custom transformer by adhering to the [`Transformer`](../../api/_localizer/transform/Transformer/index.md) type. This allows you to define transformations that respect locale-specific rules and nuances, ensuring accurate and context-sensitive results.

```typescript
import { loc } from '@localizer/core';
import { transform } from '@localizer/transform';

const bold = (localizable) => loc`**${localizable}**`;

const value = loc`Custom function`;
const result = transform(value, [bold]);
```

:::
