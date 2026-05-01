import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UiAccordion from "./index.vue";
import UiAccordionItem from "./Item.vue";
import UiAccordionTrigger from "./Trigger.vue";
import UiAccordionContent from "./Content.vue";

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
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UiAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      UiAccordion,
      UiAccordionItem,
      UiAccordionTrigger,
      UiAccordionContent,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 822px;">
        <UiAccordion v-bind="args">
          <UiAccordionItem value="q1">
            <UiAccordionTrigger>Могу ли я получить исходники?</UiAccordionTrigger>
            <UiAccordionContent>
              Дополнительно с фотосессии вы можете заказать исходники — все фото без обработки. Обычно мы отдаём их в формате jpeg. При необходимости по запросу высылаем и в формате raw.
              <br /><br />
              Стоимость:<br />
              • с экспресс-фотосессии — 199₴<br />
              • с индивидуальных и студийных фотосессии — 399₴
              <br /><br />
              При покупке исходников вы можете самостоятельно выбрать фото для обработки, либо это может сделать наш фотограф.
            </UiAccordionContent>
          </UiAccordionItem>

          <UiAccordionItem value="q2">
            <UiAccordionTrigger>Как обрабатываются фотографии?</UiAccordionTrigger>
            <UiAccordionContent>
              Мы отбираем лучшие кадры, делаем базовую цветокоррекцию и ретушь согласно выбранному пакету. Если нужен особый стиль — напишите нам заранее.
            </UiAccordionContent>
          </UiAccordionItem>

          <UiAccordionItem value="q3">
            <UiAccordionTrigger>Когда будут готовы фотографии?</UiAccordionTrigger>
            <UiAccordionContent>
              В среднем — на следующий день. В пиковые периоды сроки могут увеличиться, мы предупредим заранее.
            </UiAccordionContent>
          </UiAccordionItem>

          <UiAccordionItem value="q4">
            <UiAccordionTrigger>Кто будет фотограф? Могу ли я выбрать фотографа?</UiAccordionTrigger>
            <UiAccordionContent>
              Да, если нужный фотограф свободен на вашу дату. При бронировании скажите, кого вы хотите, и мы подтвердим возможность.
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </div>
    `,
  }),
};

export const AllCollapsed: Story = {
  args: { defaultValue: null },
  render: Default.render,
};

export const WithDisabledItem: Story = {
  args: { defaultValue: null },
  render: (args) => ({
    components: {
      UiAccordion,
      UiAccordionItem,
      UiAccordionTrigger,
      UiAccordionContent,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 822px;">
        <UiAccordion v-bind="args">
          <UiAccordionItem value="a">
            <UiAccordionTrigger>Доступный пункт</UiAccordionTrigger>
            <UiAccordionContent>Контент доступного пункта.</UiAccordionContent>
          </UiAccordionItem>

          <UiAccordionItem value="b" disabled>
            <UiAccordionTrigger>Отключённый пункт</UiAccordionTrigger>
            <UiAccordionContent>Этот контент недоступен.</UiAccordionContent>
          </UiAccordionItem>

          <UiAccordionItem value="c">
            <UiAccordionTrigger>Ещё один пункт</UiAccordionTrigger>
            <UiAccordionContent>Контент третьего пункта.</UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </div>
    `,
  }),
};
