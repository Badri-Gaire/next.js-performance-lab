export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type RenderingType = 'SSR' | 'SSG' | 'ISR' | 'CSR' | 'PPR' | 'RSC' | 'CRP' | 'DOM' | 'HYBRID' | 'ERROR' | 'CACHE';

export interface ExpectedHeader {
  key: string;
  value: string;
  description: string;
  isVercelSpecific?: boolean;
}

export interface RenderingMeta {
  type: RenderingType;
  title: string;
  description: string;
  benefit: string;
  strategy: string;
  expectedHeaders: ExpectedHeader[];
}
