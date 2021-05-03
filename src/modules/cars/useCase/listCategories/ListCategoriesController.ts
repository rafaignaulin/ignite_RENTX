import { Request, Response } from "express";

import { ListCategoriesUseCase } from '../listCategories/ListCategoriesUseCase';

export class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCase){}

  handle(request: Request, response: Response){
    const categories = this.listCategoryUseCase.execute();

    return response.json(categories);
  }

}