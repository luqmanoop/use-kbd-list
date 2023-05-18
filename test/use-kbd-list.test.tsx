import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useKbdList } from "src";

const items = [
  "apple",
  "banana",
  "orange",
  "pear",
  "grape",
  "pineapple",
  "kiwi"
];

function App() {
  const { ref, activeIndex, handleLeave, handleMove } =
    useKbdList<HTMLUListElement>(items.length, "data-index");

  return (
    <ul
      data-testid="container"
      ref={ref}
      onMouseLeave={handleLeave}
      onPointerLeave={handleLeave}
    >
      {items.map((item, index) => (
        <li
          key={item}
          onMouseMove={handleMove}
          onPointerMove={handleMove}
          data-index={index}
          data-is-active={activeIndex === index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

window.HTMLElement.prototype.scroll = jest.fn();

test("renders App", () => {
  render(<App />);

  expect(screen.getByText("apple")).toBeInTheDocument();
  expect(screen.getByText("orange")).toBeInTheDocument();
  expect(screen.queryByText("mango")).not.toBeInTheDocument();
});

test("renders App with activeIndex", () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  expect(container.children.length).toBe(items.length);

  Array.from(container.children).forEach((child, index) => {
    if (index === 0) {
      expect(child).toHaveAttribute("data-is-active", "true");
    } else {
      expect(child).toHaveAttribute("data-is-active", "false");
    }
    expect(child).toHaveAttribute("data-index", `${index}`);
  });
});

test("last item is active on keyup press", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.keyboard("{arrowup}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.lastChild).toHaveAttribute("data-is-active", "true");
  expect(container.lastChild?.textContent).toBe(items[items.length - 1]);
});

test("last item is active on page down press", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.keyboard("{pagedown}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.lastChild).toHaveAttribute("data-is-active", "true");
  expect(container.lastChild?.textContent).toBe(items[items.length - 1]);
});

test("last item is active on end key press", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.keyboard("{end}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.lastChild).toHaveAttribute("data-is-active", "true");
  expect(container.lastChild?.textContent).toBe(items[items.length - 1]);
});

test("navigates to 4th item {pear}", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.keyboard("{arrowdown}");
  await userEvent.keyboard("{arrowdown}");
  await userEvent.keyboard("{arrowdown}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.children[3]).toHaveAttribute("data-is-active", "true");
  expect(container.children[3]?.textContent).toBe(items[3]);
});

test("navigates to 1st item {apple} using home key", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.keyboard("{arrowdown}");
  await userEvent.keyboard("{arrowdown}");
  await userEvent.keyboard("{arrowdown}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.children[3]).toHaveAttribute("data-is-active", "true");
  expect(container.children[3]?.textContent).toBe(items[3]);

  await userEvent.keyboard("{home}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "true");
});

test("navigates to 1st item {apple} using pageup key", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.keyboard("{arrowdown}");
  await userEvent.keyboard("{arrowdown}");
  await userEvent.keyboard("{arrowdown}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.children[3]).toHaveAttribute("data-is-active", "true");
  expect(container.children[3]?.textContent).toBe(items[3]);

  await userEvent.keyboard("{pageup}");

  expect(container.firstChild).toHaveAttribute("data-is-active", "true");
});

test("navigates to 5th item {pineapple} using mouse", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.hover(container.children[5]);

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.children[5]).toHaveAttribute("data-is-active", "true");
  expect(container.children[5]?.textContent).toBe(items[5]);
});

test("navigates to 4th {grape} item from 5th item {pineapple} using mouse then keyboard", async () => {
  const { getByTestId } = render(<App />);

  const container = getByTestId("container");

  await userEvent.hover(container.children[5]);

  expect(container.firstChild).toHaveAttribute("data-is-active", "false");
  expect(container.children[5]).toHaveAttribute("data-is-active", "true");
  expect(container.children[5]?.textContent).toBe(items[5]);

  await userEvent.keyboard("{arrowup}");

  expect(container.children[5]).toHaveAttribute("data-is-active", "false");
  expect(container.children[4]).toHaveAttribute("data-is-active", "true");
  expect(container.children[4]?.textContent).toBe(items[4]);
});
