============================================
🌐 Solana Token Staking & Unstaking Platform
============================================

This project is a Node.js-based backend service for handling token staking and unstaking on the Solana blockchain. It processes staking via helius webhook and supports burning tokens and transferring SOL during unstaking. 

--------------------------------------------
🚀 Features
--------------------------------------------
- Staking Webhook: Automatically mints tokens when SOL is transferred to a specific account.
- Unstaking Endpoint: Burns tokens and returns SOL to the user's wallet.

--------------------------------------------
🛠️ Technologies Used
--------------------------------------------
- Node.js & Express.js: Backend API handling.
- Helius Webhooks: For monitoring Solana transactions.
- Solana Web3.js: Interaction with Solana blockchain.

--------------------------------------------
🏗️ Project Structure
--------------------------------------------
📂 project-root  
├── 📂 controllers  
│   └── StakeUnStake.js        # Token staking/unstaking logic  
├── .env                        # Environment variables  
├── package.json                # Dependencies and scripts  
└── server.js                   # Main server file  

--------------------------------------------
📝 Setup Instructions
--------------------------------------------

1️⃣ Clone the Repository
--------------------------------------------
git clone https://github.com/your-username/solana-staking-backend.git  
cd solana-staking-backend  

2️⃣ Install Dependencies
--------------------------------------------
npm install  

3️⃣ Environment Configuration
--------------------------------------------
Create a .env file in the root directory and provide the necessary environment variables:

PRIVATE_KEY=<Your_Private_Key>  
MY_PUBLIC_KEY=<Your_Public_Key>  
TOKEN_MINT_ADDRESS=<Your_Token_Mint_Address>  

4️⃣ Run the Server
--------------------------------------------
npm start  
The server will run on http://localhost:3000.

--------------------------------------------
📄 API Endpoints
--------------------------------------------

1. Staking Webhook
--------------------------------------------
- **POST** `/helius`
- **Description**: Processes incoming staking requests.

2. Unstake Tokens
--------------------------------------------
- **POST** `/unstake`
- **Description**: Unstakes tokens and transfers SOL back to the user.
- **Payload Example**:
  {
    "userPublicKey": "string",  
    "amount": number 
  }

