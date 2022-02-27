import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRespository: IRentalsRepository,
  ) {}

  async excute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRespository.findByUser(user_id);

    return rentalsByUser;
  }
}
