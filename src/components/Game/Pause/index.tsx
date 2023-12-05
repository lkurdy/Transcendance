import styled from "styled-components";
import { useContext, useState } from "react";
import { GameContext } from '../../../utils/context/GameContext'

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 10;
`;

const Card = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40%;
	height: 35%;
	border-radius: 5px;
	background: rgba(25, 25, 25, 0.95);
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 3vh;
	margin-bottom: 50px;
	text-shadow: 2px 2px 4px black;
`;

const Text = styled.p`
	font-size: 2.2vh;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const StyledButton = styled.button`
	width: 30%;
	padding: 5px;
	margin: 5px;
	font-size: 2vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, dimgrey, rgb(25, 25, 25, 0.95));
	&:hover{background: linear-gradient(0turn, dimgrey, rgb(25, 25, 25, 0.95));}
`;

function Pause(props: {resize: boolean, opponent: boolean})
{
	const { status, setStatus, setInPause, setDataGame, scores, setScores } = useContext(GameContext);
	const [okayPressed, setOkayPressed] = useState(false);

	const handleGiveUp = () => {
		setInPause(false);
		setScores({x: 0, y:0});
		setDataGame({mode: undefined, isDouble: undefined, speed: undefined, id: undefined});
		setStatus({activity: "Online", isInvisible: status.isInvisible});
	}
	const handleGoBack = () => {
		setOkayPressed(true);
	}
	if (okayPressed)
		return (null);
	return (<Overlay><Card>
				{!props.opponent && "Game In Progress"}<br/>
				{props.opponent ? "Pause" : `Scores: ${scores.x} - ${scores.y}`}
				{props.opponent && <Text>Please wait a moment.<br />Your opponent has temporarily interrupted the game.<br />Note that after one minute, this will be considered an automatic abandonment.</Text>}
				{!props.opponent && <Text>You have 1 minute to return, otherwise,<br />you will be considered to have abandoned the game.</Text>}
				<ButtonContainer>
					{!props.opponent && <StyledButton onClick={handleGiveUp}>Give up</StyledButton>}
					{<StyledButton onClick={handleGoBack}>Okay</StyledButton>}
				</ButtonContainer>
			</Card></Overlay>);
}

export default Pause;
