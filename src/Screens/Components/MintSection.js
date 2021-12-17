import React, {useState} from 'react';
import './Styles.css';

const MintSection = ({
	                     loading = true,
	                     onPress = () => {
	                     },
	                     label = '',
	                     limit = 10,
	                     paused = false,
	title=null,
                     }) => {
	const [amount, setAmount] = useState(1);
	
	const handleAdd = () => {
		if (amount < limit) {
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
	
	const renderMintButton = (loading) => {
		
		let buttonLabel = paused ? "Paused" : label
		
		
		if (loading) {
			buttonLabel = "Loading..."
		}
		
		return (
			<button
				className="button-primary"
				onClick={() => {
					onPress(amount);
				}}
				disabled={paused}
			>
				{buttonLabel}
			</button>
		);
	};
	
	
	return (
		<div className="mint-whitelist-container">
			<h4>{title || "Select the number of NFT´s you want to mint"}</h4>
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
				
				{renderMintButton(loading)}
			</div>
		</div>
	);
};

export default MintSection;
