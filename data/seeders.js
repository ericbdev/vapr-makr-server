import flavors from '../seeds/flavors.json';
import manufacturers from '../seeds/manufacturers.json';

export const seedFlavors = (Model) => {
  flavors.forEach((item) => {
    Model.create({
      id: item.id,
      name: item.name,
      manufacturerId: item.manufacturer,
    });
  });
};

export const seedManufacturers = (Model) => {
  manufacturers.forEach((item) => {
    Model.create({
      id: item.id,
      shortName: item.shortName,
      longName: item.longName,
    });
  });
};
