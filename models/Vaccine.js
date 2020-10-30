class Vaccine {
	static get tableName() {
		return 'vaccine';	
	}
	static get relationMappings() {
	//	const Film = require('Film');
	    	return {
			patients: {
				relation: Model.ManyToManyRelation,
				modelClass: Patient,
				join: {
					from: 'vaccine.id',
					through: {
						from: 'vaccination.vaccine_id',
						to: 'vaccination.patient_id'
					},
					to: 'patient.id'
				}
		      }
		}
	}
}
