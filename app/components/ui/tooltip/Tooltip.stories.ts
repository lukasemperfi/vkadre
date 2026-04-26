import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UiInfoTooltip from "./index.vue";
import UiIconButton from "../icon-button/index.vue";
import UiIcon from "../icon/index.vue";
import UiButton from "../button/index.vue";

const meta = {
  title: "UI/Tooltip",
  component: UiInfoTooltip,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    placement: { control: "select", options: ["top", "top-start", "top-end"] },
    offsetPx: { control: "number" },
  },
  args: {
    text: "готовые фотографии вы получите уже на следующий день",
    placement: "top",
    offsetPx: 8,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UiInfoTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIconButtonTrigger: Story = {
  render: (args) => ({
    components: { UiInfoTooltip, UiIconButton, UiIcon },
    setup: () => ({ args }),
    template: `
    <div style="padding: 100px;">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      <UiInfoTooltip v-bind="args">
        <template #trigger>
            <UiIcon name="box-info" />
        </template>
      </UiInfoTooltip>
    </div>
    `,
  }),
};

export const WithTextButtonTrigger: Story = {
  args: { text: "Подсказка: нажмите, чтобы увидеть детали" },
  render: (args) => ({
    components: { UiInfoTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <UiInfoTooltip v-bind="args">
        <template #trigger>
          <UiButton label="Показать подсказку" variant="outline" />
        </template>
      </UiInfoTooltip>
    `,
  }),
};

export const LongText: Story = {
  args: {
    text: "готовые фотографии вы получите уже на следующий день — мы обработаем и пришлём ссылку на скачивание",
  },
  render: WithIconButtonTrigger.render,
};
