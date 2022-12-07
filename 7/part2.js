const { open } = require('fs').promises;

class Directory {

  constructor(name) {
    this.name = name;
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  getSize() {
    return this.nodes.reduce((acc, node) => {
      if (node instanceof Directory) {
        return acc + node.getSize();
      }
      return acc + node.size;
    }, 0);
  }

}

class File {

  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

}

const dirToDeleteCandidates = (root, minSize) => {
  let nodes = [];
  for (const node of root.nodes) {
    if (node instanceof Directory) {
      nodes = [...nodes, ...dirToDeleteCandidates(node, minSize)];
    }
  }

  if (root.getSize() >= minSize) {
    nodes.push(root);
  }

  return nodes;
}

const main = async () => {
  const root = new Directory('/');
  let currentPath = [root];

  const file = await open('input.txt');
  for await (const line of file.readLines()) {
    if (line === '$ cd /') {
      continue;
    }

    const lineArray = line.split(' ');
    if (lineArray[0] === '$') {
      if (lineArray[1] === 'cd') {
        if (lineArray[2] === '..') {
          currentPath.shift();
        } else {
          currentPath.unshift(
            currentPath[0].nodes.find((node) => node instanceof Directory && node.name === lineArray[2])
            || new Directory(lineArray[2])
          );
        }
      }
    } else if (lineArray[0] === 'dir') {
      currentPath[0].addNode(new Directory(lineArray[1]));
    } else {
      currentPath[0].addNode(new File(lineArray[0], Number.parseInt(lineArray[0])));
    }
  }

  const neededSpace = 30000000 - (70000000 - root.getSize());
  const candidateDirs = dirToDeleteCandidates(root, neededSpace);
  let min = 70000000;
  for (const candidateDir of candidateDirs) {
    const size = candidateDir.getSize();
    if (size < min) {
      min = size;
    }
  }
  console.log(min);
};

main();
