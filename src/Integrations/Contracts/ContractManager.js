import {Provider} from "./Provider";

const contractABIMetadataABI = Provider.contractABIMetadataABI
const contractABI = contractABIMetadataABI.abi
const contractAddress = Provider.contractAddress

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

/**
 *
 * @param _address
 * @return {Promise<null|{paused: boolean, addressTokens: *[], price: number, totalSupply: number, maxSupply: number, onlyWhitelist: boolean}>}
 */
export const getContractData = async (_address) => {
	
	if (!_address || _address.length === 0) {
		return null
	}
	try {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		
		let maxSupply = 0;
		let price = 0.08;
		
		try {
			maxSupply = await window.contract.methods.MAX_SUPPLY().call();
		} catch (e) {
			console.log("Error getting tokensLimits: ", e);
		}
		
		let addressTokens = []
		try {
			const response = await getAddressTokens(_address)
			addressTokens = response.tokens
		} catch (e) {
			console.log("Error getting addressTokens: ", e)
		}
		let totalSupply = 0
		try {
			totalSupply = await window.contract.methods.totalSupply().call()
			console.log("Total: ", totalSupply)
			
		} catch (e) {
			console.log("Error getting first stage tokens: ", e)
		}
		
		let paused = true;
		let onlyWhitelist = false;
		try {
			paused = await window.contract.methods.mintPaused().call();
			onlyWhitelist = await window.contract.methods.onlyWhitelist().call();
		} catch (e) {
			console.log("Error getting paused: ", e)
		}
		
		return {
			price,
			addressTokens,
			paused,
			totalSupply,
			maxSupply,
			onlyWhitelist
		}
	} catch (e) {
		console.log('getContractData error: ', e)
	}
	
}

export const setPauseSales = (_value, _address) => {
	return new Promise(async resolve => {
		try {
			window.contract = await new web3.eth.Contract(contractABI, contractAddress);
			
			window.contract.methods.setPaused(_value).send({from: _address}, (err, res) => {
				if (err) {
					resolve({error: err})
				}
				
				resolve({data: res})
			})
			
		} catch (e) {
			console.log("setPauseFirst error: ", e)
			resolve({error: e})
		}
	})
}

export const setPauseWhitelist = (_value, _address) => {
	return new Promise(async resolve => {
		try {
			window.contract = await new web3.eth.Contract(contractABI, contractAddress);
			
			window.contract.methods.setOnlyWhitelist(_value).send({from: _address}, (err, res) => {
				if (err) {
					resolve({error: err})
				}
				
				resolve({data: res})
			})
			
		} catch (e) {
			console.log("setPauseFirst error: ", e)
			resolve({error: e})
		}
	})
}

/**
 *
 * @param _address
 * @return {Promise<null|{error}|{tokens: *, error: null}>}
 */
export const getAddressTokens = async (_address) => {
	if (!_address || _address.length === 0) {
		return null
	}
	try {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		let addressTokens = []
		try {
			const tokenCount = await window.contract.methods.balanceOf(_address).call();
			console.log("tokenCount: ", tokenCount);
			if (tokenCount > 0) {
				for (let i = 0; i < tokenCount; i++) {
					const tokenId = await window.contract.methods.tokenOfOwnerByIndex(_address, i).call();
					addressTokens.push(tokenId)
				}
			}
			return {
				error: null,
				tokens: addressTokens,
			}
		} catch (e) {
			console.log("Error getting addressTokens: ", e)
			return {error: e}
		}
		
	} catch (e) {
		console.log('getContractData error: ', e)
		return {error: e}
	}
}

/**
 *
 * @param _address
 * @return {Promise<{hasTokens: boolean, error: null}>}
 */
export const addressHasTokens = async (_address) => {
	let response = {hasTokens: false, error: null}
	try {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		const tokenCount = await window.contract.methods.balanceOf(_address).call();
		response.hasTokens = tokenCount > 0;
		return  response
		
	} catch (e) {
		console.log("addressHasTokens error: ", e)
		response.error = e
		return response
	}
}

