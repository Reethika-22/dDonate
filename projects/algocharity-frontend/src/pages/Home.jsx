import React from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to dDonate 💖
      </h1>

      <p className="text-gray-600 mb-8">
        A transparent blockchain-based donation platform built on Algorand.
      </p>

      {/* 🪙 Connect Wallet Button */}
      <ConnectWalletButton />

      <p className="mt-6 text-sm text-gray-500">
        Connect your Pera Wallet to start donating securely.
      </p>
    </div>
  );
};

export default Home;
