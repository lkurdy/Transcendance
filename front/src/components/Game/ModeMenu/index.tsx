import { useNavigate  } from 'react-router-dom';
import { useState, useContext } from 'react';
import styled, { css } from 'styled-components'
import { GameContext } from '../../../utils/context/GameContext/index.tsx';
import { SoundContext } from '../../../utils/context/SoundContext/index.tsx'

interface Validate{
	isValidate?: boolean;
}

const Container = styled.div`
	display: block;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const MenuTitle = styled.h1`
	font-size: 3.7vh;
`;

const StyledLink = styled.a`
	width: 78.2%;
	padding: 1vh;
	margin: 0.2vh;
	font-size: 2.5vh;
	border: 2px solid transparent;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
`;

const MenuButton = styled.button<Validate>`
	width: 80%;
	padding: 1vh;
	margin: 0.2vh;
	font-size: 2.5vh;
	border: 2px solid transparent;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
	${props => props.isValidate
		&& css`width: 55%;
				margin: 1.5vh;
	`}
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const SpeedButton = styled.button`
	width: 26.3%;
	padding-top: 2.5vh;
	padding-bottom: 2.5vh;
	margin: 0.5vh;
	font-size: 2.7vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
`;

const Description = styled.p`
	font-size: 2.1vh;
	@media all and (min-height: 832px) and (max-width: 1280px){
		font-size: 1.5vh;
	}
`;

const PrevLink = styled.button`
	position: fixed;
	bottom: 0%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 2vh;
	display: block;
	margin: auto;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
	cursor: pointer;
`;

