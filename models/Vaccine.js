const { Model } = require("objection");

class Vaccine extends Model {
  static get tableName() {
    return "vaccine";
  }

  static get relationMappings() {
    return {
      patients: {
        relation: Model.ManyToManyRelation,
        modelClass: require("./Patient"),
        join: {
          from: "vaccine.id",
          through: {
            from: "vaccination.vaccine_id",
            to: "vaccination.patient_id",
          },
          to: "patient.id",
        },
      },
	  company: {
		relation: Model.BelongsToOneRelation,
		modelClass: require("./Company"),
		join: {
			from: "vaccine.company_id",
			to: "company.id"
		}
	  },
    };
  }
}

module.exports = Vaccine;
