export const useServicesApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getServices(
      page?: number,
      perPage?: number,
    ): Promise<ServiceWithRelations[]> {
      let query = supabase
        .from("services")
        .select("*, portfolio(*), service_packages(*)")
        .order("sort_order", { ascending: true });

      if (page !== undefined && perPage !== undefined) {
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;
        query = query.range(from, to);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data ?? [];
    },

    async getService(id: string): Promise<ServiceWithRelations | null> {
      const { data, error } = await supabase
        .from("services")
        .select("*,portfolio(*),service_packages(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      return data ?? null;
    },
  };
};
