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

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByname(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
