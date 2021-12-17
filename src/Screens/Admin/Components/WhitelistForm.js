import React, {useState} from 'react';
import './Styles.css'

const WhitelistForm = ({onSubmit}) => {
	
	const [address, setAddress] = useState("")
	const [amount, setAmount] = useState(0);
	
	const onAddressChange = (event) => {
		setAddress(event.target.value)
	}
	const onAmountChange = (event) => {
		setAmount(event.target.value)
	}
	
	const handleWhiteListAddressButton = async () => {
		const arrayPartial = address.split(",")
		let response = [];
		
		arrayPartial.forEach(item => {
			const noSpaces = item.trim();
			if (noSpaces.length === 42){
				response.push(noSpaces)
			}
		})
		
		if (response.length > 0) {
			onSubmit(response, amount)
		}
		
	}
	
	return (
		<div className="whitelist-form-container">
			<h4 className="whitelist-text">The last one does not carry coma</h4>
			<input
				name="address_input"
				value={address}
				onChange={onAddressChange}
				className="address-input"
			/>
			<div className="whitelist-text">Enter the number of tokens to mint to</div>
			<input
				name="amount_input"
				type="number"
				value={amount}
				onChange={onAmountChange}
				className="input-container"
			/>
			<button onClick={handleWhiteListAddressButton}>Add whitelist addresses</button>
		</div>
	)
}

export default WhitelistForm
