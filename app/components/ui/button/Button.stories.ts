import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UiButton from "./index.vue";

const meta = {
  title: "UI/Button",
  component: UiButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["solid", "outline"],
    },
    size: {
      control: "select",
      options: ["lg"],
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Заказать фотосессию",
    variant: "outline",
    size: "lg",
    type: "button",
    disabled: false,
  },
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Outline: Story = {
  args: {
    label: "Заказать фотосессию",
    variant: "outline",
  },
};

export const Solid: Story = {
  args: {
    label: "Оплатить",
    variant: "solid",
  },
};

export const WithSlot: Story = {
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: `<UiButton v-bind="args">Custom slot content</UiButton>`,
  }),
};
