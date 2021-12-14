import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TransactionScreen from "./Screens/Transaction/TransactionScreen";
import AdminScreen from "./Screens/Admin/AdminScreen";

ReactDOM.render(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/admin" element={<AdminScreen />} />
				<Route path="/transaction/:txHash"  element={<TransactionScreen />} />
				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>
		</BrowserRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
