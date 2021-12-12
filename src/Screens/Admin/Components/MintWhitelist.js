import React, {useState} from 'react';
import './Styles.css';

const MintWhitelist = ({
	                       enabled = false,
	                       loading = true,
	                       onPress = () => {
	                       },
	                       label = '',
                       }) => {
	const [amount, setAmount] = useState(1);
	
	const handleAdd = () => {
		if (amount < 10) {
			const value = amount + 1;
			setAmount(value);
		}
	};
	
	const handleMinus = () => {
		if (amount > 1) {
			const value = amount - 1;
			setAmount(value);
		}
	};
	
	const renderMintButton = (loading, _enabled) => {
		
		let buttonLabel = "Whitelist Open"
		
		if (!_enabled) {
			buttonLabel = "Whitelist Closed"
		}
		
		if (loading) {
			buttonLabel = "Loading..."
		}
		
		return (
			<button
				className="button-primary"
				disabled={!_enabled}
				onClick={() => {
					onPress(amount);
				}}
			>
				{buttonLabel}
			</button>
		);
	};
	
	const getMintedContent = (_contractData) => {
		if (!_contractData) {
			return '...';
		}
		console.log('getMintedContent: ', _contractData);
		const firstStageLimits = _contractData.maxSupply;
		const firstTokensMinted = _contractData.totalSupply;
		return `${firstTokensMinted}/${firstStageLimits} Minted`;
	};
	
	return (
		<div className="mint-whitelist-container">
			<div className={'mint-buttons-container'}>
				<div>
					<button
						className="amount-button-left"
						onClick={() => handleMinus()}
					>
						-
					</button>
					<button className={'amount-button-center'}>{amount}</button>
					<button className="amount-button-right" onClick={() => handleAdd()}>
						+
					</button>
				</div>
				
				{renderMintButton(loading, enabled)}
			</div>
		</div>
	);
};

export default MintWhitelist;
