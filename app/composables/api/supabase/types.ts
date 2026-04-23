import type { Database } from "~~/types/supabase";

export type PortfolioRow = Database["public"]["Tables"]["portfolio"]["Row"];
export type PhotographerRow =
  Database["public"]["Tables"]["photographers"]["Row"];
export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type ServicePackageRow =
  Database["public"]["Tables"]["service_packages"]["Row"];
export type LocationRow = Database["public"]["Tables"]["locations"]["Row"];
export type SlotRow = Database["public"]["Tables"]["slots"]["Row"];
export type LocationReviewRow =
  Database["public"]["Tables"]["location_reviews"]["Row"];
export type LocationReviewInsert =
  Database["public"]["Tables"]["location_reviews"]["Insert"];

export type PhotographerWithPortfolio = PhotographerRow & {
  portfolio: PortfolioRow[];
};

export type ServiceWithRelations = ServiceRow & {
  portfolio: PortfolioRow[];
  service_packages: ServicePackageRow[];
};

export type LocationWithRelations = LocationRow & {
  service_packages: ServicePackageRow[];
  slots: SlotRow[];
  portfolio: PortfolioRow[];
};

export type LocationReviewWithLocation = LocationReviewRow & {
  locations: LocationRow | null;
};
