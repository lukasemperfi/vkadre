export function useLoadMore<T>(
  fetchMethod: (page: number, perPage: number) => Promise<T[]>,
  options = { perPage: 6, key: "load-more-data" },
) {
  const items = useState<T[]>(options.key, () => []);
  const page = useState<number>(`${options.key}-page`, () => 1);
  const isFinished = useState<boolean>(`${options.key}-finished`, () => false);

  const isLoading = ref(false);

  async function load(isInitial = false) {
    if (isLoading.value || (isFinished.value && !isInitial)) return;

    isLoading.value = true;
    if (!isInitial) page.value++;

    try {
      const newData = await fetchMethod(page.value, options.perPage);

      if (newData.length < options.perPage) {
        isFinished.value = true;
      }

      if (isInitial) {
        items.value = newData;
      } else {
        items.value.push(...newData);
      }
    } catch (error) {
      if (!isInitial) page.value--;
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return { items, isLoading, isFinished, load };
}
