import { useState, useEffect } from 'react';
import styled from 'styled-components'
import useWindowSize from '../../utils/hooks/WindowSize/useWindowSize'

const Container = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: black;
	color: white;
	justify-content: center;
	align-items: center;
	text-align: center;
	z-index: 999;
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

	return (<Container style={{display: isWindowTooSmall ? "flex" : "none"}}>
				Please enlarge the window for a better user experience.
			</Container>);
}

export default WindowSize;
