import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface ICarsImageRespository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
