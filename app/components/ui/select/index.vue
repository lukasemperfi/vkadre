<script setup lang="ts">
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import { size } from "@floating-ui/dom";

import { computed, ref } from "vue";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  modelValue?: string | number;
  placeholder?: string;
  name?: string;
  label?: string;
  id?: string;
  errorMessage?: string;
  errorId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const reference = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);

const { floatingStyles } = useFloating(reference, floating, {
  open: computed(() => isOpen.value),
  placement: "bottom",
  strategy: "fixed",
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(1),
    flip({
      fallbackPlacements: ["top", "bottom"],
      padding: 10,
    }),
    shift({
      padding: 10,
    }),
    size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      },
    }),
  ],
});

const toggleSelect = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: Option) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const onNativeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};

onClickOutside(
  floating,
  () => {
    if (isOpen.value) isOpen.value = false;
  },
  { ignore: [reference] },
);

const selectedLabel = computed(() => {
  const option = props.options.find((opt) => opt.value === props.modelValue);
  return option ? option.label : null;
});
</script>

<template>
  <div class="select" ref="reference" :class="{ 'is-open': isOpen }">
    <select
      class="select__native"
      :id="id ? `${id}-native` : undefined"
      :value="modelValue"
      :name="name"
      tabindex="-1"
      aria-hidden="true"
      @change="onNativeChange"
    >
      <option value="" disabled selected v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <div
      class="select__trigger"
      :id="id"
      role="button"
      tabindex="0"
      :aria-expanded="isOpen"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? errorId : undefined"
      @click="toggleSelect"
    >
      <span
        class="select__value"
        :class="{
          'is-placeholder': !modelValue && Boolean(label ?? placeholder),
        }"
      >
        {{ !modelValue ? (label ?? placeholder) : selectedLabel }}
      </span>

      <div class="select__icon" :class="{ 'is-rotated': isOpen }">
        <UiIcon name="fill-arrow-down" />
      </div>
    </div>

    <p v-if="errorMessage" :id="errorId" class="select__error" role="alert">
      {{ errorMessage }}
    </p>

    <Teleport to="body">
      <Transition name="fade-slide">
        <ul
          v-if="isOpen"
          ref="floating"
          class="select__dropdown"
          :style="{
            ...floatingStyles,
            zIndex: 99999,
          }"
        >
          <li
            v-for="option in options"
            :key="option.value"
            class="select__option"
            :class="{ 'is-selected': option.value === modelValue }"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  font-family: var(--font-family);
}

.select__native {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: globalFunctions.fluidValue(10px, 17px, 320px, 1440px);
  border-bottom: 1px solid var(--gray);
  cursor: pointer;
  transition: border-color 0.3s ease;

  @media (hover: hover) {
    &:hover {
      border-color: var(--light-colors-black---light, #000000);
    }
  }
}

.select__error {
  margin: 0;
  font-size: 10px;
  color: var(--light-colors-errors---light);
  position: absolute;
  top: 100%;
  left: 0;
}

.is-open .select__trigger {
  border-color: var(--light-colors-black---light, #000000);
}

.select__value {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--black);
  font: inherit;
  font-weight: 600;
  font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
  text-transform: uppercase;

  @media (max-width: globalBreakpoints.$breakpoint-xs) {
    font-weight: 500;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &.is-placeholder {
    font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
    color: var(--black);
    opacity: 0.2;
  }
}

.select__icon {
  display: flex;
  transition: transform 0.3s ease;
  color: #707070;

  &.is-rotated {
    transform: rotateX(180deg);
  }

  svg {
    width: 10px;
    height: 8px;
  }
}

.select__dropdown {
  margin: 0;
  padding-block: globalFunctions.fluidValue(10px, 18px, 320px, 1440px);
  background: #ffffff;
  list-style: none;
  z-index: 100;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  max-height: 367px;
  overflow-y: auto;
}

.select__option {
  padding-block: globalFunctions.fluidValue(10px, 10px, 320px, 1440px);
  padding-inline: globalFunctions.fluidValue(10px, 28px, 320px, 1440px);
  font-size: globalFunctions.fluidValue(14px, 16px, 320px, 1440px);
  cursor: pointer;
  transition: background 0.2s ease;
  text-transform: uppercase;

  @media (hover: hover) {
    &:hover {
      background-color: #f0f0f0;
      font-weight: 600;
    }
  }

  &.is-selected {
    background-color: #f9f9f9;
    font-weight: 500;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}
</style>
