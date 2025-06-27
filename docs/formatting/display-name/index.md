---
order: 4
title: Display names
---

# Display name <Badge type="info" text="@localizer/format-displayname" />

> **[displayNameFormatter](../../api/_localizer/format-displayname/displayNameFormatter/index.md)**<`T`> ( `type` , `options?` ): [ValueFormatter](../index.md#valueformatter-t)<`T`>
>
> - `T` _extends string_ - The type of value to format. Exact allowed values are determined by `type` parameter.
> - `type` - One of `"language"`, `"region"`, `"script"`, `"currency"`, `"calendar"`, or `"dateTimeField"`
>   This formatter offers a locale-aware way to translate names of languages, countries, currencies, and more.

::: tip

If you prefer to use default settings, consider using a preconfigured [country name](../preconfigured-formatters/display-names/country-name.md), [currency name](../preconfigured-formatters/display-names/currency-name.md) or [language name](../preconfigured-formatters/display-names/language-name.md) formatters. It simplifies the process by providing a ready-to-use configuration for common use cases.

:::
