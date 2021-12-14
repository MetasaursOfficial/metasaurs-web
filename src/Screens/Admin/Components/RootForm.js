import React, {useState} from 'react';
import './Styles.css'

const RootForm = ({onSubmit}) => {
	
	const [value, setValue] = useState("0");
	
	
	const onAmountChange = (event) => {
		setValue(event.target.value)
	}
	
	const handleWhiteListAddressButton = async () => {
		onSubmit(value)
		
	}
	
	return (
		<div className="whitelist-form-container">
			<div className="whitelist-text">Enter the root hash</div>
			<input
				name="amount_input"
				type="text"
				value={value}
				onChange={onAmountChange}
				className="input-container"
			/>
			<button
				className="admin-button"
				onClick={handleWhiteListAddressButton}>Set Root</button>
		</div>
	)
}

export default RootForm
