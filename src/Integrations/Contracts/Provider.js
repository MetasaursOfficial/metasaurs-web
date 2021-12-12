const environment = process.env.REACT_APP_ENVIRONMENT

let contractABIMetadataABI;
let contractAddress;

if (environment === "DEV") {
	contractABIMetadataABI = require("../../Contracts/IkoContract/IkoContract.json");
	const response = require('../../Contracts/IkoContract/Address')
	contractAddress = response.contractAddress;
} else {
	contractABIMetadataABI = require("../../Contracts/OKI/OkiContract.json");
	const response = require('../../Contracts/OKI/Address')
	contractAddress = response.contractAddress;
}

export const Provider = {
	contractABIMetadataABI,
	contractAddress
}