/**
 *
 * @param _tokenId
 * @return {Promise<{tokenURI: *, error: null}|{error}>}
 */
export const getTokenURI = async (_tokenId) => {
	console.log("calling getTokenURI: ", _tokenId)
	try {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		let tokenURI;
		try {
			tokenURI = await window.contract.methods.tokenURI(_tokenId).call();
			console.log("tokenURI", tokenURI)
			return {
				error: null,
				tokenURI: tokenURI,
			}
		} catch (e) {
			console.log("Error getTokenURI : ", e)
			return {error: e}
		}
		
	} catch (e) {
		console.log('getTokenURI error: ', e)
		return {error: e}
	}
}

export const mintWhitelist = async (_amount) => {
	
	window.contract = await new web3.eth.Contract(contractABI, contractAddress);
	
	const nftValue = await window.contract.methods.PRICE().call(); // Contract price in wei
	
	const valueHex = await Number((nftValue * _amount)).toString(16)
	
	
	const transactionParameters = {
		to: contractAddress,
		from: window.ethereum.selectedAddress,
		value: valueHex,
		data: window.contract.methods.mintWhitelist(_amount).encodeABI(),
	}
	
	// Sign the transaction via Metamask
	try {
		const txHash = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [transactionParameters]
		})
		
		return {
			transaction: txHash
		}
		
	} catch (error) {
		console.log('Error minting transaction: ', error)
		return {error}
	}
}

export const mintFirstStage = async (_amount = 1) => {
	
	window.contract = await new web3.eth.Contract(contractABI, contractAddress);
	
	const nftValue = await window.contract.methods.PRICE().call(); // Contract price in wei
	
	const valueHex = await Number((nftValue * _amount)).toString(16)
	
	const suggestedGas = 154372 * _amount
	const gasHex = await Number((suggestedGas)).toString(16)
	
	const transactionParameters = {
		to: contractAddress,
		from: window.ethereum.selectedAddress,
		value: valueHex,
		gas: gasHex,
		data: window.contract.methods.mintOki(_amount).encodeABI(),
	}
	
	// Sign the transaction via Metamask
	try {
		const txHash = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [transactionParameters]
		})
		
		return {
			transaction: txHash
		}
		
	} catch (error) {
		console.log('Error minting transaction: ', error)
		return {error}
	}
}

export const reserveNFT = async (walletAddress, _amount = 1) => {
	window.contract = await new web3.eth.Contract(contractABI, contractAddress);
	
	const suggestedGas = 150000 * _amount
	const gasHex = await Number((suggestedGas)).toString(16)
	
	const transactionParameters = {
		to: contractAddress,
		from: window.ethereum.selectedAddress,
		gas: gasHex,
		data: window.contract.methods.reserve(_amount).encodeABI(),
	}
	
	// Sign the transaction via Metamask
	try {
		const txHash = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [transactionParameters]
		})
		
		return {
			transaction: txHash
		}
		
	} catch (error) {
		console.log('Error minting transaction: ', error)
		return {error}
	}
}

export const setWhitelistedAddress = async (addressArray, _amount, _walletAddress) => {
	return new Promise(async resolve => {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		
		window.contract.methods.setWhitelist(addressArray, _amount).send({from: _walletAddress}, (err, res) => {
			if (err) {
				resolve({error: err})
			}
			
			resolve({data: res})
		})
	})
}


/**
 *
 * @param tokenId
 * @return {{standard: string, address: string, blockchain: string}}
 */
export const getTokenInformation = (tokenId) => {
	try {
		const address = contractAddress
		const standard = "ERC-721"
		const blockchain = "Ethereum"
		return {address, standard, blockchain}
	} catch (e) {
		console.log("getTokenInformation: ", e)
	}
}

