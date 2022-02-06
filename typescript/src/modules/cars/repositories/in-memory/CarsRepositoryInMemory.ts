import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
    const listAvailableCars = this.cars
      .filter(car => car.available === true)
      .filter(
        availableCar =>
          (name && availableCar.name === name) ||
          (brand && availableCar.brand === brand) ||
          (category_id && availableCar.category_id === category_id),
      );

    return listAvailableCars;
  }
}
