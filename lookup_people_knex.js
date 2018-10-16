const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const arg = process.argv[2];

function printNameLookup(result,name) {
  console.log(`Found ${result.length} person(s) by the name '${name}'`);
  result.forEach((person, index) => {
    console.log(`-${index + 1}: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
  });
}


function queryByName(name, callback) {
  //Make query using knex
  knex.select('*')
    .from('famous_people')
    .where({
      first_name: name,
    })
    .catch((err) => { console.log( err); throw err })
    .then((result) => {
      callback(result, name);
    })
    .finally(() => {
          knex.destroy();
      });
}

queryByName(arg, printNameLookup);
