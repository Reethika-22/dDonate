// src/components/ConnectWalletButton.jsx
import React from "react";
import { useWallet } from "../context/WalletContext";

const ConnectWalletButton = () => {
  const { account, connectWallet, disconnectWallet, isConnected } = useWallet();

  return (
    <div className="flex flex-col items-center mt-4">
      {isConnected ? (
        <>
          <p className="mb-2 text-green-600 font-semibold">
            Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
          </p>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Connect Pera Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
