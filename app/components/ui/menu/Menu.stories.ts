import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UiMenu from "./index.vue";

const sampleItems = [
  { id: "home", label: "Главная", to: "/" },
  { id: "services", label: "Услуги", to: "/services" },
  { id: "contacts", label: "Контакты", to: "/contacts" },
];

const meta = {
  title: "UI/Menu",
  component: UiMenu,
  tags: ["autodocs"],
  argTypes: {
    ariaLabel: { control: "text" },
    items: { control: "object" },
  },
  args: {
    ariaLabel: "Основное меню",
    items: sampleItems,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof UiMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithStaticItem: Story = {
  args: {
    items: [...sampleItems, { id: "label-only", label: "Скоро" }],
  },
};

export const CustomAriaLabel: Story = {
  args: {
    ariaLabel: "Навигация по разделу",
  },
};
