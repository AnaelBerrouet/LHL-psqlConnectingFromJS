/*jshint esversion : 6 */
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const arg = process.argv[2];

function printNameLookup(result) {
  console.log(`Found ${result.length} person(s) by the name '${arg}'`);
  result.rows.forEach((person, index) => {
    console.log(`-${index + 1}: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching...");
  client.query(`SELECT * FROM famous_people WHERE first_name='${arg}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printNameLookup(result);
    client.end();
  });
});