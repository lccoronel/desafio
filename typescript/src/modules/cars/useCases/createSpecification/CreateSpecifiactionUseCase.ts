import { inject, injectable } from 'tsyringe';

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../../repositories/ISpecificationRepository';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsReposirtory')
    private specificationsRepository: ISpecificationRepository,
  ) {}

  execute({ name, description }: ICreateSpecificationDTO): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByname(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
