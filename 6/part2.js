const fs = require('fs').promises;

const getStartMarkerIndex = (datastream, markerLength) => {
  for (let i = 0; i < datastream.length; i++) {
    const startMarkerCandidate = datastream.substring(i, i + markerLength);
    if (new Set(startMarkerCandidate).size === markerLength) {
      return i + markerLength;
    }
  }
};

const main = async () => {
  const datastream = await fs.readFile('input.txt', 'utf-8');
  console.log(getStartMarkerIndex(datastream, 14));
};

main();
