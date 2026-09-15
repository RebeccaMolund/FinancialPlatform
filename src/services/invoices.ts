import type { MockRow } from '../types/invoice';
import { MOCK_DATA } from '../data/mock-invoices';

export async function getInvoices(): Promise<MockRow[]> {
  // Replace this return with a real fetch() call when the API is available.
  return MOCK_DATA;
}