function ModeMenu()
{
	const [online, setOnline] = useState('Online Mode');
	const { logged, status, setStatus, dataGame, setDataGame, showMode, setShowMode } = useContext(GameContext);
	const { handleSFX, handleChangeMusic, gameMusic, battleMusic, currentSong, playlist} = useContext(SoundContext);
	const navigate = useNavigate();

	const handleModeClick = (modeParam: string) => {
			setDataGame({mode: modeParam, isDouble: dataGame.isDouble, speed: dataGame.speed});
		setShowMode(false);
		handleSFX("clic");
	};
	const handleOptionClick = (doubleParam?: boolean, speedParam?: number) => {
		if (doubleParam !== undefined && doubleParam !== dataGame.isDouble)
		{
			setDataGame({mode: dataGame.mode, isDouble: doubleParam, speed: dataGame.speed});
			handleSFX("clic");
		}
		if (speedParam !== undefined && speedParam !== dataGame.speed)
		{
			setDataGame({mode: dataGame.mode, isDouble: dataGame.isDouble, speed: speedParam});
			handleSFX("clic");
		}
	}
	const handleValidate = () => {
		handleSFX("clic");
		setShowMode(true);
		setStatus({activity: (dataGame.mode === "online" ? "In Matchmaking" : "In Game"), isInvisible: status.isInvisible});
		if (gameMusic && battleMusic && currentSong !== playlist.findIndex((song) => song.title === 'Battle'))
			handleChangeMusic();
	}
	const handleGoBack = () => {
		setDataGame({mode: undefined, isDouble: undefined, speed: undefined});
		setShowMode(true);
		handleSFX("goBack");
	}
	const handleExit = () => {
		handleSFX("exit");
		navigate(-1);
	}
	return (<Container>
				<MenuTitle style={{ display: showMode ? 'block' : 'none' }}>Choose Your Game Mode</MenuTitle>
				{logged ? <MenuButton onClick={() => handleModeClick("online")} style={{ display: showMode ? 'inline-block' : 'none' }}>Online Mode</MenuButton> :
				<StyledLink href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-aeba805b245ea71102f8f22a968dba17bf5d1a866dc5fe07bca7e32f61a5f496&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Flogin&response_type=code' onMouseEnter={() => setOnline("Log In To Play")} onMouseLeave={() => setOnline("Online Mode")} style={{ display: showMode ? 'inline-block' : 'none' }}>{online}</StyledLink>}
				<Description style={{ display: showMode ? 'block' : 'none' }}>Play against opponents from around the world with a matchmaking system.<br />Show who is the best in exciting online Pong duels.</Description>
				<MenuButton onClick={() => handleModeClick("bot")} style={{ display: showMode ? 'inline-block' : 'none' }}>Bot Mode</MenuButton>
				<Description style={{ display: showMode ? 'block' : 'none' }}>Challenge a computer-controlled opponent in Bot Mode.<br />Test your abilities in an exciting game of Pong against a challenging AI.</Description>
				<MenuButton onClick={() => handleModeClick("local")} style={{ display: showMode ? 'inline-block' : 'none' }}>Local Mode</MenuButton>
				<Description style={{ display: showMode ? 'block' : 'none' }}>Share fun face-to-face moments with a friend on the same computer,<br />engaging in intense Pong battles where every move counts.</Description>
				<MenuButton onClick={() => handleModeClick("training")} style={{ display: showMode ? 'inline-block' : 'none' }}>Training Mode</MenuButton>
				<Description style={{ display: showMode ? 'block' : 'none' }}>Enhance your Pong skills in a revamped training mode featuring targets.<br />Aim for precision and finesse without keeping score for an optimal practice experience.</Description>
				<PrevLink style={{ display: showMode ? 'block' : 'none' }} onClick={handleExit}>Go Back</PrevLink>
				<MenuTitle style={{ display: !showMode ? 'block' : 'none' }}>Choose Your Game Option</MenuTitle>
				<MenuButton onClick={() => handleOptionClick(false, undefined)} style={{ display: !showMode ? 'inline-block' : 'none' }}>Simple{dataGame.isDouble === false && ' ✓'}</MenuButton>
				<Description style={{ display: !showMode && dataGame.mode !== "training" ? 'block' : 'none' }}>Each player controls a paddle to bounce the ball back to their opponent.<br />The objective is to score points without letting the ball pass behind their own paddle.</Description>
				<Description style={{ display: !showMode && dataGame.mode === "training" ? 'block' : 'none' }}>Hone your precision, your objective is clear, you must get the ball into the hole.<br />Focus on accuracy as you attempt to master the art of delivering the perfect hit.</Description>
				<MenuButton onClick={() => handleOptionClick(true, undefined)} style={{ display: !showMode ? 'inline-block' : 'none' }}>Double{dataGame.isDouble === true && ' ✓'}</MenuButton>
				<Description style={{ display: !showMode && dataGame.mode !== "training"  ? 'block' : 'none' }}>Each player manages one paddle within their territory and one on their opponent's territory,<br />introducing a strategic gameplay dynamic where players must juggle between the two to score points.</Description>
				<Description style={{ display: !showMode && dataGame.mode == "training"  ? 'block' : 'none' }}>With the double option, you must hit a target before putting the ball in the hole.<br />Precision and control are key as you navigate through the heightened difficulty of this mode.</Description>
				<MenuTitle style={{ display: !showMode ? 'block' : 'none' }}>Choose Your Game Difficulty</MenuTitle>
				<ButtonContainer style={{ display: !showMode ? 'flex' : 'none' }}>
					<SpeedButton onClick={() => handleOptionClick(undefined, 1)}>Easy{dataGame.speed === 1 && ' ✓'}</SpeedButton>
					<SpeedButton onClick={() => handleOptionClick(undefined, 1.5)}>Medium{dataGame.speed === 1.5 && ' ✓'}</SpeedButton>
					<SpeedButton onClick={() => handleOptionClick(undefined, 2)}>Hard{dataGame.speed === 2 && ' ✓'}</SpeedButton>
				</ButtonContainer>
				<MenuButton onClick={handleValidate} style={{ marginTop: "3vh", display: (!showMode && dataGame.isDouble !== undefined && dataGame.speed !== undefined) ? 'inline-block' : 'none' }} isValidate>Play {dataGame.mode} mode</MenuButton>
				<PrevLink style={{ display: !showMode ? 'block' : 'none'}} onClick={handleGoBack}>Go Back</PrevLink>
			</Container>);
}

export default ModeMenu;
