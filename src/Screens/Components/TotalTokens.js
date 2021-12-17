import React, {useEffect, useRef, useState} from 'react';
import {getContractCount} from "../../Integrations/Contracts/ContractManager";
import {Typography} from "@material-ui/core";

const TotalTokens = () => {
	
	const [tokenCount, setTokenCount] = useState("Loading...")
	const timer = useRef(null);
	
	
	useEffect(() => {
		async function getTotalTokenCount() {
			const response = await getContractCount()
			console.log("Token Count: " + response)
			const message = `${response} / 19999`
			setTokenCount(message)
		}
		
		getTotalTokenCount()
	}, [])
	
	useEffect(() => {
		async function getTotalTokenCount() {
			const response = await getContractCount()
			console.log("Token Count: " + response)
			const message = `${response} / 19999`
			setTokenCount(message)
		}
		
		timer.current = setInterval(() => {
			getTotalTokenCount()
		}, 10 * 1000);
		
		// clear on component unmount
		return () => {
			clearInterval(timer.current);
		};
		
	}, [])
	
	
	return(
		<div style={{marginTop: "1rem"}}>
			<Typography variant="h4" className="sale-coming">
				{"Metasaurs Punks Minted:"}
			</Typography>
			<Typography variant="h5" className="sale-coming">
				{tokenCount}
			</Typography>
		</div>
	)
}

export default TotalTokens
