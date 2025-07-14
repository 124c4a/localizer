---
order: 999
---

# NPM packages

<script setup>
  import { data as packages } from '../../packages.data';
</script>

This page contains an overview of library packages and their versions.

## Meta-package

- <code>{{ packages.all.name }}</code>: [{{ packages.all.version }}](./all.md)

## Core

- <code>{{ packages.core.name }}</code>: [{{ packages.core.version }}](./core.md)
- <code>{{ packages.transform.name }}</code>: [{{ packages.transform.version }}](./transform.md)

## Formatting

- <code>{{ packages.format.name }}</code>: [{{ packages.format.version }}](./format.md)
- <code>{{ packages['format-datetime'].name }}</code>: [{{ packages['format-datetime'].version }}](./format-datetime.md)
- <code>{{ packages['format-displayname'].name }}</code>: [{{ packages['format-displayname'].version }}](./format-displayname.md)
- <code>{{ packages['format-list'].name }}</code>: [{{ packages['format-list'].version }}](./format-list.md)
- <code>{{ packages['format-lookup'].name }}</code>: [{{ packages['format-lookup'].version }}](./format-lookup.md)
- <code>{{ packages['format-number'].name }}</code>: [{{ packages['format-number'].version }}](./format-number.md)
- <code>{{ packages['format-relativetime'].name }}</code>: [{{ packages['format-relativetime'].version }}](./format-relativetime.md)

## Translation

- <code>{{ packages.translate.name }}</code>: [{{ packages.translate.version }}](./translate.md)

## Plugins

- <code>{{ packages['x-react'].name }}</code>: [{{ packages['x-react'].version }}](./x-react.md)
- <code>{{ packages['x-vue'].name }}</code>: [{{ packages['x-vue'].version }}](./x-vue.md)
