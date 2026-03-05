import { Product } from '../types';
import { ApiError } from '@/features/error-handling/utils/ApiError';

const DUMMY_API = 'https://dummyjson.com/products';

export async function getProducts(limit = 10, delay = 0, options: RequestInit = {}) {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  try {
    const res = await fetch(`${DUMMY_API}?limit=${limit}`, options);

    if (!res.ok) {
      throw new ApiError(
        'Failed to fetch products', 
        res.status, 
        res.url, 
        res.statusText
      );
    }
    
    const data = await res.json();
    return data.products.map((p: {
      id: number; title: string; price: number; description: string;
      category: string; thumbnail: string; rating: number; stock: number
    }) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.thumbnail,
      rating: {
        rate: p.rating,
        count: p.stock
      }
    })) as Product[];
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[ApiError] ${error.statusCode}: ${error.message} at ${error.url}`);
    } else {
      console.error('Unexpected error fetching products:', error);
    }
    return [];
  }
}

export async function getProductById(id: string | number, delay = 0) {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  try {
    const res = await fetch(`${DUMMY_API}/${id}`);
    
    if (!res.ok) {
      throw new ApiError(
        `Failed to fetch product with ID: ${id}`, 
        res.status, 
        res.url, 
        res.statusText
      );
    }
    
    const p = await res.json();
    return {
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.thumbnail,
      rating: {
        rate: p.rating,
        count: p.stock
      }
    } as Product;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[ApiError] ${error.statusCode}: ${error.message}`);
    } else {
      console.error(`Unexpected error fetching product ${id}:`, error);
    }
    return null;
  }
}
