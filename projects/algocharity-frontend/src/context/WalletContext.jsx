import React, { createContext, useContext, useState, useEffect } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [peraWallet, setPeraWallet] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const pera = new PeraWalletConnect();
    setPeraWallet(pera);

    // Reconnect session automatically if the wallet is already connected
    pera.reconnectSession().then((accounts) => {
      if (accounts.length) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    });

    // Handle disconnects
    pera.connector?.on("disconnect", () => {
      setAccount(null);
      setIsConnected(false);
    });
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const disconnectWallet = () => {
    peraWallet.disconnect();
    setAccount(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
        isConnected,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
