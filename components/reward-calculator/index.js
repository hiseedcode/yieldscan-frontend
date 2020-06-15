import { useState, useEffect, useRef } from "react";
import axios from "@lib/axios";
import { ChevronDown } from "react-feather";

const AmountInput = () => {
	return (
		<div className="flex items-center justify-between p-2 py-1 rounded-full border border-gray-300 w-2/3">
			<div className="flex flex-col ml-6">
				<input type="number" value={3000} className="w-24 text-2xl p-0 outline-none" />
				<h6 className="text-gray-600 text-sm">$1500</h6>
			</div>
			<div className="flex-center">
				<div className="bg-gray-800 px-6 py-3 text-white rounded-full">
					<div className="flex items-center relative cursor-pointer">
						<span className="mr-8">KSM</span>
						<ChevronDown className="absolute right-0" />
					</div>
				</div>
			</div>
			<style jsx>{`
				/* hides number input controls */
				input[type=number]::-webkit-inner-spin-button, 
				input[type=number]::-webkit-outer-spin-button { 
					-webkit-appearance: none; 
					margin: 0; 
				}
			`}</style>
		</div>
	);
};

const RiskSelect = ({ selected = 'Low' }) => {
	const options = ['Low', 'Medium', 'High'];
	return (
		<div className="flex rounded-full border border-gray-300 py-2 px-2 w-2/3">
			{options.map(option => (
				<span key={option} className={`
					w-1/3 font-semibold py-4 flex-center rounded-full cursor-pointer
					${selected === option ? 'bg-orange-500 text-white' : 'text-gray-600'}
				`}>
					{option}
				</span>
			))}
		</div>
	);
};

const TimePeriodInput = () => {
	return (
		<div className="flex items-center justify-between p-2 rounded-full border border-gray-300 w-2/3">
			<div className="ml-6">
				<input type="number" value={6} className="w-24 text-2xl p-0 outline-none" />
			</div>
			<div className="flex-center">
				<div className="bg-gray-800 px-6 py-3 text-white rounded-full">
					<div className="flex items-center relative cursor-pointer">
						<span className="mr-8">Months</span>
						<ChevronDown className="absolute right-0" />
					</div>
				</div>
			</div>
			<style jsx>{`
				/* hides number input controls */
				input[type=number]::-webkit-inner-spin-button, 
				input[type=number]::-webkit-outer-spin-button { 
					-webkit-appearance: none; 
					margin: 0; 
				}
			`}</style>
		</div>
	);
};

const RewardCalculatorPage = () => {
	const [validatorMap, setValidatorMap] = useState({}); // map with low/med/high risk sets
	const [estimatedReward, setEstimatedReward] = useState('');
	const [selectedRisk, setSelectedRisk] = useState('low');

	const amountInput = useRef();

	useEffect(() => {
		// axios.get('/yieldwithrisk').then(({ data }) => {
		// 	setValidatorMap({
		// 		low: data[0].lowriskset,
		// 		med: data[1].medriskset,
		// 		high: data[2].highriskset,
		// 	});
		// });
	}, []);

	const calculateReward = () => {
		const validators = validatorMap[selectedRisk];
		const amount = amountInput.current.value / validators.length;

		let totalReward = 0;

		validators.forEach(v => {
			const stakeFraction = amount / (amount + v.totalStake);
			const reward = (v.estimatedPoolReward - v.commission) * stakeFraction;
			totalReward += reward;
		});

		setEstimatedReward(totalReward);
	};

	return (
		<div className="flex px-24 pt-12">
			<div className="w-1/2">
				<h1 className="font-semibold text-3xl text-gray-800">Calculate Returns</h1>
				<div className="mt-10 mx-2">
					<h3 className="text-2xl text-gray-700">Staking Amount</h3>
					<div className="mt-6">
						<AmountInput />
					</div>
					<h3 className="text-2xl mt-10 text-gray-700">Risk Preference</h3>
					<div className="mt-6">
						<RiskSelect />
					</div>
					<h3 className="text-2xl mt-10 text-gray-700">Time Period</h3>
					<div className="mt-6">
						<TimePeriodInput />
					</div>
				</div>
			</div>
			<div className="w-1/2">
				
			</div>
		</div>
	);
};

export default RewardCalculatorPage;