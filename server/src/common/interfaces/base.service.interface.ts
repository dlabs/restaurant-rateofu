export interface IBaseService<T> {
  /**
   * Returns all the documents from the given collection
   * @returns {T[]} The collection of documents
   */
  findAll(): Promise<T[]>;

  /**
   * Returns the first document that matches the id from the given collection
   * @param {string} id Document id
   * @returns {T} The matching document
   */
  findOne(id: string): Promise<T>;

  /**
   * Returns all the documents from the given collection that match the given ids
   * @param {string[]} ids Document ids
   * @returns {T[]} The collection of matching documents
   */
  findByIds(ids: string[]): Promise<T[]>;

  /**
   * Inserts a new document into the database
   * @param {T} document document to be inserted
   * @returns {T} The inserted document
   */
  create(document: T): Promise<T>;

  /**
   * Updates the given document if the document exists on the database
   * @param {T} document Document to be updated
   * @returns {T} The updated document
   */
  update(id: string, document: T): Promise<T>;

  /**
   * Deletes the first document that matches the id from the given document
   * @param {string} id Document id
   * @returns {void} void
   */
  delete(id: string): Promise<void>;
}
