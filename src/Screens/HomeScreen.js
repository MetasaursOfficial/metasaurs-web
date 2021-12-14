import React, {useEffect, useRef, useState} from "react";
import './Styles.css';

import {
	confirmEtherTransaction,
	getContractData, mintFirst,
	mintFirstStage,
	mintWhitelist,
} from "../Integrations/Contracts/ContractManager";
import {connectWallet, getCurrentWalletConnected} from "../Integrations/Wallet";
import WalletHeader from "./Components/WalletHeader";
import MintSection from "./Components/MintSection";
import ErrorModal from "./Modals/ErrorModal";
import MainFooter from "./Footers/MainFooter";
import '../App.css'
import {useNavigate} from "react-router-dom";
import MintProgressHeader from "./Components/MintProgressHeader";
import InstallBanner from "./Components/InstallBanner";
import GasFeeModal from "./Modals/GasFeeModal";
import VideoModal from "./Modals/VideoModal";
import MetasaursMain from "./MetasaursMain";

const delay = 5;

const HomeScreen = () => {
	
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
	
	useEffect(() => {
		async function fetchWalletData() {
			setLoadingWallet(true)
			const {address, status, error} = await getCurrentWalletConnected(window);
			if (error) {
				setShowError({show: true, message: error.toString()})
			}
			setLoadingWallet(false);
			setWallet(address);
			setStatus(status);
		}
		
		fetchWalletData();
		
	}, [])
	
	useEffect(async () => {
		async function fetchContractValues() {
			const contractValues = await getContractData(walletAddress);
			setContractInfo(contractValues)
		}
		
		if (walletAddress && walletAddress.length > 5) {
			fetchContractValues()
		}
	}, [walletAddress])
	
	useEffect(() => {
		timer.current = setInterval(() => {
			if (loadingWallet) {
				const message = "Having issues connecting your wallet? Try refreshing the browser"
				setShowError({show: true, message})
			}
		}, delay * 1000);
		
		// clear on component unmount
		return () => {
			clearInterval(timer.current);
		};
		
	}, [loadingWallet])
	
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
		navigate(`/transaction/${txHash}`)
	}
	
	const getTransactionURL = (txHash) => {
		return 'https://etherscan.io/tx/' + txHash;
	}
	
	const displayErrorTransaction = (txHash) => {
		console.log("displayErrorTransaction: ", txHash)
	}
	
	const onMintFirstStagePressed = async (amount) => {
		setLoadingMintData(true);
		setShowGasFeeDialog(true);
		const response = await mintFirst(amount);
		setLoadingMintData(false)
		setShowGasFeeDialog(false)
		
		if (response.error) {
			console.log("onMintFirstStagePressed error: ", response.error)
			handleError(response.error)
		} else {
			verifyTransaction(response.transaction)
		}
	}
	
	const onMintWhiteListPressed = async (_amount) => {
		setLoadingMintData(true);
		const response = await mintWhitelist(_amount);
		setLoadingMintData(false)
		
		if (response.error) {
			console.log("onMintWhiteListPressed error: ", response.error)
			handleError(response.error)
		} else {
			verifyTransaction(response.transaction)
		}
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
	
	const isWalletAddress = (_walletAddress) => {
		return _walletAddress !== "";
		
	}
	
	const handlePlayVideoURL = (url) => {
		console.log("handlePlayVideoURL: ", url)
		setShowVideo({show: true, url: url});
	}
	
	return (
		<div className="container-home">
			<InstallBanner show={status === "METAMASK_NOT_INSTALLED"}/>
			<WalletHeader connectWalletPressed={connectWalletPressed} walletAddress={walletAddress} loading={loadingWallet}/>
			<MintProgressHeader show={transaction.verifying} link={getTransactionURL(transaction.txHash)}/>
			<MintSection
				show={contractInfo}
				contractInfo={contractInfo}
				loading={loadingMintData}
				onPress={onMintFirstStagePressed}
				onMintWhiteListPressed={onMintWhiteListPressed}
				label="Mint Now"
				isWalletAddress={isWalletAddress(walletAddress)}
				connectWalletPressed={connectWalletPressed}
			/>
			<MetasaursMain/>
			<MainFooter/>
			<GasFeeModal showModal={showGasFeeDialog} onClose={() => setShowGasFeeDialog(false)}/>
			<ErrorModal
				showModal={showError.show}
				message={showError.message}
				onClose={() => {
					setShowError({show: false, message: ""})
				}}
			/>
			<VideoModal
				show={showVideo.show}
				url={showVideo.url}
				onClose={() => setShowVideo({show: false, url: null})}/>
		</div>
	)
	
}

export default HomeScreen;
