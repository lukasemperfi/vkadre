import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import { ref } from "vue";
import UiModal from "./index.vue";
import UiModalBody from "./Body.vue";
import UiModalCloseButton from "./CloseButton.vue";
import UiModalContent from "./Content.vue";
import UiModalFooter from "./Footer.vue";
import UiModalHeader from "./Header.vue";
import UiModalOverlay from "./Overlay.vue";
import UiButton from "../button/index.vue";

const meta = {
  title: "UI/Modal",
  component: UiModal,
  tags: ["autodocs"],
  argTypes: {
    disableTransition: { control: "boolean" },
  },
  args: {
    disableTransition: false,
  },
} satisfies Meta<typeof UiModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const template = `
  <div style="min-height: 360px; padding: 24px;">
    <UiButton variant="solid" @click="isOpen = true">Открыть модальное окно</UiButton>
    <UiModal
      v-model:is-open="isOpen"
      v-bind="args"
    >
      <UiModalOverlay />
      <UiModalContent>
        <UiModalHeader>
          <div style="display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 12px;">
            <span style="font-size: 18px; font-weight: 600;">Заголовок</span>
            <UiModalCloseButton />
          </div>
        </UiModalHeader>
        <UiModalBody>
          <p style="margin: 0; line-height: 1.5;">
            Пример текста. Клик по затемнению, по кнопке закрытия или Escape закрывают окно.
          </p>
        </UiModalBody>
        <UiModalFooter>
          <UiButton variant="outline" @click="isOpen = false">Закрыть</UiButton>
          <UiButton variant="solid">Второй экшен</UiButton>
        </UiModalFooter>
      </UiModalContent>
    </UiModal>
  </div>
`;

export const Playground: Story = {
  render: (args) => ({
    components: {
      UiModal,
      UiModalOverlay,
      UiModalContent,
      UiModalHeader,
      UiModalBody,
      UiModalFooter,
      UiModalCloseButton,
      UiButton,
    },
    setup: () => {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template,
  }),
};
