import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import { useHotkeys, Options as UseHotKeysOptions } from "react-hotkeys-hook";

enum Keys {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  PageUp = "PageUp",
  PageDown = "PageDown",
  Home = "Home",
  End = "End"
}

type ReturnValue<T> = {
  activeIndex: number;
  activeElement: HTMLElement | null;
  setActiveIndex: (index: number) => void;
  handleMove: (e: MouseEvent) => void;
  handleLeave: () => void;
  scrollContainerRef: React.RefObject<T>;
};

export type Options = UseHotKeysOptions;

/**
 * @template T Type of the container element e.g. HTMLUListElement
 * @param {number} totalListItems Length of the list
 * @param {string} listItemIndexAttribute Attribute name containing an index to find the list item e.g. data-index
 * @param {Options} [options] react-hotkeys-hook options
 * @returns {ReturnValue<T>}
 */
export function useHeadlessList<T extends HTMLElement>(
  totalListItems: number,
  listItemIndexAttribute: string,
  options?: Options
): ReturnValue<T> {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  const scrollContainerRef = useRef<T>(null);

  useEffect(() => setActiveIndex(0), [totalListItems]);

  const getSelectedElement = useCallback(
    (index: number) => {
      if (!listItemIndexAttribute) return null;
      return document.querySelector<HTMLElement>(
        `[${listItemIndexAttribute}="${index}"]`
      );
    },
    [listItemIndexAttribute]
  );

  useEffect(() => {
    const elem = getSelectedElement(activeIndex);

    if (!elem) return;

    setActiveElement(elem);
  }, [activeIndex, getSelectedElement]);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (
      !container ||
      activeIndex < 0 ||
      activeIndex === hoverIndex ||
      !activeElement ||
      hoverIndex === -2 // mouse left scroll container
    ) {
      return;
    }

    const { offsetHeight: height, offsetTop: top } = activeElement;
    const { offsetHeight: containerHeight } = container;

    container.scroll({
      top: top - containerHeight + height,
      behavior: "smooth"
    });
  }, [activeIndex, hoverIndex, activeElement]);

  const handleArrowUpOrDownKeypress = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      if (totalListItems === 0) return;

      let nextIndex = -1;
      const isHovering = hoverIndex >= 0;

      switch (e.key) {
        case Keys.ArrowUp:
          nextIndex = !isHovering
            ? (activeIndex - 1 + totalListItems) % totalListItems
            : (hoverIndex - 1 + totalListItems) % totalListItems;
          break;
        case Keys.ArrowDown:
          nextIndex = !isHovering
            ? (activeIndex + 1) % totalListItems
            : (hoverIndex + 1) % totalListItems;
          break;
        case Keys.PageUp:
        case Keys.Home:
          nextIndex = 0;
          break;
        case Keys.PageDown:
        case Keys.End:
          nextIndex = totalListItems - 1;
          break;
      }

      if (nextIndex === -1) return;

      setActiveIndex(nextIndex);
      setHoverIndex(-1);
    },
    [totalListItems, hoverIndex, activeIndex]
  );

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const element = (e.target as HTMLElement)?.closest<HTMLElement>(
        `[${listItemIndexAttribute}]`
      );

      if (!element) return;

      const listItemIndex = Number(
        element?.getAttribute(listItemIndexAttribute)
      );

      if (isNaN(listItemIndex) || hoverIndex === listItemIndex) {
        return;
      }

      setHoverIndex(listItemIndex);
      setActiveIndex(listItemIndex);
    },
    [hoverIndex, listItemIndexAttribute]
  );

  const handleLeave = () => setHoverIndex(-2);

  useHotkeys(
    [
      Keys.ArrowUp,
      Keys.ArrowDown,
      Keys.PageUp,
      Keys.PageDown,
      Keys.Home,
      Keys.End
    ],
    handleArrowUpOrDownKeypress,
    options
  );

  return {
    activeIndex,
    activeElement,
    setActiveIndex,
    handleMove,
    handleLeave,
    scrollContainerRef
  };
}
