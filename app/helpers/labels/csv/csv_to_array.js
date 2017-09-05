const fs = require('fs');
const readline = require('readline');

function csv_to_array(filename) {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(`${filename}.csv`),
  });


  const array = [];

  lineReader.on('line', (line) => {
    const clean_line = line.replace(/"/g, '');
    array.push({ value: clean_line, label: clean_line });
  });

  lineReader.on('close', () => {
    fs.writeFile(`../js/${filename}.js`, `const labels = ${JSON.stringify(array)}; export default labels;`);
  });
}

csv_to_array('censtract');
csv_to_array('nta');
csv_to_array('council');
csv_to_array('cd');
csv_to_array('congdist');
csv_to_array('firediv');
csv_to_array('firebn');
csv_to_array('fireconum');
csv_to_array('municourt');
csv_to_array('policeprecinct');
csv_to_array('stateassemblydistrict');
csv_to_array('statesenatedistrict');
csv_to_array('schooldistrict');
csv_to_array('taz');
