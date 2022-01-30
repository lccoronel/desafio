import { container } from 'tsyringe';

import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsReposirtory } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

container.registerSingleton<ICategoryRepository>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<ISpecificationRepository>('SpecificationsReposirtory', SpecificationsReposirtory);
container.registerSingleton<IUsersReposiotry>('UsersRepository', UsersRepository);
