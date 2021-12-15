import React, {useState} from 'react';
import './Styles.css';

const MintOwner = ({
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
	
	const renderMintButton = (loading) => {
		
		let buttonLabel = "Reserve NFT"
		
		
		if (loading) {
			buttonLabel = "Loading..."
		}
		
		return (
			<button
				className="button-primary"
				onClick={() => {
					onPress(amount);
				}}
			>
				{buttonLabel}
			</button>
		);
	};
	
	
	return (
		<div className="mint-whitelist-container">
			<h4>Select the number of tokens to reserve only paying the transaction fees</h4>
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

export default MintOwner;
