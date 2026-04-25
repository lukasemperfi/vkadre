import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UiButton from "./index.vue";

const meta = {
  title: "UI/Button",
  component: UiButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Button",
    disabled: false,
  },
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithSlot: Story = {
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: `<UiButton v-bind="args">Custom slot content</UiButton>`,
  }),
};
