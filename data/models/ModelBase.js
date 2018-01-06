export default class ModelBase {
  constructor(connector) {
    this.connector = connector;
    this.db = this.connector.db;
    this.sequelize = this.connector.sequelize;
  }

  /**
   *
   * @param config
   * @property {String} config.modelName - The name of the model. The model will be stored in `sequelize.models` under this name
   * @property {Object config.attributes - An object, where each attribute is a column of the table.
   * @property {Object} config.options - These options are merged with the default define options provided to the Sequelize constructor and passed to Model.init()
   * @returns {Model}
   */
  define(config) {
    const base = {
      modelName: '',
      attributes: {},
      options: {},
    };

    const { modelName, attributes, options } = Object.assign({}, base, config);

    return this.db.define(modelName, attributes, options);
  }
}
