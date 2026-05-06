export const useLocationsApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getLocations(
      page = 1,
      perPage = 6,
    ): Promise<LocationWithRelations[]> {
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      const { data, error } = await supabase
        .from("locations")
        .select("*,service_packages(*),slots(*),portfolio(*)")
        .range(from, to);

      if (error) throw error;

      return data ?? [];
    },

    async getLocation(id: string): Promise<LocationWithRelations | null> {
      const { data, error } = await supabase
        .from("locations")
        .select("*,service_packages(*),slots(*),portfolio(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      return data ?? null;
    },
  };
};
