import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTokenURI} from "../Integrations/Contracts/ContractManager";
import {getDatFromIpfs} from "../Integrations/API";
import TokenInformation from "./Sections/MainMyWallet/components/OkiResume/TokenInformation";
import ShareLink from "react-twitter-share-link";
import AttributesGrid from "./Sections/MainMyWallet/components/OkiResume/AttributesGrid";
import {contractAddress} from "../Contracts/IkoContract/Address";


const OkiDetails = () => {
	let { tokenId } = useParams();
	const baseUrl = process.env.REACT_APP_BASE_URL
	const openSeaBaseUrl = process.env.REACT_APP_OPENSEA_URL  + "/" + contractAddress ;
	console.log(openSeaBaseUrl)
	
	const [metadata, setMetadata] = useState(null);
	
	useEffect(() => {
		async function fetchTokenURI() {
			const response = await getTokenURI(tokenId)
			if (response.error) {
				//Todo: handle Error
			} else {
				const data = await getDatFromIpfs(response.tokenURI)
				console.log(data)
				setMetadata(data)
			}
		}
		if (tokenId){
			fetchTokenURI()
		}
	}, [tokenId])
	
	
	return(
		<div className="Oki-Resume token-resume">
			<div className="image-resume-container">
				<img src={metadata?.alternative_url} className="image-resume" alt="ifps"/>
				<TokenInformation tokenId={tokenId}/>
				<button className="share-button">
					<a href={`${openSeaBaseUrl}/${tokenId}`} target='_blank'>View on Opensea</a>
				</button>
			</div>
			<div className="oki-information-container">
				<div className="title-container">
					<h1>{`Hi I'm ${metadata?.name}`}</h1>
					<div className="dropdown">
						<button className="share-button">Share</button>
						<div className="dropdown-content">
							<ShareLink
								text={"Hey look this amazing IKO"}
								link={`${baseUrl}/okis/${tokenId}`}
								hashtags={["iko", "development", "nft"]}
							>
								{link => (
									<a href={link} target='_blank'>Twitter</a>
								)}
							</ShareLink>
						</div>
					</div>
					
				</div>
				<p>You'll find me hanging by Soda lake and eating Underberries with my pal Doki.</p>
				<AttributesGrid attributes={metadata?.attributes}/>
			</div>
		</div>
	)

}

export default  OkiDetails
