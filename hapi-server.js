// Configure Knex.
const knex = require("knex")({
  client: "pg",
  searchPath: "hapi_orm",
  connection: {
    host: "faraday.cse.taylor.edu",
    user: "logan_roth",
    password: "fatipofo",
    database: "logan_roth",
  },
});

// Configure Objection.
const { Model } = require("objection");
Model.knex(knex);
//module.exports = { knex, Model };

// Load model classes.
const Company = require("./models/Company");
const Patient = require("./models/Patient");
const Vaccine = require("./models/Vaccine");

// Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  // Log stuff.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  server.route([
    {
      method: "POST",
      path: "/patient",
      handler: (request, h) => {
        //return "worked?";
        Patient.query().insert(request.payload);
      },
    },

    {
      method: "POST",
      path: "/patients/{pid}/vaccines/{vid}",
      handler: (request, h) => {
        return Patient.relatedQuery("vaccines")
          .for(request.params.pid)
          .relate(request.params.vid);
      },
    },

    {
      method: "GET",
      path: "/",
      handler: (request, h) => "Hello, Hapi",
    },

    {
      method: "GET",
      path: "/companies",
      handler: (request, h) => {
        // ***** Needs to return a value because inside block
        return Company.query().withGraphFetched("vaccines").first();
      },
    },

    {
      method: "GET",
      path: "/patients",
      handler: (request, h) => {
        return knex.select("*").from("patient");
      },
    },

    {
      method: "GET",
      path: "/patients{id}",
      handler: (request, h) => {},
    },

    {
      method: "GET",
      path: "/vaccines",
      handler: (request, h) => {
        return knex.select().from();
      },
    },

    {
      method: "PATCH",
      path: "/patients/{id}",
      handler: (request, h) => {
        return knex.select().from();
      },
    },

    {
      method: "DELETE",
      path: "/patients/{pid}/vaccines/{vid}",
      handler: (request, h) => {},
    },
  ]);

  console.log("Server listening on", server.info.uri);
  await server.start();
};

init();
