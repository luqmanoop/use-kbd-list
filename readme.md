# use-kbd-list

> Add full keyboard navigation support to your list components

Add `ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Home` & `End` keyboard support w/ smooth scrolling to your list component.

## Install
```sh
npm install use-kbd-list
```

## Usage
Simple as `01`,`10`,`11`!
```ts
impoprt { useKbdList } from 'use-kbd-list';

useKbdList<HTMLUListElement>(myList.length, "data-index");
```
