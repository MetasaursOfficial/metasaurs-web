import axios from "axios";

export const getWalletProof = (address) => {
	const project = "0ab87ea0-41b9-4ce6-92e5-2eb74ca0f915";
	const url = `https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/proof/${address}`
	const config = {}

	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			resolve(res.data)
		}).catch(err => reject(err))
	})
}
