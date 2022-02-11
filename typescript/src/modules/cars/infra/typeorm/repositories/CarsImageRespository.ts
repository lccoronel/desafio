import { getRepository } from 'typeorm';

import { ICarsImageRespository } from '@modules/cars/repositories/ICarsImageRepository';
import { CarImage } from '../entities/CarImage';

export class CarsImageRepository implements ICarsImageRespository {
  constructor(private repository = getRepository(CarImage)) {}

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}
