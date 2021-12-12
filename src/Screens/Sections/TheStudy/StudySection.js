import React, {useEffect, useState} from 'react';
import './Styles.css';
import ChapterSection from './components/ChapterSection';
import MusicSection from './components/MusicSection';
import {addressHasTokens} from "../../../Integrations/Contracts/ContractManager";
import {getAnimationContent, getDocumentContent, getMusicContent, getNarrationContent} from "../../../Integrations/API";
import ChapterSectionAudio from "./components/ChapterSecctionAudio";
import AnimationSection from "./components/AnimationSection";
import { Container ,Grid} from "@material-ui/core";

const StudySection = ({walletAddress = null, onPlayVideoURL = () => {}}) => {
	
	const [hasAccess, setHasAccess] = useState(false);
	const [audioData, setAudioData] = useState(null);
	const [documentData, setDocumentData] = useState(null);
	const [narrationData, setNarrationData] = useState(null);
	const [animationData, setAnimationData] = useState(null);
	
	useEffect(() => {
		async function getAddressHasTokens() {
			const response = await addressHasTokens(walletAddress);
			if (response.error) {
				console.log("getAddressHasTokens error: ", response.error)
			} else {
				setHasAccess(response.hasTokens)
			}
		}
		
		if (walletAddress) {
			getAddressHasTokens()
		}
		
	}, [walletAddress])
	
	useEffect(() => {
		
		async function getAudioData() {
			try {
				const response = await getMusicContent(1)
				setAudioData(response.data)
			} catch (e) {
				console.log("getAudioData error: ", e)
			}
			
		}
		async function getDocumentData() {
			try {
				const response = await getDocumentContent()
				setDocumentData(response.data)
			} catch (e) {
				console.log("getDocumentData error: ", e)
			}
			
		}
		async function getNarrationData() {
			try {
				const response = await getNarrationContent()
				setNarrationData(response.data)
			} catch (e) {
				console.log("getDocumentData error: ", e)
			}
		}
		async function getAnimationData() {
			try {
				const response = await getAnimationContent()
				setAnimationData(response.data)
			} catch (e) {
				console.log("getDocumentData error: ", e)
			}
		}
		
		
		if (hasAccess) {
			getAudioData()
			getDocumentData()
			getNarrationData()
			getAnimationData()
		} else {
			setAudioData(null)
			setDocumentData(null)
			setNarrationData(null)
			setAnimationData(null);
		}
		
	}, [hasAccess])
	
	const handleDownloadPDFURl = (url) => {
	
	}
	
	return (
		<Container style={{flexDirection:'column',display:'flex'}}>
			<div className="title">The Study</div>
			<span className="content">
        Your journey as an Oki is just beginning. With your Oki Gen 1 NFT, you get exclusive access to Oki’s path towards the singularity.
      </span>
			
			<h2 className="title shadow">Chapter 1: Naive Oki </h2>
			{
				!documentData && <div className="sub-title">Please Sign in With Meta Mask and Your Oki NFT to Access</div>
			}
			<div className="section">
				{
					documentData && documentData.map(item => <ChapterSection
						key={item.index}
						title={item.title}
						url={item.url}
						onClick={handleDownloadPDFURl}
					/>)
				}
				
				{
					narrationData && narrationData.map(item =>
						<ChapterSectionAudio
							key={item.index}
							title={item.title}
							subtitle={item.subtitle}
							redirect={item.redirect}
							url={item.url}
					/>)
				}
				
			
			</div>
			<h3 className="title shadow">Music</h3>
			<div className="section">
				{
					audioData && audioData.map(item =>
						<MusicSection
							key={item.index}
							title={item.title}
							subtitle={item.subtitle}
							spotify={item.redirect}
							available={item.available}
							message={item.message}
							url={item.url}
						/>
					)
				}
				{
					!audioData && <div className="sub-title">Please Sign in With Meta Mask and Your Oki NFT to Access</div>
				}
				
			</div>
			<AnimationSection
				data={animationData}
				onPlayURL={onPlayVideoURL}
				emptyMessage={"Please Sign in With Meta Mask and Your Oki NFT to Access"}
			/>
		</Container>
	);
};

export default StudySection;
