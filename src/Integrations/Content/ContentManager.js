import {addressHasTokens} from "../Contracts/ContractManager";

export const getMusicContent = async (_address) => {
	let response = {access: false, content: null}
	const hasTokens = await addressHasTokens(_address)
	if (hasTokens) {
	
	} else {
		response.access = false
	}
	
	return response;
}
