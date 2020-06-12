import Head from 'next/head';
import { useState, useEffect } from 'react';
import PolkadotApiContext from '@lib/contexts/polkadot-api';
import createPolkadotAPIInstance from '@lib/polkadot-api';
import getPolkadotExtensionInfo from '@lib/polkadot-extension';
import PolkadotExtensionContext from '@lib/contexts/polkadot-extension';

const Page = ({ title, children, layoutProvider }) => {
	const layoutedChild = layoutProvider ? layoutProvider(children) : children;
	const [apiInstance, setApiInstance] = useState(); 
	const [polkadotExtensionInfo, setPolkadotExtensionInfo] = useState();

	useEffect(() => {
		// ensure only single api-instance is created in whole lifetime of this container
		createPolkadotAPIInstance().then(setApiInstance);
		getPolkadotExtensionInfo().then(setPolkadotExtensionInfo);
	}, []);

	return (
		<div>
			<Head>
				<title>{title} - YieldScan</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/font-proxima-nova@1.0.1/style.css"
				/>
				<link
					rel="stylesheet"
					href="https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/gotham.css"
				/>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			</Head>
			<PolkadotApiContext.Provider value={{ apiInstance }}>
				<PolkadotExtensionContext.Provider value={{ ...polkadotExtensionInfo }}>
					<div>
						{layoutedChild()}
					</div>
				</PolkadotExtensionContext.Provider>
			</PolkadotApiContext.Provider>
		</div>
	);
};

export default Page;