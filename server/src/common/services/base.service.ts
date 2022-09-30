import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IBaseService } from '../interfaces/base.service.interface';

/**
 * Generic service class which provides basic CRUD functionality
 */
@Injectable()
export class BaseService<T> implements IBaseService<T> {
  /**
   * The constructor must receive the injected model from the child class.
   *
   * @param {Model} model - The injected model
   */
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    const result: T[] = await this.model.find().exec();
    return result;
  }

  async findOne(id: string): Promise<T> {
    const result: T = await this.model.findById(id).exec();
    return result;
  }

  async findByIds(ids: string[]): Promise<T[]> {
    const result: T[] = await this.model.find().where('_id').in(ids).exec();
    return result;
  }

  async create(entity: T): Promise<T> {
    const createdEntity = await this.model.create(entity);
    return createdEntity;
  }

  async update(id: string, entity: T): Promise<T> {
    const updatedEntity = await this.model.findByIdAndUpdate(id, entity, {
      new: true,
    });
    return updatedEntity;
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
  }
}
