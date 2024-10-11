export interface CateringItem {
  id?: number;
  name: string;
  description: string;
  adultPrice: number;
  childPrice: number;
  adultQuantity: number;
  childQuantity: number;
  category: string;
  total:number
  type:string;
}
