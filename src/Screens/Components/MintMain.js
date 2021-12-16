import React, {useState} from "react";
import {MenuItem, TextField} from "@material-ui/core";
import './Styles.css'

const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const MintMain = ({
	                  onPress = () => {
	                  }, label, loading, paused
                  }) => {
	
	const [quantity, setQuantity] = useState(1);
	
	const handleChange = (event) => {
		const value = event.target.value;
		setQuantity(value)
	};
	
	const renderMintButton = (loading) => {
		
		let buttonLabel = paused ? "Paused" : label
		
		
		if (loading) {
			buttonLabel = "Loading..."
		}
		
		return (
			<button
				className="button-mint"
				onClick={() => {
					onPress(quantity);
				}}
				disabled={paused}
			>
				{buttonLabel}
			</button>
		);
	};
	
	return (
		<div className="mint-main-container">
			<TextField
				label="Quantity"
				variant="outlined"
				margin="normal"
				required
				select
				className="dropdown-quantity"
				onChange={handleChange}
				value={quantity}
				InputProps={{
					style: { color: '#fff' },
				}}
			>
				{quantityArray.map((x) => (
					<MenuItem value={x} key={x}>{x}</MenuItem>
				))}
			</TextField>
			{renderMintButton(loading)}
		</div>
	)
}

export default MintMain;
