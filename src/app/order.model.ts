import { Item } from "./item.model";

export interface Order {
  id: string,
  tableId: string,
  items: Item[]
}
