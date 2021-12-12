import React, {useEffect, useState} from 'react';
import './Admin.css'
import WalletHeader from "../Components/WalletHeader";
import {
	getContractData,
	isContractOwner,
	reserveNFT,
	setPauseSales,
	setPauseWhitelist,
	setTokenURI,
	setWhitelistedAddress,
	withdrawContract
} from "../../Integrations/Contracts/ContractManager";
import {connectWallet, getCurrentWalletConnected} from "../../Integrations/Wallet";
import {useNavigate} from "react-router-dom";
import WhitelistForm from "./Components/WhitelistForm";
import ReserveForm from "./Components/ReserveForm";
import MintOwner from "./Components/MintOwner";

const AdminScreen = () => {
	
	const navigate = useNavigate();
	
	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");
	const [contractInfo, setContractInfo] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [tokenUri, setTokenUri] = useState("")
	
	
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
			const response = await setPauseSales(!contractInfo.paused, walletAddress)
			console.log("handlePause", response)
		} catch (e) {
			console.log("Error handlePause: ", e)
		}
	}
	
	const handlePauseWhitelist = async () => {
		try {
			const response = await setPauseWhitelist(!contractInfo.onlyWhitelist, walletAddress)
			console.log("handlePauseWhitelist", response)
		} catch (e) {
			console.log("Error handlePauseWhitelist: ", e)
		}
	}
	
	const onInputChange = (event) => {
		setTokenUri(event.target.value)
	}
	
	const handleSetURIPressed = async () => {
		if (tokenUri.length > 3) {
			const response = await setTokenURI(tokenUri, walletAddress)
			console.log("handleSetURIPressed: ", response)
		}
	}
	
	const onAddressSubmit = async (_addressArray, _amount) => {
		if (_addressArray && _amount && _addressArray.length > 0) {
			const response = await setWhitelistedAddress(_addressArray, _amount, walletAddress)
			console.log("setWhitelistedAddress: ", response)
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
	
	return (
		<div className="admin-screen">
			<WalletHeader
				connectWalletPressed={connectWalletPressed}
				walletAddress={walletAddress}
				navigate={navigate}/>
			<h1>Admin</h1>
			<div className="form-container">
				{
					isOwner && (
						<>
							<MintOwner onPress={handleReserveNFT} loading={false}/>
							<button
								onClick={handlePause}>{contractInfo.paused ? "Resume Contract" : "Pause Contract"}</button>
							<button
								onClick={handlePauseWhitelist}>{contractInfo.onlyWhitelist ? "Pause Whitelist" : "Resume Whitelist"}</button>
							<h1>Token URI</h1>
							<input
								name="fname"
								className="input-container"
								type="text"
								value={tokenUri}
								onChange={onInputChange}
							/>
							<button onClick={handleSetURIPressed}>Update Token URI</button>
							<h3>Amount</h3>
							<WhitelistForm onSubmit={onAddressSubmit}/>
							<button onClick={() => handleWithdraw()}>Withdraw</button>
						</>
					)
					
				}
			
			</div>
		
		
		</div>
	)
}

export default AdminScreen
