import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './createCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('shoulde be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Decription',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });

    expect(car).toHaveProperty('id');
  });

  it('shoulde not be able to create a new car with exists license plate', async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car',
        description: 'Decription',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });

      await createCarUseCase.execute({
        name: 'Name car2',
        description: 'Decription',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Decription',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });

    expect(car.available).toBe(true);
  });

  it('shoulde not be able to create a new car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car',
        description: 'Decription',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });

      await createCarUseCase.execute({
        name: 'Name car2',
        description: 'Decription',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
