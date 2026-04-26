import { useScrollLock } from "@vueuse/core";
import { watch, onMounted, onUnmounted, type Ref } from "vue";

export function useBodyOverlay(isOpen: Ref<boolean>) {
  const isScrollLocked = useScrollLock(document.body);

  watch(isOpen, (val) => {
    isScrollLocked.value = val;
  });

  const close = () => {
    isOpen.value = false;
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen.value) {
      close();
    }
  };

  onMounted(() => document.addEventListener("keydown", handleEscape));
  onUnmounted(() => document.removeEventListener("keydown", handleEscape));

  return { close };
}
