import { getRepository, Repository } from 'typeorm';

import { ICreateSpecificationDTO, ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { Specification } from '../entities/Specification';

export class SpecificationsReposirtory implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByname(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}
