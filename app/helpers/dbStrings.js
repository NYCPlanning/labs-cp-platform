// Helper methods for db arrays being stored as strings
export const dbStringToArray = (string) =>
  string.replace(/[{}"]/g, '').split(';');

export const dbStringToObject = (string) =>
  dbStringToArray(string).map((a, i) => {
    const label = a.split(': ');
    return {
      agency: label[0],
      value: label[1],
      index: i,
    };
  });

export const dbStringAgencyLookup = (string, lookup) =>
  dbStringToObject(string).find(o => o.agency === lookup);
