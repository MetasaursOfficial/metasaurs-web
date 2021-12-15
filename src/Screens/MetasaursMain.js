import React, {useRef, useState} from "react";
import logo from "../assets/Groupmeta.png";
import mint from "../assets/mintgroup.png";
import punkGreen from "../assets/punkgreen.png";
import punkRed from "../assets/punkred.png";
import coming from "../assets/coming.png";
import mobileRedPunk from '../assets/mobile-red-punk.png';
import mobileGreenPunk from '../assets/mobile-green-punk.png';

import {
  Typography,
  Grid,
  Container,
  TextField,
  MenuItem,
  Box, Select, FormControl, InputLabel,
} from "@material-ui/core";
import "./Styles.css";
import InstallBanner from "./Components/InstallBanner";
import WalletHeader from "./Components/WalletHeader";
import MintProgressHeader from "./Components/MintProgressHeader";
import {useNavigate} from "react-router-dom";
import {connectWallet} from "../Integrations/Wallet";
import {confirmEtherTransaction, mintFirst, mintPublic, mintWhitelist} from "../Integrations/Contracts/ContractManager";
import MintMain from "./Components/MintMain";
import {getWalletProof} from "../Integrations/API";
import ErrorModal from "./Modals/ErrorModal";

const preSale = "Pre-Sale Coming Soon";
const whitelist = "Whitelist Pre-Sale";
const day = "Thursday, Dec 16th @ 12:00AM EST";
const day1 = "(Until 2:00PmEST on Friday, December 17th)";
const publicSale = "Public Sale";
const publicTime = " Friday, December 17th @ 3:00PM EST";

