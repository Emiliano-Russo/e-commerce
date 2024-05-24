export interface Product {
  readonly _id: string;
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly category?: string;
  readonly imageUrl: string;
}
