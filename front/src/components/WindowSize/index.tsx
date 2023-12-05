import { useState, useEffect } from 'react';
import styled from 'styled-components'
import useWindowSize from '../../utils/hooks/WindowSize/useWindowSize'

interface WindowSize{
	isWindowTooSmall: boolean;
}

const Container = styled.div<WindowSize>`
	display: ${props => (props.isWindowTooSmall ? 'flex' : 'none')};
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: black;
	color: white;
	justify-content: center;
	align-items: center;
	text-align: center;
	z-index: 20;
`;

function WindowSize()
{
	const windowSize = useWindowSize();
	const [isWindowTooSmall, setIsWindowTooSmall] = useState(false);

	useEffect(() => {
		if (windowSize.x < 1024 || windowSize.y < 720)
			setIsWindowTooSmall(true);
		else
			setIsWindowTooSmall(false);
	}, [windowSize]);

	return (<Container isWindowTooSmall={isWindowTooSmall}>
				Please enlarge the window for a better user experience.
			</Container>);
}

export default WindowSize;
