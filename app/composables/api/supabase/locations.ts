import type { Database } from "~~/types/supabase";

export type LocationRow = Database["public"]["Tables"]["locations"]["Row"];
export type ServicePackageRow =
  Database["public"]["Tables"]["service_packages"]["Row"];
export type SlotRow = Database["public"]["Tables"]["slots"]["Row"];
export type PortfolioRow = Database["public"]["Tables"]["portfolio"]["Row"];

export type LocationWithRelations = LocationRow & {
  service_packages: ServicePackageRow[];
  slots: SlotRow[];
  portfolio: PortfolioRow[];
};

export const useLocationsApi = () => {
  const supabase = useSupabaseClient<Database>();
  return {
    async getLocations(): Promise<LocationWithRelations[]> {
      const { data, error } = await supabase
        .from("locations")
        .select("*,service_packages(*),slots(*),portfolio(*)");

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

