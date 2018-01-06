import { flavors } from '../../seeds/';

export default class FlavorsSeeder {
  constructor(connector) {
    this.connector = connector;

    flavors.forEach((item) => {
      this.connector.models.flavors.create({
        name: item.name,
        manufacturerId: item.manufacturerId,
      });
    });
  }
}
