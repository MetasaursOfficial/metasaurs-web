const environment = process.env.REACT_APP_ENVIRONMENT

let contractABIMetadataABI;
let contractAddress;

if (environment === "DEV") {
	contractABIMetadataABI = require("../../Contracts/TestContract/TestContract.json");
	const response = require('../../Contracts/TestContract/Address')
	contractAddress = response.contractAddress;
} else {
	contractABIMetadataABI = require("../../Contracts/ProdContract/MetasaursPunks.json");
	const response = require('../../Contracts/ProdContract/Address')
	contractAddress = response.contractAddress;
}

export const Provider = {
	contractABIMetadataABI,
	contractAddress
}
