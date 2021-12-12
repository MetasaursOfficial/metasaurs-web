import React, {useState} from 'react';
import './Styles.css'

const ReserveForm = ({onSubmit}) => {
	
	const [amount, setAmount] = useState(0);
	
	const onAmountChange = (event) => {
		setAmount(event.target.value)
	}
	
	const handleSubmit = () => {
		onSubmit(amount)
	}
	
	return (
		<div className="whitelist-form-container">
			<div className="whitelist-text">Enter the number of tokens to reserve only paying the transaction fees</div>
			<input
				name="amount_input"
				type="number"
				value={amount}
				onChange={onAmountChange}
				className="input-container"
				min={1}
			/>
			<button onClick={handleSubmit}>Reserve NFT</button>
		</div>
	)
}

export default ReserveForm
