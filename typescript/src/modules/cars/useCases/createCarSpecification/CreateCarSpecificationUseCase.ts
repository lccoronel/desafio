import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifiaction_id: string[];
}

export class CreateCarSpecificationUseCase {
  constructor(private carsRepository: ICarsRepository, private specificationsRepository: ISpecificationRepository) {}

  async execute({ car_id, specifiaction_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) throw new AppError('Car does not exists!');

    const specifications = await this.specificationsRepository.findByIds(specifiaction_id);

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);
    return carExists;
  }
}
