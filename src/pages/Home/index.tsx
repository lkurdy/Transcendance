import styled from 'styled-components'
import { useEffect, useContext } from 'react';
import { SoundContext } from '../../utils/context/SoundContext'
import { Link } from 'react-router-dom';

const Container = styled.main`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`

const Title = styled.h1`
	font-size: 7vh;
	font-weight: 300;
	margin: auto;
`;

const SubTitle = styled.p`
	font-size: 3.5vh;
	font-weight: 300;
`;

const StyledLink = styled(Link)`
	font-size: 5vh;
	padding: 5px 20px;
	border: 2px solid white;
	border-radius: 50px;
	text-shadow: 2px 2px 4px black;
	background: linear-gradient(0.5turn, transparent, darkgrey);
	&:hover{background: linear-gradient(0turn, transparent, grey);}
`;

function Home()
{
	const { handleSFX } = useContext(SoundContext);

	useEffect(() => {
		const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
		document.title = 'Home - ft_transcendence';
		const contextMenuListener: EventListener = (e) => handleContextMenu(e as unknown as React.MouseEvent);
		document.addEventListener('contextmenu', contextMenuListener);
		return () => document.removeEventListener('contextmenu', contextMenuListener);
	}, []);
	return (
		<Container>
			<Title>Join the competition!</Title>
			<SubTitle>ft_transcendence offers a classic, multiplayer gaming experience with a modern twist.<br />
			Challenge your friends in 1v1 Pong duels while chatting with them using our interactive chat system.<br />
			Immerse yourself in the nostalgia of an iconic game while enjoying thrilling competitive moments.<br />
			Join us and let the games begin!</SubTitle>
			<StyledLink to="/game" onClick={() => handleSFX("header")}>Play Now</StyledLink>
		</Container>
	);
}

export default Home;
