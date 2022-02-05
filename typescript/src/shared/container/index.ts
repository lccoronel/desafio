import { container } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsReposirtory } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

container.registerSingleton<ICategoryRepository>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<ISpecificationRepository>('SpecificationsReposirtory', SpecificationsReposirtory);
container.registerSingleton<IUsersReposiotry>('UsersRepository', UsersRepository);
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
