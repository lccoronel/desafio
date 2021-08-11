import { Category } from '../Model/Category';
import { ICreateCategoryDTO } from './ICategoryRepository';

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const filteredCategory = this.categories.find(
      category => category.name === name,
    );

    return filteredCategory;
  }
}

export { CategoriesRepository };
