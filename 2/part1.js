const fs = require('fs').promises;

const moves = {
  X: {
    value: 1,
    beats: 'C',
    equals: 'A',
  },
  Y: {
    value: 2,
    beats: 'A',
    equals: 'B',
  },
  Z: {
    value: 3,
    beats: 'B',
    equals: 'C',
  },
};

const getMatchPoints = (playerMove, oponentMove) => {
  const { value, beats, equals } = moves[playerMove];
  if (beats === oponentMove) {
    return value + 6;
  } 
  if (equals === oponentMove) {
    return value + 3;
  }
  return value;
};

const main = async () => {
  const input = await fs.readFile('./input.txt', 'utf8');
  const result = input.split('\n').reduce((acc, line) => {
    const [oponentMove, playerMove] = line.split(' ');
    return acc + getMatchPoints(playerMove, oponentMove);
  }, 0);
  console.log(result);
  process.exit();
};

main();