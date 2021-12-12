import {getMultipleMetadata, getRandomMetadata} from "../Integrations/API";

export const getFirstStageMetadata = async (amount) => {
	return await getMultipleMetadata(amount)
}

export const getSecondStageMetadata = async () => {
	const response = await getRandomMetadata();
	const {id, status, url_ifps, url_metadata, url_sr} = response;
	return {id, status, url_ifps, url_metadata, url_sr}
}

export const getThirdStageMetadata = async () => {
	const response = await getRandomMetadata();
	const {id, status, url_ifps, url_metadata, url_sr} = response;
	return {id, status, url_ifps, url_metadata, url_sr}
}

export const getFourthStageMetadata = async () => {
	const response = await getRandomMetadata();
	const {id, status, url_ifps, url_metadata, url_sr} = response;
	return {id, status, url_ifps, url_metadata, url_sr}
}

export const getFifthStageMetadata = async () => {
	const response = await getRandomMetadata();
	const {id, status, url_ifps, url_metadata, url_sr} = response;
	return {id, status, url_ifps, url_metadata, url_sr}
}

