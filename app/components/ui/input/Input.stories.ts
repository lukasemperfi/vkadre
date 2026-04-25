import type { Meta, StoryObj } from "@storybook/vue3";
import Input from "./index.vue";
import UiIcon from "../icon/index.vue";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  args: {
    modelValue: "",
    placeholder: "Саша",
    error: null,
    disabled: false,
    readonly: false,
    type: "text",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: `
      <div>
        <Input v-bind="args" />
      </div>
    `,
  }),
};

export const WithLeftAndRightSlots: Story = {
  args: {
    placeholder: "Телефон",
  },
  render: (args) => ({
    components: { Input, UiIcon },
    setup() {
      return { args };
    },
    template: `
      <div>
        <Input v-bind="args">
          <template #left>
            <UiIcon name="phone-m" />
          </template>
          <template #right>
            <UiIcon name="cross" />
          </template>
        </Input>
      </div>
    `,
  }),
};

export const Error: Story = {
  args: {
    placeholder: "Электронная почта",
    error: "Некорректный email",
  },
  render: (args) => ({
    components: { Input, UiIcon },
    setup() {
      return { args };
    },
    template: `
      <div>
        <Input v-bind="args">
          <template #left>
            <UiIcon name="email-m" />
          </template>
        </Input>
      </div>
    `,
  }),
};
