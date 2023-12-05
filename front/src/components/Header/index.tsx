import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import BtnHome from '../../assets/images/btn-home.png';
import BtnPlay from '../../assets/images/btn-play.png';
import BtnChat from '../../assets/images/btn-chat.png';
import BtnProfile from '../../assets/images/btn-profile.png';
import { GameContext } from '../../utils/context/GameContext/'
import { SoundContext } from '../../utils/context/SoundContext/'
import Pause from '../Game/Pause/'

interface StyledLinkProps {
	isNavLogo?: boolean;
}

const Container = styled.header`
	display: flex;
`;

const HomeLogo = styled.img`
	height: 17vh;
`;

const Title = styled.h1`
	display: flex;
	margin: auto;
	margin-right: 0px;
	font-size: 5vw;
	font-weight: 400;
`;

const NavContent = styled.nav`
	display: flex;
	margin: auto;
`;

const StyledLink = styled(Link)<StyledLinkProps>`
	font-size: 2.5vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	${props => props.isNavLogo
		&& css`&:hover {height: 15vh;}
			padding-left: 35px;
	`}
`;

const NavLogo = styled.img`
	height: 7vh;
`;

function Header()
{
	const location = useLocation();

	const { logged, setShowMode, status, setStatus, dataGame, setDataGame, inPause, setInPause, scores, setScores } = useContext(GameContext);	
	const { handleSFX } = useContext(SoundContext);	

	const handleClick = (path: string, name: string) => {
		if (location.pathname !== path)
		{
			if (path !== "/game")
			{
				if (status.activity === "In Game" && dataGame.mode !== "training" && scores.x !== 11 && scores.y !== 11)
					setInPause(true);
				else
				{
					if (scores.x === 11 || scores.y === 11 || dataGame.mode === "training")
					{
						setStatus({activity: "Online", isInvisible: status.isInvisible});
						setScores({x: 0, y:0});
					}
					setDataGame({mode: undefined, isDouble: undefined, speed: undefined});
				}
				setShowMode(true);
			}
			handleSFX(name)
		}
	};
	return (
		<Container>
			<StyledLink to="/" onClick={() => handleClick("/", "exit")}>
				<HomeLogo src={BtnHome} alt='BtnHome' />
			</StyledLink>
			<Title>
				ft_transcendence
			</Title>
			<NavContent>
				<StyledLink to="/game" isNavLogo onClick={() => handleClick("/game", "header")}>
					<NavLogo src={BtnPlay} alt='BtnPlay'/>
					{status.activity === "In Game" ? "In Game": "Play"}
				</StyledLink>
				{logged && <StyledLink to="/chat" isNavLogo onClick={() => handleClick("/chat", "header")}>
					<NavLogo src={BtnChat} alt='BtnChat'/>
					Chat
				</StyledLink>}
				<StyledLink to={logged ? "/profile" : "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-aeba805b245ea71102f8f22a968dba17bf5d1a866dc5fe07bca7e32f61a5f496&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Flogin&response_type=code"} isNavLogo onClick={() => handleClick("/profile", "header")}>
					<NavLogo src={BtnProfile} alt='BtnProfile'/>
					{logged ? "Profile" : "Log In"}
				</StyledLink>
			</NavContent>
			{status.activity === "In Game" && inPause && <Pause resize={false} opponent={false}/>}
		</Container>);
}

export default Header;
