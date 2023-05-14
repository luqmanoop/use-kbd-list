import { Meta, StoryObj } from "@storybook/react";

import { App } from "./index";

const meta: Meta = {
  title: "App",
  component: App
};

export default meta;

export const Default: StoryObj<typeof App> = {};
