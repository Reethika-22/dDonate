import React from "react";
import { useWallet } from "../context/WalletContext";

const ConnectWalletButton = () => {
  const { wallet, connectWallet, disconnectWallet, connectedAddress } = useWallet();

  return (
    <div className="flex items-center justify-center mt-6">
      {wallet ? (
        <div className="flex flex-col items-center">
          <p className="text-green-600 font-semibold mb-2">
            Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
          </p>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Connect Pera Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
