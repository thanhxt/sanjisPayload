export type SideDish = {
  id: string;
  position?: number;
  titleDE: string;
  titleEN?: string;
  price: string;
  category: 'side' | 'sauce';
  createdAt: string;
  updatedAt: string;
}
