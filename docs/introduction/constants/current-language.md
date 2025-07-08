---
title: current language
entity:
  type: constant
  pkg: format
  name: CurrentLanguage
  summary: Current language or locale name
  example: CurrentLanguage
  fn: () => CurrentLanguage
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# CurrentLanguage <Package name="format"/>

This constant renders current language or locale.

## Usage

```typescript twoslash
import { CurrentLanguage } from '@localizer/format';

const result = CurrentLanguage;
```

## Demo

<EntityDemo :args="[]" />

## See also

<Entities />