const getConfirmations = async (txHash) => {
	try {
		// Get transaction details
		const trx = await web3.eth.getTransaction(txHash)
		
		// Get current block number
		const currentBlock = await web3.eth.getBlockNumber()
		
		// When transaction is unconfirmed, its block number is null.
		// In this case we return 0 as number of confirmations
		return trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber
	} catch (error) {
		console.log(error)
	}
}

const getTransactionReceipt = (txHash) => {
	return new Promise((resolve, reject) => {
		web3.eth.getTransactionReceipt(txHash, (error, transactionReceipt) => {
			if (error) {
				reject(error)
			} else {
				resolve(transactionReceipt)
			}
		})
	})
}

export const confirmEtherTransaction = (txHash, confirmations = 10) => {
	
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			
			// Get current number of confirmations and compare it with sought-for value
			const trxConfirmations = await getConfirmations(txHash)
			
			try {
				const receipt = await getTransactionReceipt(txHash)
				const logs = receipt.logs
				let tokens = []
				
				logs.forEach(log => {
					const tokenHex = log.topics[3]
					const tokenNumeric = web3.utils.hexToNumber(tokenHex)
					tokens.push(tokenNumeric)
				})
				
				if (receipt.status === true) {
					// The transaction has been successful
					return resolve({error: null, status: receipt.status, tokens})
				}
				if (trxConfirmations >= confirmations) {
					// Handle confirmation event according to your business logic
					
					return resolve({error: null, status: receipt.status, tokens: []})
				}
			} catch (e) {
				console.log("receipt error: ", e)
				return reject({error: e, status: null, tokens: null})
			}
			// Recursive call
			return confirmEtherTransaction(txHash, confirmations)
		}, 15 * 1000)
	})
	
}

/**
 *
 * @param txHash
 * @return {Promise<unknown>}
 */
export const getTransactionData = async (txHash) => {
	return new Promise(async (resolve, reject) => {
		try {
			const receipt = await getTransactionReceipt(txHash)
			const logs = receipt.logs
			let tokens = []
			
			logs.forEach(log => {
				const tokenHex = log.topics[3]
				const tokenNumeric = web3.utils.hexToNumber(tokenHex)
				tokens.push(tokenNumeric)
			})
			if (receipt.status) {
				resolve({error: null, status: receipt.status, tokens})
			} else {
				reject({message: 'Transaction failed'})
			}
		} catch (e) {
			reject({error: e})
		}
		
	})
}

export const isContractOwner = async (_address) => {
	try {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		try {
			const owner = await window.contract.methods.owner().call();
			const isContractOwner = owner.toUpperCase() === _address.toUpperCase()
			return {
				error: null,
				owner: isContractOwner,
			}
		} catch (e) {
			console.log("Error isContractOwner : ", e)
			return {error: e}
		}
		
	} catch (e) {
		console.log('isContractOwner error: ', e)
		return {error: e}
	}
}

export const setTokenURI = async (newTokenURI, _address) => {
	try {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		try {
			window.contract.methods.setBaseURI(newTokenURI).send({from: _address}, (err, res) => {
				if (err) {
					return ({error: err})
				}
				
				return ({data: res})
			})
		} catch (e) {
			console.log("Error isContractOwner : ", e)
			return {error: e}
		}
		
	} catch (e) {
		console.log('isContractOwner error: ', e)
		return {error: e}
	}
}

export const withdrawContract = (_address) => {
	
	return new Promise(async resolve => {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		
		// Set up the ethereum transaction
		const transactionParameters = {
			to: contractAddress,
			from: _address,
			data: window.contract.methods.withdraw().encodeABI(),
		}
		
		// Sign the transaction via Metamask
		try {
			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters]
			})
			
			resolve({
				transaction: `https://ropsten.etherscan.io/tx/${txHash}`
			})
			
		} catch (error) {
			resolve({error})
		}
		
	})
	
	
}

