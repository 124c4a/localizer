---
order: 3
title: Formatting
entity:
  type: constant
  pkg: format
  name: autoFormat
  summary: Whatever
  argument: loc`test`
  example: autoFormat("Arbitrary value")
  configurable: false
  maturity: public
  related:
    - stringify
---

# Formatting

Localization involves more than just translation—it ensures that data formats align with the user's locale and cultural preferences. **@localizer** provides a robust suite of data formatters designed to handle a wide range of common use cases.

To learn more about the core concepts and functionality of value formatters, refer to the [Introduction](./introduction.md) section of this guide.

## Numbers and amounts

<Entities type="number" />

## Dates and times

<Entities type="date" />

## Enumerations

<Entities type="string" />

## Advanced types

<Entities type="other" />

## Predefined constants

<Entities type="constant" />
