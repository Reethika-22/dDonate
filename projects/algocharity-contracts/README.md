## 💠 AlgoCharity Smart Contracts

This project contains the smart contracts powering the dDonate decentralized donation platform, built on the Algorand blockchain using AlgoKit and Algopy.

AlgoCharity enables transparent, secure, and verifiable charitable donations directly on-chain — without intermediaries.

---

## 🚀 Overview
## 🌍 Purpose

The AlgoCharity contract handles:

Registration of verified charities

Acceptance of donations from users

Tracking of total funds donated

Withdrawal of donations by charities

This backend connects to the dDonate frontend (React + Tailwind) through smart contract interactions using the Pera Wallet.

---

## 🧩 Features

✅ Register verified charities

💰 Accept ALGO donations directly

📜 Maintain transparent donation records

🏦 Enable charities to withdraw funds securely

📊 Provide total and per-charity donation stats

---

## ⚙️ Setup

This project has been generated using AlgoKit. Follow the steps below to set up and deploy it locally.

---

## 📋 Pre-requisites

Python 3.12+

Docker
 (required for LocalNet)

AlgoKit CLI
 (v2.0.0 or later)

(Recommended) VS Code
 with Python extension

## 💡 Tip: 

For an interactive code walkthrough, install the VS Code extension
vsls-contrib.codetour

and open the file .codetour.json.

---

## 🧱 Initial Setup

---

## 1️⃣ Clone the Repository

git clone https://github.com/Reethika-22/dDonate.git
cd projects/algocharity-contracts

---

# 2️⃣ Install Dependencies

Install Poetry

Poetry is used to manage dependencies.

pip install poetry
poetry -V  # should show version 1.2+

Install Project Dependencies

Run:

algokit project bootstrap all


This sets up a .venv environment and installs required Python packages.

Optional (Manual setup if needed)

If the above fails, create a virtual environment manually:

python -m venv venv
venv\Scripts\activate
pip install algopy algokit-utils

---

## 3️⃣ Configure Environment

Create an environment file for your local network:

algokit generate env-file -a target_network localnet


This generates .env.localnet with AlgoKit defaults.

---

## 4️⃣ Start LocalNet

algokit localnet start


✅ You should see:

docker: Container algokit_sandbox_algod Healthy
docker: Container algokit_sandbox_indexer Healthy
Started; execute `algokit explore` to explore LocalNet in a web user interface.


⚠️ If you see “Aborted”, ensure Docker Desktop is running before executing the command.
