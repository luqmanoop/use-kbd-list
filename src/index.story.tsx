import { Meta, StoryObj } from "@storybook/react";

import { useKbdList } from "./index";
import { CSSProperties } from "react";

const items = Array.from({ length: 25 }, () =>
  Math.random().toString(36).substring(7)
);

const App = () => {
  const {
    scrollContainerRef,
    handleLeave,
    activeIndex,
    activeElement,
    handleMove
  } = useKbdList<HTMLUListElement>(items.length, "data-index");

  const containerStyles: CSSProperties = {
    maxHeight: "400px",
    maxWidth: "500px",
    overflowY: "auto",
    border: "1px solid black",
    listStyle: "none",
    padding: 0,
    margin: 0
  };

  const listItemStyles: CSSProperties = {
    padding: "6px 10px"
  };

  return (
    <div>
      <ul
        ref={scrollContainerRef}
        onMouseLeave={handleLeave}
        onPointerLeave={handleLeave}
        style={containerStyles}
      >
        {items.map((item, index) => (
          <li
            key={item}
            data-index={index}
            onMouseMove={handleMove}
            onPointerMove={handleMove}
            style={{
              ...listItemStyles,
              backgroundColor: activeIndex === index ? "#eceef4" : "transparent"
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <pre>
        <code>
          {JSON.stringify(
            {
              activeIndex,
              activeElementText: activeElement?.textContent
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
};

const meta: Meta = {
  title: "App",
  component: App
};

export default meta;

export const Default: StoryObj<typeof App> = {};
