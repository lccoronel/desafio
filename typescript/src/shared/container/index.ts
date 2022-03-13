import { container } from 'tsyringe';

import '@shared/container/providers/MailProvider';
import '@shared/container/providers/DateProvider';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRespository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<ICategoryRepository>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<ISpecificationRepository>('SpecificationsRepository', SpecificationsRepository);
container.registerSingleton<IUsersReposiotry>('UsersRepository', UsersRepository);
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
container.registerSingleton<ICarsImagesRepository>('CarsImagesRepository', CarsImagesRepository);
container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository);
container.registerSingleton<IUsersTokenRepository>('UsersTokenRepository', UsersTokenRepository);
