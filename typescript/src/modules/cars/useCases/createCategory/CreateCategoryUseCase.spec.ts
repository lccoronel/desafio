import { AppError } from '@shared/errors/AppError';
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('Shoulde be able to create a new category', async () => {
    const category = { name: 'Category Test', description: 'Description Test' };

    await createCategoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Shoulde be able to create a new category with the same name', () => {
    expect(async () => {
      const category = { name: 'Category Test', description: 'Description Test' };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
