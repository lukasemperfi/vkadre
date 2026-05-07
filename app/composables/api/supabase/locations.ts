export const useLocationsApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getLocations(
      page?: number,
      perPage?: number,
    ): Promise<LocationWithRelations[]> {
      let query = supabase
        .from("locations")
        .select("*, service_packages(*), slots(*), portfolio(*)");

      if (page !== undefined && perPage !== undefined) {
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;
        query = query.range(from, to);
      }

      const { data, error } = await query;

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
