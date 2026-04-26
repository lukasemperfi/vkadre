import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UiIconButton from "./index.vue";
import UiIcon from "../icon/index.vue";

const meta = {
  title: "UI/IconButton",
  component: UiIconButton,
  tags: ["autodocs"],
  argTypes: {
    as: { control: "select", options: ["button", "link"] },
    to: { control: "text" },
    variant: { control: "select", options: ["dashed", "solid"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
  },
  args: {
    as: "button",
    to: "/",
    variant: "dashed",
    type: "button",
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UiIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { UiIconButton, UiIcon },
    setup: () => ({ args }),
    template: `
      <UiIconButton v-bind="args" aria-label="Icon button">
        <UiIcon name="cross" />
      </UiIconButton>
    `,
  }),
};

export const Solid: Story = {
  args: { variant: "solid" },
  render: Playground.render,
};

export const AsNuxtLink: Story = {
  args: { as: "link", to: "/" },
  render: Playground.render,
};

export const DisabledLink: Story = {
  args: { as: "link", to: "/", disabled: true },
  render: Playground.render,
};
