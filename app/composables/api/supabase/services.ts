import type { Database } from "~~/types/supabase";

export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type PortfolioRow = Database["public"]["Tables"]["portfolio"]["Row"];
export type ServicePackageRow =
  Database["public"]["Tables"]["service_packages"]["Row"];

export type ServiceWithRelations = ServiceRow & {
  portfolio: PortfolioRow[];
  service_packages: ServicePackageRow[];
};

export const useServicesApi = () => {
  const supabase = useSupabaseClient<Database>();
  return {
    async getServices(): Promise<ServiceWithRelations[]> {
      const { data, error } = await supabase
        .from("services")
        .select("*,portfolio(*),service_packages(*)");

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

