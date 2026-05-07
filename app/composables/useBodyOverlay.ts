import { useScrollLock } from "@vueuse/core";
import { watch, onMounted, onUnmounted, ref, type Ref } from "vue";

export function useBodyOverlay(isOpen: Ref<boolean>) {
  // 1. Создаем реактивную ссылку на элемент. На сервере это null.
  const bodyElement = ref<HTMLElement | null>(null);

  // 2. Передаем ref в useScrollLock. Он автоматически начнет работать,
  // как только в bodyElement появится значение.
  const isScrollLocked = useScrollLock(bodyElement);

  // 3. Следим за изменением состояния модалки
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

  onMounted(() => {
    // 4. Только здесь (на клиенте) получаем доступ к DOM
    bodyElement.value = document.body;
    document.addEventListener("keydown", handleEscape);
  });

  onUnmounted(() => {
    // 5. Не забываем чистить слушатель
    document.removeEventListener("keydown", handleEscape);
    // Принудительно разблокируем скролл при уничтожении компонента
    isScrollLocked.value = false;
  });

  return { close };
}
