import { Edit2 } from "react-feather";
import { get } from "lodash";
import RiskTag from "./RiskTag";

const ValidatorInfo = ({ name, riskScore, amountPerValidator}) => (
	<div className="rounded-lg flex items-center border border-gray-200 px-4 py-2 mb-2">
		<img src="http://placehold.it/255" className="rounded-full w-16 h-16 mr-4" />
		<div className="flex flex-col items-start w-3/5">
			<h3 className="text-gray-700 truncate w-full truncate">{name}</h3>
			<span className="flex text-gray-500 text-sm">
				Risk Score
				<RiskTag risk={riskScore} />
			</span>
		</div>
		<div className="flex flex-col ml-auto">
			<span className="text-red-400">Amount</span>
			<h5 className="text-gray-700 text-lg">{amountPerValidator.currency} KSM</h5>
			<span className="text-gray-500 text-sm">${amountPerValidator.subCurrency}</span>
		</div>
	</div>
);

// TODO: subCurrency to be calculated right
const ValidatorsList = ({ risk, totalAmount = 0, validatorMap = {} }) => {
	const validators = get(validatorMap, risk, []);
	const amountPerValidator = totalAmount / validators.length;

	return (
		<div className="rounded-xl border border-gray-200 px-8 py-6 mt-4">
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-gray-700 text-2xl">Suggested Validators</h1>
				<Edit2 size="1.5rem" />
			</div>
			<div className="mt-4 overflow-auto h-64">
				{validators.map(validator => (
					<ValidatorInfo
						key={validator.stashId}
						name={validator.stashId}
						riskScore={Number(validator.riskScore).toFixed(2)}
						amountPerValidator={{
							currency: amountPerValidator,
							subCurrency: amountPerValidator,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default ValidatorsList;
