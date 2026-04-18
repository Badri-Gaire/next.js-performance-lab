import { Product } from "../types/product";

/**
 * Initial dummy data for the ISR demo.
 */
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cyberpunk Headphones",
    description: "Premium noise-canceling headphones with subtle RGB accents and futuristic design.",
    imageUrl: "https://placehold.co/400x400/0a0a0a/3b82f6?text=Headphones",
    imageTag: "Headphones",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Minimalist Smart Watch",
    description: "A high-end, futuristic minimalist watch with a sapphire glass and carbon fiber strap.",
    imageUrl: "https://placehold.co/400x400/0a0a0a/10b981?text=Smart+Watch",
    imageTag: "Watch",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Architectural Desk Lamp",
    description: "Sleek, modern minimalist desk lamp with warm LED glow and matte black finish.",
    imageUrl: "https://placehold.co/400x400/0a0a0a/f59e0b?text=Desk+Lamp",
    imageTag: "Lamp",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
