/* eslint-disable no-undef */

const dialect = process.env.DATABASE_DIALECT;
const host = process.env.DATABASE_HOST;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const port = process.env.DATABASE_PORT;

export { dialect, host, username, password, database, port };
