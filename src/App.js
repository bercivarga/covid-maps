import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';

import './App.css';

// https://www.react-simple-maps.io/examples/map-chart-with-tooltip/

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function App() {
	const [ content, setContent ] = useState('');

	return (
		<div className="App">
			<ReactTooltip>{content}</ReactTooltip>
			<ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
				<ZoomableGroup>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={() => {
										const { NAME } = geo.properties;
										setContent(`${NAME}`);
									}}
									onMouseLeave={() => {
										setContent('');
									}}
									style={{
										default: {
											fill: '#D6D6DA',
											outline: 'none'
										},
										hover: {
											fill: '#F53',
											outline: 'none'
										},
										pressed: {
											fill: '#E42',
											outline: 'none'
										}
									}}
								/>
							))}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
		</div>
	);
}

export default App;
