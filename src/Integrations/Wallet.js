export const getCurrentWalletConnected = async (_window) => {
	if (_window.ethereum) {
		try {
			
			const addressArray = await _window.ethereum.request({
				method: "eth_accounts"
			})
			
			if (addressArray.length > 0) {
				return {
					address: addressArray[0],
					status: ""
				}
			} else {
				return {address: "", status: "NOT_CONNECTED",};
			}
			
		} catch (error) {
			return {
				address: "",
				status: "",
				error
			}
		}
	} else {
		return {
			address: "",
			status: "METAMASK_NOT_INSTALLED"
		}
	}
}

/**
 *
 * @param _window
 * @return {Promise<{address: string, status: string}|{address: string, status}|{address, status: string}>}
 */
export const connectWallet = async (_window) => {
	if (_window.ethereum) {
		try {
			
			const addressArray = await _window.ethereum.request({
				method: "eth_requestAccounts"
			})
			
			const obj = {
				status: STATUS.CONNECTED,
				address: addressArray[0]
			}
			
			return obj;
			
		} catch (error) {
			return {
				address: "",
				status: "",
				error: error
			}
		}
	} else {
		return {
			
			address: "",
			status: STATUS.NOT_INSTALLED
		}
	}
}

const STATUS = {
	NOT_INSTALLED: "METAMASK_NOT_INSTALLED",
	CONNECTED: "CONNECTED",
}

