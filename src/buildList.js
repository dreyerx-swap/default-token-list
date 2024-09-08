const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");

const bridgeUtils = require("@uniswap/token-list-bridge-utils");

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "DreyerX Token List",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "ipfs://QmTGjVbiSdHYhjzpeqzY6fGwGiLQuEa2hW7irD75sUSx9e",
    keywords: ["dreyerxswap", "default"],
    tokens: [
      ...mainnet
    ]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1
        }
        return t1.chainId < t2.chainId ? -1 : 1
      }),
  }
  return bridgeUtils.chainify(l1List);
};
