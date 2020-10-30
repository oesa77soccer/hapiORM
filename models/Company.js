const { Model } = require("objection");

// ***** To be a model class, must extend the Objection `Model` class.
class Company extends Model {
  static get tableName() {
    return "company";
  }
  static get relationMappings() {
    return {
      // ***** Name after the thing being related.
      vaccines: {
        relation: Model.HasManyRelation,
        modelClass: require("./Vaccine"),
        join: {
          from: "company.id",
          to: "vaccine.company_id",
        },
      },
    };
  }
}

// ***** Module must export something for `require` to work in hapi-server.js
module.exports = Company;
