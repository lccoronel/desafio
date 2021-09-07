import { Response, Request } from 'express';
import { inject, injectable } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

@injectable()
class CreateCategoryController {
  constructor(
    @inject('CategoriesRepository')
    private createCategoryService: CreateCategoryUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.createCategoryService.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
