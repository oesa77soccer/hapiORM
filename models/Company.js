class Company {
	static get tableName() {
		return 'company';	
	}
	static get relationMappings() {
		// const Vaccination = require('Vacci');
	    	return {
			companies: {
				relation: Model.HasManyRelation,
				modelClass: Vaccination,
				join: {
					from: 'company.id',
					to: 'vaccine.company_id'
				}
		      }
		}
	}

}
