// =============================
// REMIX JAVASCRIPT VERSION
// No dotenv, no fs, no imports
// =============================

// Your deployed contract address (replace)
const contractAddress = "0x51f8f16f336cf4b98f661147Abc3d30Cdd9bf7e5";

// Your ABI (copy from Remix compiler after compiling Betting.sol)
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "player",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "numTickets",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentPrizePool",
          "type": "uint256"
        }
      ],
      "name": "TicketBought",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "prizeAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountWon",
          "type": "uint256"
        }
      ],
      "name": "WinnerPicked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "enterCompetition",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPrizePool",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "getTicketInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "messageLostMoney",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "lostMoney",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "messageTicketCount",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "ticketCount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "messageProbability",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "probability",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "playerBets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "prizePool",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tickets",
      "outputs": [
        {
          "internalType": "address",
          "name": "player",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];

// Load Remix’s built-in Ethereum provider
const provider = new ethers.providers.Web3Provider(web3.currentProvider);

// Get the account selected in MetaMask (Remix uses that)
let signer;

async function setup() {
    const accounts = await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner(accounts[0]);
    console.log("Connected with wallet:", accounts[0]);
}

const getContract = () => {
    return new ethers.Contract(contractAddress, contractABI, signer);
};

// =============================
// FUNCTIONS
// =============================

async function enterCompetition() {
    const contract = getContract();
    console.log("Sending 0.02 ETH to enterCompetition...");

    const tx = await contract.enterCompetition({
        value: ethers.utils.parseEther("0.02")
    });

    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Transaction confirmed!");
}

async function pickWinner() {
    const contract = getContract();
    console.log("Calling pickWinner...");

    const tx = await contract.pickWinner();
    console.log("Transaction sent:", tx.hash);

    await tx.wait();
    console.log("Winner selected!");
}

// =============================
// AUTO-RUN
// =============================

(async () => {
    await setup();

    // Uncomment the one you want to test:
    await enterCompetition();
    // await pickWinner();
})();
