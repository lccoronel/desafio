import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../../repositories/ISpecificationRepository';

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

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
