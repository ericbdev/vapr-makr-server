import { recipes } from '../../seeds/';

export default class RecipesSeeder {
  constructor(connector) {
    this.connector = connector;

    recipes.forEach((item) => {
      this.connector.models.recipes.create({
        name: item.name,
        resultAmount: item.resultAmount,
        resultStrength: item.resultStrength,
        resultVG: item.resultVG,
        resultPG: item.resultPG,
        nicStrength: item.nicStrength,
        nicVG: item.nicVG,
        nicPG: item.nicPG,
        flavors: item.flavors,
      });
    });
  }
}
