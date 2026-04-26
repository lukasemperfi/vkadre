import type { Ref } from "vue";

export type UiModalContext = {
  isOpen: Ref<boolean>;
  close: () => void;
  disableTransition: Readonly<Ref<boolean>>;
};

export const UI_MODAL_INJECTION_KEY = "modalContext" as const;
