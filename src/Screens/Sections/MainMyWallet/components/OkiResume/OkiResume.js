import React, {useEffect, useState} from 'react';
import ShareLink from 'react-twitter-share-link'
import {getTokenURI} from "../../../../../Integrations/Contracts/ContractManager";
import './ResumeStyles.css'
import {getDatFromIpfs} from "../../../../../Integrations/API";
import AttributesGrid from "./AttributesGrid";
import TokenInformation from "./TokenInformation";
import { Container, Grid } from "@material-ui/core";


const OkiResume = ({tokenId}) => {
	
	const baseUrl = process.env.REACT_APP_BASE_URL;
	
	const [metadata, setMetadata] = useState(null);
	
	useEffect(() => {
		async function fetchTokenURI() {
			const response = await getTokenURI(tokenId)
			if (response.error) {
			} else {
				const data = await getDatFromIpfs(response.tokenURI)
				setMetadata(data)
			}
		}
		
		fetchTokenURI()
	}, [])
	
	
	return (
		<Container>
			<Grid container spacing={3} justifyContent="center">
				<Grid item lg={6}>
					<img src={metadata?.alternative_url} className="image-resume" alt="ifps"/>
					<TokenInformation tokenId={tokenId}/>
				</Grid>
				<Grid item lg={6}>
					<div className="title-container">
						<h1>{`Hi! I'm ${metadata?.name}`}</h1>
						<div className="dropdown">
							<button className="share-button">Share</button>
							<div className="dropdown-content">
								<ShareLink
									text={"Hey look my amazing Oki"}
									link={`${baseUrl}/okis/${tokenId}`}
									hashtags={["oki", "nft"]}
								>
									{link => (
										<a href={link} target='_blank'>Twitter</a>
									)}
								</ShareLink>
							</div>
						</div>
					</div>
					<AttributesGrid attributes={metadata?.attributes}/>
			</Grid>
			<hr className="resume-divider"/>
			</Grid>
		</Container>
		
	)
}

export default OkiResume
