export interface IOrderService {
  /**
   * Return all the orders which have or do not have unfinished items
   * @param {boolean} has_unfinished_items
   */
  getOrdersByFinishedItems(has_unfinished_items: boolean);
}
