## 💠 dDonate Frontend

This is the frontend interface for the AlgoCharity decentralized donation platform, built using React, Vite, and TailwindCSS.
It connects to the AlgoCharity smart contract deployed on the Algorand blockchain.

---

## 🌍 Overview

The dDonate DApp allows users to:

Connect their Pera Wallet

View verified charities

Donate ALGO securely and transparently

Track total donations

Allow charities to withdraw funds

The application interacts with the backend smart contract in algocharity-contracts via the Algorand SDK.

---

## 🧰 Tech Stack
|Layer |	Technology |
|------|--------------|
|**Frontend Framework** |	React + Vite |
|**Styling** |	TailwindCSS + Framer Motion |
|**Blockchain** | SDK	Algorand JS SDK |
|**Wallet Integration** |	Pera Wallet |
|**Charting** |	Recharts (for donation stats) |
|**State Management**	| Redux Toolkit |

---

## ⚙️ Setup Instructions
### 1️⃣ Clone the Repository

git clone https://github.com/Reethika-22/dDonate.git
cd projects/ddonate-frontend

### 2️⃣ Install Dependencies

Make sure you have Node.js (v18+) installed.

npm install

### 3️⃣ Set Up Environment Variables

Create a .env file in the project root and add the following:

**Algorand network configuration (LocalNet / TestNet)**

VITE_ALGOD_SERVER=http://localhost
VITE_ALGOD_PORT=4001
VITE_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

**Smart contract App ID (from AlgoKit deploy)**

VITE_APP_ID=<YOUR_DEPLOYED_APP_ID>

**Network type (localnet / testnet / mainnet)**

VITE_NETWORK=localnet

💡 Replace <YOUR_DEPLOYED_APP_ID> with the App ID shown after running your deploy script from the smart contract (algocharity-contracts).

### 4️⃣ Run the Development Server

npm run dev


Your app will be available at
👉 http://localhost:5173

### 5️⃣ Build for Production

**To create an optimized build:**

npm run build


**To preview the build locally:**

npm run serve

---

## 💳 Pera Wallet Integration
### ✅ Connecting Pera Wallet

The frontend uses the Pera Wallet SDK to connect user wallets.

When a user clicks "Connect Wallet", the app:

Prompts Pera Wallet to connect

Stores the user’s wallet address in Redux state

Enables donation buttons and blockchain calls

### 🔗 Sending a Donation

Each donation triggers an Algorand transaction:

Connects to the user’s wallet (Pera)

Calls the donate() ABI method of the deployed smart contract

Transfers ALGO to the charity’s contract address

---

## 🧱 Project Structure

ddonate-frontend/

├── public/

│   └── logo.png

├── src/

│   ├── components/         # Reusable UI components

│   ├── pages/              # Main app pages (Home, Donate, About)

│   ├── hooks/              # Wallet & Algorand hooks

│   ├── context/            # Context for wallet and contract state

│   ├── redux/              # Redux slices for app state

│   ├── utils/              # Algorand and helper functions

│   ├── App.jsx

│   ├── main.jsx

│   └── index.css

├── tailwind.config.js

├── vite.config.js

├── package.json

└── README.md

---

## 🧠 How it Works

User connects Pera Wallet → Address stored in state

Contract initialized using VITE_APP_ID from .env

Donations are sent via the Algorand JS SDK

Charity balances and total donations fetched from the blockchain

Frontend UI updates live to reflect donation activity

---


## 🧪 Example Flow

1️⃣ Open app → http://localhost:5173

2️⃣ Click Connect Wallet → Pera Wallet popup appears

3️⃣ Select charity → enter donation amount

4️⃣ Confirm transaction in Pera Wallet

5️⃣ Transaction executes on Algorand blockchain

6️⃣ UI updates donation totals instantly

---

## 🖼️ UI Features

🎨 Responsive and modern Tailwind design

🔄 Animated transitions via Framer Motion

📊 Donation analytics with Recharts

💼 Wallet connection state displayed in navbar

⚙️ Smart contract interactions handled seamlessly

---

