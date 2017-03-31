// appends _dev to a tablename if the tablename exists in the DEV_TABLES environment variable (comma-delimited string)

function devTables(tablename) {
  if (process.env.DEV_TABLES === undefined) {
    return tablename;
  }

  const tables = process.env.DEV_TABLES.split(',');

  if (tables.indexOf(tablename) > -1) {
    return `${tablename}_dev`;
  }

  return tablename;
}

export default devTables;
