import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import { ref } from "vue";
import UiModalDrawer from "./Drawer.vue";
import UiModalDrawerContent from "./DrawerContent.vue";
import UiModalBody from "./Body.vue";
import UiModalCloseButton from "./CloseButton.vue";
import UiModalFooter from "./Footer.vue";
import UiModalHeader from "./Header.vue";
import UiModalOverlay from "./Overlay.vue";
import UiButton from "../button/index.vue";

const meta = {
  title: "UI/Modal/Drawer",
  component: UiModalDrawer,
  tags: ["autodocs"],
  argTypes: {
    disableTransition: { control: "boolean" },
  },
  args: {
    disableTransition: false,
  },
} satisfies Meta<typeof UiModalDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const template = `
  <div style="min-height: 360px; padding: 24px;">
    <UiButton variant="solid" @click="isOpen = true">Открыть панель</UiButton>
    <UiModalDrawer
      v-model:is-open="isOpen"
      v-bind="args"
    >
      <UiModalOverlay />
      <UiModalDrawerContent>
        <UiModalHeader>
          <div style="display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 12px;">
            <span style="font-size: 18px; font-weight: 600;">Панель</span>
            <UiModalCloseButton />
          </div>
        </UiModalHeader>
        <UiModalBody>
          <p style="margin: 0; line-height: 1.5;">
            Контент выезжает справа. Клик по затемнению, кнопка закрытия и Escape ведут себя так же, как у модалки.
          </p>
        </UiModalBody>
        <UiModalFooter>
          <UiButton variant="outline" @click="isOpen = false">Закрыть</UiButton>
          <UiButton variant="solid">Второй экшен</UiButton>
        </UiModalFooter>
      </UiModalDrawerContent>
    </UiModalDrawer>
  </div>
`;

export const Playground: Story = {
  render: (args) => ({
    components: {
      UiModalDrawer,
      UiModalOverlay,
      UiModalDrawerContent,
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
