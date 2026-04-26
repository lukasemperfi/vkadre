import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UiAccordion from "./index.vue";

const meta = {
  title: "UI/Accordion",
  component: UiAccordion,
  tags: ["autodocs"],
  argTypes: {
    modelValue: { control: "text" },
    defaultValue: { control: "text" },
  },
  args: {
    defaultValue: "q1",
    items: [
      {
        key: "q1",
        title: "Могу ли я получить исходники?",
        content:
          "Дополнительно с фотосессии вы можете заказать исходники — все фото без обработки. Обычно мы отдаём их в формате jpeg. При необходимости по запросу высылаем и в формате raw.\n\nСтоимость:\n• с экспресс-фотосессии — 199₴\n• с индивидуальных и студийных фотосессии — 399₴\n\nПри покупке исходников вы можете самостоятельно выбрать фото для обработки, либо это может сделать наш фотограф.",
      },
      {
        key: "q2",
        title: "Как обрабатываются фотографии?",
        content:
          "Мы отбираем лучшие кадры, делаем базовую цветокоррекцию и ретушь согласно выбранному пакету. Если нужен особый стиль — напишите нам заранее.",
      },
      {
        key: "q3",
        title: "Когда будут готовы фотографии?",
        content:
          "В среднем — на следующий день. В пиковые периоды сроки могут увеличиться, мы предупредим заранее.",
      },
      {
        key: "q4",
        title: "Кто будет фотограф? Могу ли я выбрать фотографа?",
        content:
          "Да, если нужный фотограф свободен на вашу дату. При бронировании скажите, кого вы хотите, и мы подтвердим возможность.",
      },
    ],
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UiAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { UiAccordion },
    setup: () => ({ args }),
    template: `
      <div style="width: 822px;">
        <UiAccordion v-bind="args" />
      </div>
    `,
  }),
};

export const AllCollapsed: Story = {
  args: { defaultValue: null },
  render: Default.render,
};

export const WithDisabledItem: Story = {
  args: {
    defaultValue: null,
    items: [
      { key: "a", title: "Доступный пункт", content: "Контент доступного пункта." },
      { key: "b", title: "Отключённый пункт", content: "Этот контент недоступен.", disabled: true },
      { key: "c", title: "Ещё один пункт", content: "Контент третьего пункта." },
    ],
  },
  render: Default.render,
};

