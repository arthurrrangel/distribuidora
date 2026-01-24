export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: string;
  image?: string;
  packageSize?: string;
  discount?: number;
  handle: string;
}
