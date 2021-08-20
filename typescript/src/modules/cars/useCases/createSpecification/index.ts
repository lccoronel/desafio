import { SpecificationsReposirtory } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationUseCase } from './CreateSpecifiactionUseCase';
import { CreateSpecificationController } from './CreateSpecificationController';

const specificationsRepository = new SpecificationsReposirtory();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };
