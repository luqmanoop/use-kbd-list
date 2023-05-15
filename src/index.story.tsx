import { Meta, StoryObj } from "@storybook/react";

import { useKbdList } from "./index";
import { CSSProperties } from "react";

const myList = Array.from({ length: 25 }, () =>
  Math.random().toString(36).substring(7)
);

const attributeName = "data-index";

const containerStyles: CSSProperties = {
  maxHeight: "400px",
  maxWidth: "500px",
  overflowY: "auto",
  border: "1px solid black",
  listStyle: "none",
  padding: 0,
  margin: 0
};

const App = () => {
  const { ref, activeIndex, activeElement, handleLeave, handleMove } =
    useKbdList<HTMLUListElement>(myList.length, "data-index");

  return (
    <div>
      {/* List start */}
      <ul
        ref={ref}
        onMouseLeave={handleLeave}
        onPointerLeave={handleLeave}
        style={containerStyles}
      >
        {myList.map((item, index) => (
          <li
            key={item}
            onMouseMove={handleMove}
            onPointerMove={handleMove}
            {...{ [attributeName]: index }}
            style={{
              padding: "6px 10px",
              backgroundColor: activeIndex === index ? "#eceef4" : "transparent"
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {/* List end */}

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
