const { Model } = require("objection");

class Patient extends Model {
  static get tableName() {
    return "patient";
  }
  static get relationMappings() {
    //	const Film = require('Film');
    return {
      vaccines: {
        relation: Model.ManyToManyRelation,
        modelClass: require("./Vaccine"),
        join: {
          from: "patient.id",
          through: {
            from: "vaccination.patient_id",
            to: "vaccination.vaccine_id",
          },
          to: "vaccine.id",
        },
      },
    };
  }
}

module.exports = Patient;
