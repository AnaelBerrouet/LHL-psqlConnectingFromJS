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

const arg = process.argv.slice(2);

function addPerson(fname, lname, dob) {
  knex('famous_people')
  .insert({
    first_name: fname,
    last_name: lname,
    birthdate: dob
    }
  )
  .finally(() => {
          knex.destroy();
  });
}

addPerson(arg[0], arg[1], arg[2]);