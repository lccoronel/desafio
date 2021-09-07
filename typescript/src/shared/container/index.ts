import { container } from 'tsyringe';

import { ICategoryRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsReposirtory } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsReposirtory',
  SpecificationsReposirtory,
);
