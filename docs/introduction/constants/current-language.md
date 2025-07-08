---
entity:
  type: constant
  pkg: format
  name: CurrentLanguage
  summary: Represents the current language or locale.
  example: CurrentLanguage
  fn: () => CurrentLanguage
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# CurrentLanguage <Package name="format"/>

Represents the current language or locale.

## Usage

```typescript twoslash
import { CurrentLanguage } from '@localizer/format';

const result = CurrentLanguage;
```

## Demo

<EntityDemo :args="[]" />

## See also

<Entities />
