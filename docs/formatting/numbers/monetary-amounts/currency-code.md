---
order: 6
---

# Currency code <Badge type="info" text="@localizer/format-number" />

> **[currencyCodeFormatter](../../../api/_localizer/format-number/currencyCodeFormatter/index.md)**<`T`> ( `options?` ): [ValueFormatter](../../index.md#valueformatter-t)<`T`>
>
> - `T` _extends [CurrencyCode](../../../api/_localizer/format-number/CurrencyCode/index.md)_ - The type of value to format.
> - `options` - Optional [configuration of the formatter](../options/index.md).

This formatter returns the locale-specific symbol or short name for a given currency code. This is useful for displaying currency values in a format that aligns with the user's regional settings.

::: tip

If you prefer to use default settings, consider using a [preconfigured currency symbol formatter](../../preconfigured-formatters/display-names/currency-symbol.md). It simplifies the process by providing a ready-to-use configuration for common use cases.

:::
