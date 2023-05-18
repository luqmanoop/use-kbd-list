# use-kbd-list

> Add full keyboard navigation support to your list components

Add `ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Home` & `End` keyboard support w/ smooth scrolling to your list component.

Live demo https://use-kbd-list.vercel.app

<img src="https://raw.githubusercontent.com/codeshifu/assets/main/gifs/use-kbd-list.gif" alt="use-kbd-list" width="640" />

## Install

```sh
npm install use-kbd-list
```

## Example

```tsx
import { useKbdList } from "use-kbd-list";

function App() {
  const {
    ref, // scroll container ref
    activeIndex, // index of the element navigated to
    activeElement, // element navigated to
    handleLeave, // handler function for the scroll container onMouseLeave, onPointerLeave event
    handleMove // handler function for the list item onMouseMove, onPointerMove event
  } = useKbdList<HTMLUListElement>(myList.length, "data-index");

  console.log(activeElement?.textContent);

  return (
    <ul ref={ref} onMouseLeave={handleLeave} onPointerLeave={handleLeave}>
      {myList.map((item, index) => (
        <li
          key={item}
          onMouseMove={handleMove}
          onPointerMove={handleMove}
          data-index={index}
          style={{
            backgroundColor: activeIndex === index ? "#eceef4" : "transparent"
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
```

## API

`useKbdList<T>(listLength, listItemIndexAttribute, options)`

### listLength

The length of your list e.g. `users.length`

Type: `number`

Required: `true`

### listItemIndexAttribute

The name of an attribute set on the list item. You could use anything else other `data-index` as the attribute name

NOTE: **The value of this attribute must be the index of the list item in the list** e.g.

```tsx
const App = () => {
  useKbdList(items, "data-index");

  ...

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item} data-index={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};
```

### options

`react-hotkeys-hooks` [options](https://github.com/JohannesKlauss/react-hotkeys-hook#options)

Type: `object`

Required: `false`

E.g. If you want the hook to run while an input is focused, like in a ComboBox

```tsx
useKbdList<HTMLUListElement>(myList.length, "data-index", {
  enableOnFormTags: true
});
```
