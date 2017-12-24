import flavors from '../seeds/flavors.json';
import manufacturers from '../seeds/manufacturers.json';
import recipes from '../seeds/recipes.json';

export const seedFlavors = (Model) => {
  flavors.forEach((item) => {
    Model.create({
      name: item.name,
      manufacturerId: item.manufacturerId,
    });
  });
};

export const seedManufacturers = (Model) => {
  manufacturers.forEach((item) => {
    Model.create({
      manufacturerId: item.manufacturerId,
      shortName: item.shortName,
      longName: item.longName,
    });
  });
};

export const seedRecipes = (Model) => {
  recipes.forEach((item) => {
    Model.create({
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
};
