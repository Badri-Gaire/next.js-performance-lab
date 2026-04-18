/**
 * Product Interface for ISR on Demand Demo
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageTag: string;
  updatedAt: string;
  createdAt: string;
  isNew?: boolean;
}

/**
 * Revalidation State Interface
 */
export interface RevalidationState {
  lastRevalidatedAt: string;
  isRevalidating: boolean;
  message?: string;
}
