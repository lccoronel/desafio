import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    const cars = await listAvailableCarsUseCase.execute({});

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

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car_name' });

    expect(cars).toEqual([car]);
  });

  it('shoud be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_name1',
      description: 'Car desription',
      daily_rate: 140.0,
      license_plate: 'DEF-1236',
      fine_amount: 100,
      brand: 'Car_brand',
      category_id: 'Category id',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Car_brand' });

    expect(cars).toEqual([car]);
  });

  it('shoud be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_name2',
      description: 'Car desription',
      daily_rate: 140.0,
      license_plate: 'DEF-1236',
      fine_amount: 100,
      brand: 'Car_brand',
      category_id: 'Category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: 'Category_id' });

    expect(cars).toEqual([car]);
  });
});
