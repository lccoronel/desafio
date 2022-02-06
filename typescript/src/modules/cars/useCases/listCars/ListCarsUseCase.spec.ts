import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('shoud be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car desription',
      daily_rate: 140.0,
      license_plate: 'DEF-1236',
      fine_amount: 100,
      brand: 'Car brand',
      category_id: 'Category id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('shoud be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_name',
      description: 'Car desription',
      daily_rate: 140.0,
      license_plate: 'DEF-1236',
      fine_amount: 100,
      brand: 'Car brand',
      category_id: 'Category id',
    });

    const cars = await listCarsUseCase.execute({ name: 'Car_name' });

    expect(cars).toEqual([car]);
  });
});
