import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { StyledContainer } from '../../utils/styles/Atoms.tsx';
import { SoundContext } from '../../utils/context/SoundContext/';
import Audio from '../../components/Profile/Audio/';
import Friends from '../../components/Profile/Friends/';
import MatchHistory from '../../components/Profile/MatchHistory/';
import LeaderBoard from '../../components/Profile/LeaderBoard/';
import IdCard from '../../components/Profile/User/IdCard/';

const NavContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const NavContent = styled.button`
	border-radius: 30px;
	margin: 1vw;
	padding: 1.1vh 1.5vw;
	font-size: 2vh;
	cursor: pointer;
	border: 1px solid darkgrey;
	text-shadow: 2px 2px 4px black;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
`;

function Profile() {
	const [nav, setNav] = useState(0);
	const { handleSFX } = useContext(SoundContext);

	const handleClick = (navNb: number) => {
		if (navNb !== nav)
		{
			setNav(navNb);
			handleSFX(`clic`);
		}
	}
	useEffect(() => {
		const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
		document.title = 'Profile - ft_transcendence';
		const contextMenuListener: EventListener = (e) => handleContextMenu(e as unknown as React.MouseEvent);
		document.addEventListener('contextmenu', contextMenuListener);
		return () => document.removeEventListener('contextmenu', contextMenuListener);
	}, []);
	return (<StyledContainer>
				<NavContainer>
					<NavContent onClick={() => handleClick(0)} style={{ fontSize: nav === 0 ? '2.5vh' : '2vh' }}>ID Card</NavContent>
					<NavContent onClick={() => handleClick(1)} style={{ fontSize: nav === 1 ? '2.5vh' : '2vh' }}>Match History</NavContent>
					<NavContent onClick={() => handleClick(2)} style={{ fontSize: nav === 2 ? '2.5vh' : '2vh' }}>Friends</NavContent>
					<NavContent onClick={() => handleClick(3)} style={{ fontSize: nav === 3 ? '2.5vh' : '2vh' }}>LeaderBoard</NavContent>
					<NavContent onClick={() => handleClick(4)} style={{ fontSize: nav === 4 ? '2.5vh' : '2vh' }}>Audio</NavContent>
				</NavContainer>
				{nav === 0 && <IdCard user="Hamid" isLocal={true}/>}
				{nav === 1 && <MatchHistory />}
				{nav === 2 && <Friends />}
				{nav === 3 && <LeaderBoard />}
				{nav === 4 && <Audio />}
			</StyledContainer>);
}

export default Profile;
