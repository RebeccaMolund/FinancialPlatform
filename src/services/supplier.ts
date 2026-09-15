import { SUPPLIER_DATA } from "../data/supplier";
import type { SupplierPoint } from "../types/supplier";

export async function getSupplierData(): Promise<SupplierPoint[]> {
  // Replace this return with a real fetch() call when the API is available.
  return SUPPLIER_DATA;
}
