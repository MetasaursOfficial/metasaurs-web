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
 * @return {Promise<{pausedPublic: boolean, pausedFirst: boolean, baseUri: *, revealed: boolean, pausedWhitelist: boolean, merkleRoot: *, PRICE_FIRST: number, PRICE_PUBLIC: number}|null>}
 */
export const getContractData = async (_address) => {
	
	if (!_address || _address.length === 0) {
		return null
	}
	try {
		window.contract = await new web3.eth.Contract(contractABI, contractAddress);
		
		let PRICE_FIRST;
		let PRICE_PUBLIC;
		let merkleRoot;
		let pausedFirst = false;
		let pausedPublic = false;
		let pausedWhitelist = false;
		let revealed = false;
		let baseUri;
		
		try {
			merkleRoot = await window.contract.methods.merkleRoot().call();
			PRICE_FIRST = await window.contract.methods.PRICE_FIRST().call();
			PRICE_PUBLIC = await window.contract.methods.PRICE_PUBLIC().call();
		} catch (e) {
			console.log("Error getting getContractData : ", e);
		}
		
		try {
			pausedFirst = await window.contract.methods.pausedFirst().call();
			pausedPublic = await window.contract.methods.pausedPublic().call();
			pausedWhitelist = await window.contract.methods.pausedWhitelist().call();
			revealed = await window.contract.methods.revealed().call();
			baseUri = await window.contract.methods.baseUri().call();
		} catch (e) {
			console.log("Error getting getContractData: ", e);
		}
		
		let hasTokens = false;
		
		try{
			const response = await addressHasTokens(_address)
			hasTokens = response.hasTokens
		} catch (e) {
		
		}
		
		return {
			PRICE_FIRST,
			PRICE_PUBLIC,
			merkleRoot,
			pausedFirst,
			pausedPublic,
			pausedWhitelist, revealed, baseUri, hasTokens
		}
	} catch (e) {
		console.log('getContractData error: ', e)
	}
	
}

export const setPausedFirst = (_value, _address) => {
	return new Promise(async resolve => {
		try {
			window.contract = await new web3.eth.Contract(contractABI, contractAddress);
			
			window.contract.methods.setPausedFirst(_value).send({from: _address}, (err, res) => {
				if (err) {
					resolve({error: err})
				}
				
				resolve({data: res})
			})
			
		} catch (e) {
			console.log("setPausedFist error: ", e)
			resolve({error: e})
		}
	})
}

export const setPausedPublic = (_value, _address) => {
	return new Promise(async resolve => {
		try {
			window.contract = await new web3.eth.Contract(contractABI, contractAddress);
			
			window.contract.methods.setPausedPublic(_value).send({from: _address}, (err, res) => {
				if (err) {
					resolve({error: err})
				}
				
				resolve({data: res})
			})
			
		} catch (e) {
			console.log("setPausedFist error: ", e)
			resolve({error: e})
		}
	})
}

export const setPausedWhitelist = (_value, _address) => {
	return new Promise(async resolve => {
		try {
			window.contract = await new web3.eth.Contract(contractABI, contractAddress);
			
			window.contract.methods.setPausedWhitelist(_value).send({from: _address}, (err, res) => {
				if (err) {
					resolve({error: err})
				}
				
				resolve({data: res})
			})
			
		} catch (e) {
			console.log("setPausedFist error: ", e)
			resolve({error: e})
		}
	})
}

export const setNotRevealedURI = (_value, _address) => {
	return new Promise(async resolve => {
		try {
			window.contract = await new web3.eth.Contract(contractABI, contractAddress);
			
			window.contract.methods.setNotRevealedURI(_value).send({from: _address}, (err, res) => {
				if (err) {
					resolve({error: err})
				}
				
				resolve({data: res})
			})
			
		} catch (e) {
			console.log("setPausedFist error: ", e)
			resolve({error: e})
		}
	})
}


export const setMerkleRoot = (_value, _address) => {
	return new Promise(async resolve => {
		try {
			window.contract = await new web3.eth.Contract(contractABI, contractAddress);
			
			window.contract.methods.setMerkleRoot(_value).send({from: _address}, (err, res) => {
				if (err) {
					resolve({error: err})
				}
				
				resolve({data: res})
			})
			
		} catch (e) {
			console.log("setPausedFist error: ", e)
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
		return response
		
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

export const mintWhitelist = async (_amount, proof) => {
	console.log("mintWhitelist : ", _amount, proof)
	const proofArray = JSON.parse(proof)
	
	window.contract = await new web3.eth.Contract(contractABI, contractAddress);
	
	const nftValue = await window.contract.methods.PRICE_PUBLIC().call(); // Contract price in wei
	
	const valueHex = getPriceForMultiple(Number(_amount), Number(nftValue))
	
	const transactionParameters = {
		to: contractAddress,
		from: window.ethereum.selectedAddress,
		value: valueHex,
		data: window.contract.methods.whitelistMint(proofArray, _amount).encodeABI(),
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

export const getPriceForMultiple = (_amount, value) => {
	const multiplier = (_amount - 1);
	const baseMultiple = 60000000000000000;
	const partial = multiplier * baseMultiple;
	const totalValue = value +  partial;
	
	return  Number((totalValue)).toString(16)
}

export const mintFirst = async (_amount = 1) => {
	
	console.log(_amount)
	
	window.contract = await new web3.eth.Contract(contractABI, contractAddress);
	
	const nftValue = await window.contract.methods.PRICE_FIRST().call(); // Contract price in wei
	console.log("nftValue: " + nftValue)
	const valueHex = getPriceForMultiple(Number(_amount), Number(nftValue))
	
	
	const suggestedGas = 154372 * _amount
	const gasHex = await Number((suggestedGas)).toString(16)
	
	const transactionParameters = {
		to: contractAddress,
		from: window.ethereum.selectedAddress,
		value: valueHex,
		gas: gasHex,
		data: window.contract.methods.mintFirst(_amount).encodeABI(),
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

export const mintPublic = async (_amount = 1) => {
	
	window.contract = await new web3.eth.Contract(contractABI, contractAddress);
	
	const nftValue = await window.contract.methods.PRICE_PUBLIC().call(); // Contract price in wei
	
	const valueHex = getPriceForMultiple(Number(_amount), Number(nftValue))
	
	const suggestedGas = 154372 * _amount
	const gasHex = await Number((suggestedGas)).toString(16)
	
	const transactionParameters = {
		to: contractAddress,
		from: window.ethereum.selectedAddress,
		value: valueHex,
		gas: gasHex,
		data: window.contract.methods.mintPublic(_amount).encodeABI(),
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
				transaction: `https://rinkeby.etherscan.io/tx/${txHash}`
			})
			
		} catch (error) {
			resolve({error})
		}
		
	})
	
}

