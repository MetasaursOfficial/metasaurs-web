import React, { useEffect, useState } from 'react';
import {
  connectWallet,
  getCurrentWalletConnected,
} from '../Integrations/Wallet';
import WalletHeader from './Components/WalletHeader';
import {
  getAddressTokens,
  getContractData,
} from '../Integrations/Contracts/ContractManager';
import OkiResume from './Sections/MainMyWallet/components/OkiResume/OkiResume';
import '../App.css';
import './Styles.css'
import MainFooter from './Footers/MainFooter';
import { useNavigate } from 'react-router-dom';

const MyOkisScreen = () => {
  const navigate = useNavigate();

  const [walletAddress, setWallet] = useState('');
  const [status, setStatus] = useState('');
  const [addressTokens, setAddressTokens] = useState([]);

  useEffect(() => {
    async function fetchWalletData() {
      const { address, status } = await getCurrentWalletConnected(window);
      setWallet(address);
      setStatus(status);
    }

    fetchWalletData();
  }, []);

  useEffect(async () => {
    async function fetchAddressTokens() {
      const response = await getAddressTokens(walletAddress);
      if (!response) {
        return setAddressTokens([]);
      }
      if (response.error) {
        console.log('Address token error: ', response.error);
        setAddressTokens([]);
      } else {
        setAddressTokens(response.tokens);
      }
    }

    if (walletAddress && walletAddress.length > 5) {
      fetchAddressTokens();
    }
  }, [walletAddress]);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet('');
          setStatus('NOT_CONNECTED');
        }
      });
      window.ethereum.on('chainChanged', (chainId) => {
        console.log('chainChanged', chainId);
      });
    } else {
      setStatus('METAMASK_NOT_INSTALLED');
    }
  };

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet(window);
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

    addWalletListener();
  };

  return (
    <div className="My-Okis">
      <WalletHeader
        connectWalletPressed={connectWalletPressed}
        walletAddress={walletAddress}
        navigate={navigate}
      />
        <h1 className="my-okis-title">My Okis</h1>
        {addressTokens.map((token) => (
          <OkiResume tokenId={token} />
        ))}
      <MainFooter />
    </div>
  );
};

export default MyOkisScreen;
