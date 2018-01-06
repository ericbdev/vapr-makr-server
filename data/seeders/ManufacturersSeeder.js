import { manufacturers } from '../../seeds/';

export default class ManufacturersSeeder {
  constructor(connector) {
    this.connector = connector;

    manufacturers.forEach((item) => {
      this.connector.models.manufacturers.create({
        manufacturerId: item.manufacturerId,
        shortName: item.shortName,
        longName: item.longName,
      });
    });
  }
}
