import React, { useState, memo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { useGlobalContext } from './context';

import './App.css';

// https://www.react-simple-maps.io/examples/map-chart-with-tooltip/

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function App() {
	const [ content, setContent ] = useState('');
	const { countries } = useGlobalContext();
	return (
		<div className="App">
			<ReactTooltip multiline={true}>{content}</ReactTooltip>
			<ComposableMap
				data-tip=""
				width={800}
				height={600}
				projectionConfig={{ scale: 155 }}
				projection="geoEqualEarth"
			>
				<ZoomableGroup>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={() => {
										const { NAME } = geo.properties;
										let newConfirmed = 0;
										let totalConfirmed = 0;
										let totalDeaths = 0;

										countries.forEach((country) => {
											if (country['Country'] === NAME) {
												newConfirmed = country['NewConfirmed'];
												totalConfirmed = country['TotalConfirmed'];
												totalDeaths = country['TotalDeaths'];
											}
										});

										setContent(
											<p>
												<strong>{NAME}</strong>
												<br />New cases:{' '}
												{newConfirmed ? newConfirmed.toLocaleString() : 'No data'}
												<br />Total cases:{' '}
												{totalConfirmed ? totalConfirmed.toLocaleString() : 'No data'}
												<br />Total deaths:{' '}
												{totalDeaths ? totalDeaths.toLocaleString() : 'No data'}
											</p>
										);
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
											fill: '#052d4a',
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

export default memo(App);
