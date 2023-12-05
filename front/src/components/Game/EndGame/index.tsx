import { useContext } from 'react';
import { GameContext } from '../../../utils/context/GameContext'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 25%;
	height: 75%;
	border-radius: 5px;
	background-color: rgb(25, 25, 25, 0.95);
	z-index: 2;
`

function EndGame()
{
	const { status, setStatus, setScores, setDataGame, scores } = useContext(GameContext);
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
		setStatus({activity: "Online", isInvisible: status.isInvisible});
		setDataGame({mode: undefined, isDouble: undefined, speed: undefined, id: undefined});
		setScores({x: 0, y:0});
		//add other info
	}
	const handleReplay = () => {
		navigate("/game");
		setStatus({activity: "Online", isInvisible: status.isInvisible});
		setDataGame({mode: undefined, isDouble: undefined, speed: undefined, id: undefined});
		setScores({x: 0, y:0});
		//add other info
	}
	const handleRematch = () => {
		//invite => waiting until friend accept or 1 minute
		setStatus({activity: "Online", isInvisible: status.isInvisible});
		setDataGame({mode: undefined, isDouble: undefined, speed: undefined, id: undefined});
		setScores({x: 0, y:0});
		//add other info
	}
	return (<Card>
				Player 1 : {scores.x}<br />
				Player 2 : {scores.y}
				<button onClick={handleGoHome}>Go home</button>
				<button onClick={handleReplay}>Replay</button>
				<button onClick={handleRematch}>Rematch</button>
			</Card>);
}

export default EndGame;
