'use server';

import { revalidateTag } from 'next/cache';
import { updateInventory } from '../services/cache-service';

/**
 * Server Action to update database and trigger on-demand revalidation
 */
export async function revalidateInventoryAction() {
  // 1. Update the "DB"
  await updateInventory();
  
  // 2. Invalidate the specific tag used by Zone 2 components
  // @ts-ignore - Next.js 16 typing mismatch in some build environments
  revalidateTag('inventory-data');
  
  return { success: true };
}