const MetasaursMain = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [contractInfo, setContractInfo] = useState(null);
  const [loadingMintData, setLoadingMintData] = useState(false);
  const [showError, setShowError] = useState({show: false, message: ""});
  const [transaction, setTransaction] = useState({verifying: false, txHash: null});
  const [loadingWallet, setLoadingWallet] = useState(false)
  const [showGasFeeDialog, setShowGasFeeDialog] = useState(false);
  const [showVideo, setShowVideo] = useState({show: false, url: null});
  const timer = useRef(null);
  const refContainer = useRef(1);
  
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("")
          setStatus("NOT_CONNECTED")
        }
      })
      window.ethereum.on('chainChanged', (chainId) => {
        handleChainChanged(chainId)
      });
    } else {
      setStatus(
        "METAMASK_NOT_INSTALLED"
      )
    }
  }
  
  const handleChainChanged = (_chainId) => {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload(false);
  }
  
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet(window)
    if (walletResponse.error) {
      console.log("error", walletResponse.error)
      handleWalletError(walletResponse.error)
    }
    setStatus(walletResponse.status);
    setWallet(walletResponse.address)
    
    addWalletListener()
  }
  
  const handleWalletError = (error) => {
    const code = error.code;
    const message = error.message;
    
    if (message === "Already processing eth_requestAccounts. Please wait.") {
      const content = "Please confirm on your metamask extension"
      setShowError({show: true, message: content})
    } else {
      setShowError({show: true, message})
    }
  }
  
  const verifyTransaction = async (txHash) => {
    setTransaction({verifying: true, txHash: txHash})
    const response = await confirmEtherTransaction(txHash)
    setTransaction({verifying: false, txHash: txHash})
    if (response.error) {
      console.log("verifyTransaction error: ", response.error)
    } else {
      if (response.status) {
        handleSuccessfulMint(txHash)
      } else {
        displayErrorTransaction(txHash)
      }
      
    }
  }
  
  const handleSuccessfulMint = (txHash) => {
    console.log("handleSuccessfulMint")
    setShowError({show: true, message: "Metasaur Punk Successfully Minted"})
  }
  
  const getTransactionURL = (txHash) => {
    return 'https://etherscan.io/tx/' + txHash;
  }
  
  const displayErrorTransaction = (txHash) => {
    console.log("displayErrorTransaction: ", txHash)
  }
  
  const handleNoTokensFound = () => {
    const message = 'No Okis Available'
    setShowError({show: true, message})
  }
  
  const handleAmountNotAvailable = () => {
    const message = 'This amount of okis are not available'
    setShowError({show: true, message})
  }
  
  const handleTokensNotValid = () => {
    const message = 'Error generating okis, please try again'
    setShowError({show: true, message})
  }
  
  const handleUnknownError = (error) => {
    if (error.message) {
      setShowError({show: true, message: error.message})
    } else {
      setShowError({show: true, message: error.toString()})
    }
  }
  
  const handleError = (error) => {
    switch (error) {
      case 'no_tokens_found':
        handleNoTokensFound();
        break;
      case 'amount_no_available':
        handleAmountNotAvailable();
        break;
      case 'no_tokens_valid_found':
        handleTokensNotValid();
        break;
      default:
        handleUnknownError(error);
    }
  }
  
  const handleMintFist = async (_amount) => {
    setLoadingMintData(true);
    const response = await mintFirst(_amount);
    setLoadingMintData(false)
    
    if (response.error) {
      console.log("handleMintFist error: ", response.error)
      handleError(response.error)
    } else {
      verifyTransaction(response.transaction)
    }
  }
  
  const handleMintPublic = async (_amount) => {
    setLoadingMintData(true);
    const response = await mintPublic(_amount);
    setLoadingMintData(false)
    
    if (response.error) {
      console.log("mintPublic error: ", response.error)
      handleError(response.error)
    } else {
      verifyTransaction(response.transaction)
    }
  }
  
  return (
    <Container maxWidth={false} className="main-screen-container">
      <InstallBanner show={status === "METAMASK_NOT_INSTALLED"}/>
      <WalletHeader connectWalletPressed={connectWalletPressed} walletAddress={walletAddress} loading={loadingWallet}/>
      <MintProgressHeader show={transaction.verifying} link={getTransactionURL(transaction.txHash)}/>
      <img src={logo} className="image-margin" alt={"logo"}/>
      <Typography variant="h2" className="sale-coming">
        {preSale}
      </Typography>
      <img src={mint} className="image-margin" alt={"Steps"} />
      <Grid container spacing={3}>
        <Grid item lg={4} className="green-punk">
          <img src={punkGreen} width={"100%"} height={"500px"} alt="Punk Green" />
        </Grid>
        <Grid item lg={4}>
          <Typography variant="h4" className="presale-coming">
            {whitelist}
          </Typography>

          <Typography variant="h5" className="white-coming">
            {day}
          </Typography>
          <Typography variant="p" className="white-coming">
            {day1}
          </Typography>

          <Typography variant="h4" className="presale-coming">
            {publicSale}
          </Typography>
          <Typography variant="h5" className="white-coming">
            {publicTime}
          </Typography>
          <MintMain
            loading={loadingMintData}
            onPress={handleMintFist}
            paused={contractInfo?.pausedFirst}
            label="Mint Fist"
          />
          <MintMain
            loading={loadingMintData}
            onPress={handleMintPublic}
            paused={contractInfo?.pausedPublic}
            label="Mint Public"
          />
        </Grid>

        <Grid item lg={4} className="red-punk">
          <img src={punkRed} width={"100%"} height={"500px"} alt="punk red"/>
        </Grid>
      </Grid>
      <Box className="mobile-view">
        <img src={mobileGreenPunk} width={"50%"} alt="Green punk mobile"/>
        <img src={mobileRedPunk} width={"50%"} alt="Red punk mobile"/>
      </Box>
      <ErrorModal
        showModal={showError.show}
        message={showError.message}
        onClose={() => {
          setShowError({show: false, message: ""})
        }}
      />
    </Container>
  );
};

export default MetasaursMain;
