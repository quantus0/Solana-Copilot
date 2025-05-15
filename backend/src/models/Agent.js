class Agent {
  constructor({ id, walletAddress, goal, status, txCount }) {
    this.id = id;
    this.walletAddress = walletAddress;
    this.goal = goal;
    this.status = status;
    this.txCount = txCount;
  }
}

module.exports = Agent;