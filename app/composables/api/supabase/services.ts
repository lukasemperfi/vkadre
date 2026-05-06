export const useServicesApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getServices(page = 1, perPage = 6): Promise<ServiceWithRelations[]> {
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      const { data, error } = await supabase
        .from("services")
        .select("*,portfolio(*),service_packages(*)")
        .order("sort_order", { ascending: true })
        .range(from, to);

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
