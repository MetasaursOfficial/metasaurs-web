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
			<div className="whitelist-text">Enter the addresses separated by comas</div>
			<p className="whitelist-text">0xD3c...23cf625a,0x5ccDaaF0A...aDd35727,0xC21F359...783422</p>
			<div className="whitelist-text">The last one does not carry coma</div>
			<textarea
				name="address_input"
				value={address}
				onChange={onAddressChange}
				className="address-input"
			/>
			<div className="whitelist-text">Enter the number of tokens allowed to mint for this addresses</div>
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
