import React, {useEffect, useState} from 'react';
import './Admin.css'
import WalletHeader from "../Components/WalletHeader";
import {
	getAddressTokens,
	getContractData,
	getTokenURI,
	isContractOwner,
	mintNFT,
	mintWhitelist,
	reserveNFT,
	setNotRevealedURI,
	setPausedFirst,
	setPausedWhitelist, setRevealed,
	setTokenURI,
	withdrawContract,
} from "../../Integrations/Contracts/ContractManager";
import {connectWallet, getCurrentWalletConnected} from "../../Integrations/Wallet";
import {useNavigate} from "react-router-dom";
import RootForm from "./Components/RootForm";
import {getWalletSignature} from "../../Integrations/API";
import MintSection from "../Components/MintSection";
import MintToForm from "./Components/WhitelistForm";

const AdminScreen = () => {
	
	const navigate = useNavigate();
	
	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");
	const [contractInfo, setContractInfo] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [tokenUri, setTokenUri] = useState("")
	const [notRevealedValue, setNotRevealedValue] = useState("")
	const [loadingMintData, setLoadingMintData] = useState(true);
	const [addressTokens, setAddressTokens] = useState([]);
	
	
	useEffect(() => {
		async function fetchWalletData() {
			const {address, status} = await getCurrentWalletConnected(window);
			setWallet(address);
			setStatus(status);
		}
		
		fetchWalletData();
		
	}, [])
	
	useEffect(async () => {
		async function fetchContractValues() {
			const contractValues = await getContractData(walletAddress);
			setContractInfo(contractValues)
			setLoadingMintData(false)
			const response = await isContractOwner(walletAddress)
			console.log("isContractOwner: ", response)
			if (!response.error) {
				setIsOwner(response.owner)
			}
		}
		
		if (walletAddress && walletAddress.length > 5) {
			fetchContractValues()
		}
	}, [walletAddress])
	
	useEffect(() => {
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
	}, [contractInfo])
	
	useEffect(() => {
		async function fetchTokenURI(tokenId) {
			const response = await getTokenURI(tokenId)
			console.log("tokenURI response: ", response)
		}
		
		
		if (addressTokens.length > 0) {
			fetchTokenURI(addressTokens[0])
		}
	}, [addressTokens])
	
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
				console.log("chainChanged", chainId)
			});
		} else {
			setStatus(
				"METAMASK_NOT_INSTALLED"
			)
		}
	}
	
	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet(window)
		setStatus(walletResponse.status);
		setWallet(walletResponse.address)
		
		addWalletListener()
	}
	
	const handlePause = async () => {
		try {
			const response = await setPausedFirst(!contractInfo.pausedFirst, walletAddress)
			console.log("handlePause", response)
		} catch (e) {
			console.log("Error handlePause: ", e)
		}
	}
	
	const handlePauseWhitelist = async () => {
		try {
			const response = await setPausedWhitelist(!contractInfo.pausedWhitelist, walletAddress)
			console.log("handlePauseWhitelist", response)
		} catch (e) {
			console.log("Error handlePauseWhitelist: ", e)
		}
	}
	
	const onInputChange = (event) => {
		setTokenUri(event.target.value)
	}
	
	const onNotRevealedInputChange = (event) => {
		setNotRevealedValue(event.target.value)
	}
	
	const handleMint = async (_amount) => {
		setLoadingMintData(true);
		const response = await mintNFT(_amount);
		setLoadingMintData(false)
		
		if (response.error) {
			console.log("handleMint error: ", response.error)
			handleError(response.error)
		} else {
			verifyTransaction(response.transaction)
		}
	}
	
	const handleSetURIPressed = async () => {
		if (tokenUri.length > 3) {
			const response = await setTokenURI(tokenUri, walletAddress)
			console.log("handleSetURIPressed: ", response)
		}
	}
	
	const handleSetNotRevealedURIPressed = async () => {
		if (notRevealedValue.length > 3) {
			const response = await setNotRevealedURI(notRevealedValue, walletAddress)
			console.log("handleSetURIPressed: ", response)
		}
	}
	
	const handleWithdraw = async () => {
		try {
			const response = await withdrawContract(walletAddress);
			console.log("onWithdraw: ", response)
		} catch (e) {
			console.log("withdraw error: ", e)
		}
	}
	
	const handleReserveNFT = async (_amount) => {
		console.log("onReserve: ", _amount);
		try {
			const response = await reserveNFT(walletAddress, _amount);
			console.log("onWithdraw: ", response)
		} catch (e) {
			console.log("withdraw error: ", e)
		}
	}
	
	const handleError = (error) => {
		console.log("handleError: ", error)
		setStatus(error.toString())
	}
	
	const verifyTransaction = async (txHash) => {
	
	}
	
	const handleSubmitRoot = async (value) => {
	
	}
	
	const handlePauseFirst = async () => {
		try {
			const response = await setPausedFirst(!contractInfo.paused, walletAddress)
			console.log("handlePause", response)
		} catch (e) {
			console.log("Error handlePause: ", e)
		}
	}
	
	const handleSetRevealed = async () => {
		try {
			const response = await setRevealed(!contractInfo.revealed, walletAddress)
			console.log("handleSetRevealed", response)
		} catch (e) {
			console.log("Error setRevealed: ", e)
		}
	}
	
	const handleMintWhitelist = async (_amount) => {
		setLoadingMintData(true);
		try {
			const signatureResponse = await getWalletSignature(walletAddress);
			if (!signatureResponse.signature) {
				setLoadingMintData(false)
				handleError("Not in Whitelist");
			} else {
				const response = await mintWhitelist(_amount, signatureResponse.signature);
				setLoadingMintData(false)
				
				if (response.error) {
					console.log("mintWhitelist error: ", response.error)
					handleError(response.error)
				} else {
					verifyTransaction(response.transaction)
				}
			}
		} catch (e) {
			console.log("Error mint whitelist: ", e)
			setLoadingMintData(false)
		}
		
	}
	
	const onAddressSubmit = async (_addressArray, _amount) => {
		console.log("onAddressSubmit: ", _addressArray)
		
	}
	
	return (
		<div className="admin-screen">
			<WalletHeader
				connectWalletPressed={connectWalletPressed}
				walletAddress={walletAddress}
				navigate={navigate}/>
			<h1>Admin</h1>
			<div className="form-container">
				{
					!isOwner && (<div>Restricted view for contract owner</div>)
				}
				{
					isOwner && (
						<>
							<div className="admin-text">Function to make the Public mint</div>
							<button
								className="admin-button"
								onClick={handlePauseFirst}>
								{contractInfo?.paused ? "Resume Minting" : "Pause Minting"}
							</button>
							<div className="admin-text">Function to make the whitelist mint</div>
							<button
								className="admin-button"
								onClick={handlePauseWhitelist}>
								{contractInfo?.pausedWhitelist ? "Resume Whitelist" : "Pause Whitelist"}
							</button>
							<h1>Not Revealed URI</h1>
							<button
								className="admin-button"
								onClick={handleSetRevealed}>
								{contractInfo?.pausedWhitelist ? "Set Revealed" : "Set Not revealed"}
							</button>
							<input
								name="fname"
								className="input-container"
								type="text"
								value={notRevealedValue}
								onChange={onNotRevealedInputChange}
							/>
							
							<button
								className="admin-button"
								onClick={handleSetNotRevealedURIPressed}>Update Not revealed URI
							</button>
							<h1>Token URI</h1>
							<input
								name="fname"
								className="input-container"
								type="text"
								value={tokenUri}
								onChange={onInputChange}
							/>
							
							<button
								className="admin-button"
								onClick={handleSetURIPressed}>Update Token URI
							</button>
							{/*<MintToForm onSubmit={onAddressSubmit}/>*/}
							<MintSection
								show={contractInfo}
								loading={loadingMintData}
								onPress={handleMint}
								paused={contractInfo?.paused}
								label="Mint"
								limit={10}
							/>
							<MintSection
								show={contractInfo}
								loading={loadingMintData}
								onPress={handleMintWhitelist}
								paused={contractInfo?.pausedWhitelist}
								label="Mint Whitelist"
								limit={10}
							/>
							<MintSection
								show={contractInfo}
								loading={loadingMintData}
								onPress={handleReserveNFT}
								paused={false}
								label="Reserve"
								limit={100}
								title="Contract Owner Claim NFT only paying gas fees"
							/>
							<h4>Sent the eth on the contract to the owners wallet</h4>
							<div className="admin-text">No transaction record is created on the ower's wallet</div>
							<button
								className="admin-button"
								onClick={() => handleWithdraw()}>Withdraw
							</button>
						</>
					)
					
				}
			
			</div>
		
		
		</div>
	)
}

export default AdminScreen
