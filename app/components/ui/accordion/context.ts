import type { InjectionKey } from "vue";

export type UiAccordionItemKey = string | number;

export type UiAccordionContext = {
  uid: string;
  isOpen: (key: UiAccordionItemKey) => boolean;
  toggle: (key: UiAccordionItemKey) => void;
};

export const UI_ACCORDION_KEY: InjectionKey<UiAccordionContext> =
  Symbol("UiAccordion");

export type UiAccordionItemContext = {
  itemKey: UiAccordionItemKey;
  isOpen: boolean;
  disabled: boolean;
  buttonId: string;
  panelId: string;
  toggle: () => void;
};

export const UI_ACCORDION_ITEM_KEY: InjectionKey<UiAccordionItemContext> =
  Symbol("UiAccordionItem");
