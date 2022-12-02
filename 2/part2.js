const fs = require('fs').promises;

const moves = {
  A: {
    value: 1,
    beats: 'C',
    loses: 'B',
  },
  B: {
    value: 2,
    beats: 'A',
    loses: 'C',
  },
  C: {
    value: 3,
    beats: 'B',
    loses: 'A',
  },
};

const getMatchPoints = (opponentMove, strategy) => {
  const { value, beats, loses } = moves[opponentMove];
  if (strategy === 'X') {
    return moves[beats].value;    
  }
  if (strategy === 'Y') {
    return 3 + value;
  }
  return 6 + moves[loses].value;
};

const main = async () => {
  const input = await fs.readFile('./input.txt', 'utf8');
  const result = input.split('\n').reduce((acc, line) => {
    const [opponentMove, strategy] = line.split(' ');
    return acc + getMatchPoints(opponentMove, strategy);
  }, 0);
  console.log(result);
  process.exit();
};

main();