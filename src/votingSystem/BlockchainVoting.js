class Vote {
  constructor(voteOne, voteTwo, voteThree) {
    this.personOne = voteOne;
    this.personTwo = voteTwo;
    this.personThree = voteThree;
  }
}

class Block {
  constructor(timestamp, votes, previousHash = '') {
    this.timestamp = timestamp;
    this.votes = votes;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    const content =
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.votes) +
      this.nonce;

    var CryptoJS = require('crypto-js');

    return CryptoJS.SHA256(content).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('Block mined:' + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 1;
    this.pendingVotes = [];
  }

  createGenesisBlock() {
    return new Block(Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  minePendingVotes() {
    let block = new Block(
      Date.now(),
      this.pendingVotes,
      this.getLatestBlock().hash,
    );
    block.mineBlock(this.difficulty);
    console.log('Block successfully mined!' + '\n');
    this.chain.push(block);
  }

  createVote(vote) {
    this.pendingVotes = [];
    this.pendingVotes.push(vote);
  }

  getVotesCount() {
    let votesCount = [0, 0, 0];
    for (const block of this.chain) {
      for (const vote of block.votes) {
        if (vote.personOne === 1) {
          votesCount[0]++;
        }

        if (vote.personTwo === 1) {
          votesCount[1]++;
        }

        if (vote.personThree === 1) {
          votesCount[2]++;
        }
      }
    }
    console.log('Voting Counter:\n');
    console.log('Person One has ' + votesCount[0] + ' Votes \n');
    console.log('Person Two has ' + votesCount[1] + ' Votes \n');
    console.log('Person Three has ' + votesCount[2] + ' Votes \n');
    // console.log("Voting Counter:\n");
    // console.log("Person One has ",votesCount[0]," Votes");
    // console.log("Person Two has ",votesCount[1]," Votes");
    // console.log("Person Three has ",votesCount[2]," Votes");
    return votesCount;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  traceChain() {
    for (let i = 0; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      console.log(JSON.stringify(currentBlock, undefined, 2));
      // console.log(JSON.stringify(currentBlock, undefined, 2));
    }
  }
}

export {Blockchain, Vote, Block};
