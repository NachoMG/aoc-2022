const { open } = require('fs').promises;

const hasIntersection = ([[ startA, endA ], [ startB, endB ]]) => (
  (
    startA >= startB && startA <= endB
    || endA >= startB && endA <= endB
  )
  ||
  (
    startB >= startA && startB <= endA
    || endB >= startA && endB <= endA
  )
);

const main = async () => {
  const file = await open('input.txt');
  let overlappedAssignments = 0;
  for await (const line of file.readLines()) {
    const ranges = line.split(',')
      .map(
        (assignment) => (
          assignment.split('-').map((value) => Number.parseInt(value))
        )
      );
    if (hasIntersection(ranges)) {
      overlappedAssignments++;
    }
  }
  console.log(overlappedAssignments);
  process.exit();
};

main();
