import React, {useEffect, useState} from 'react';
import {getTokenInformation} from "../../../../../Integrations/Contracts/ContractManager";
import "./ResumeStyles.css";

const baseUrl = "https://opensea.io/assets/0x847772ee47960b61bfcf2a54ef4523e4f015b853/"

const TokenInformation = ({tokenId}) => {
	
	const [tokenData, setTokenData] = useState(null);
	
	const link = baseUrl + tokenId;
	
	useEffect(() => {
		if (tokenId){
			const data = getTokenInformation(tokenId)
			console.log(data)
			setTokenData(data)
		}
	}, [tokenId])
	
	const TokenProperty = ({label, value}) => {
		console.log("TokenProperty: ", label, value)
		return(
			<div className="token-info-element">
				<div className="token-info-label">{label}</div>
				<p className="token-info-value">{value}</p>
			</div>
		)
	}
	
	return(
		<>
			{tokenData && (
				<div className="token-info-container">
					<TokenProperty label={"Contract Address"} value={tokenData.address}/>
					<TokenProperty label={"Token Standard"} value={tokenData.standard}/>
					<TokenProperty label={"Token ID"} value={tokenId}/>
					<TokenProperty label={"Blockchain"} value={tokenData.blockchain}/>
					<a className="token-info-label" href={link} target='_blank'>See it on Opensea</a>
				</div>
			)}
		</>
		
		
	)
}

export default TokenInformation
