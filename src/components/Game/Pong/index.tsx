import styled from 'styled-components';
import { useMemo, useContext, useState, useEffect } from 'react';
import { GameContext } from '../../../utils/context/GameContext/'
import { SoundContext } from '../../../utils/context/SoundContext/'
import { Link } from 'react-router-dom';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import useWindowSize from '../../../utils/hooks/WindowSize/useWindowSize.ts'
import usePaddleLeft from '../../../utils/hooks/Pong/usePaddleLeft.ts'
import usePaddleRight from '../../../utils/hooks/Pong/usePaddleRight.ts'
import useBall from '../../../utils/hooks/Pong/useBall.ts'
import useTrainingBall from '../../../utils/hooks/Pong/useTrainingBall.tsx';

const Container = styled.div`
	height: 100%;
	width: 100%;
`

const Score = styled.h2`
	font-size: 4vh;
	font-weight: 500;
	position: fixed;
	left: 25%;
	transform: translate(-50%, -80%);
`

const Divider = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	white-space: pre;
	font-size: 24px;
`;

const StyledStage = styled(Stage)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 90%;
	border: 2px solid dimgrey;
`;

const Notice = styled.p`
	position: fixed;
	font-size: 3vh;
	top: 91%;
	left: 15%;
	width: 100%;
`;

const Leave = styled(Link)`
	font-size: 18px;
	position: fixed;
	bottom: -1%;
	left: 75%;
	transform: translate(-50%, -50%);
	padding: 1px 5px;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	background: linear-gradient(0.5turn, dimgrey, rgb(50, 50, 50));
	&:hover{background: linear-gradient(0turn, dimgrey, rgb(50, 50, 50));}
`

function formatCurrentDate()
{
	const date = new Date();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedDay = day < 10 ? `0${day}` : day;

	return (`${formattedMonth}/${formattedDay}`);
}

function Pong()
{
	const { status, setStatus, inPause, setInPause, scores, dataGame, setDataGame, setScores } = useContext(GameContext);
	const inner = useWindowSize();
	const data = useMemo(() => ({ width: inner.x * 0.01, height: inner.y * 0.10, radius: inner.x * 0.006}), [inner]);
	const paddleLeft = usePaddleLeft(inner, false);
	const paddleRight = usePaddleRight(inner, false);
	const dataDoubleWall = useMemo(() => ({ height: inner.y * 0.15, bot: inner.y * 0.524, left: paddleLeft.x - data.width, right: (inner.x * 0.739 - inner.y * 0.10) + data.width}), [inner]);
	const secondPaddleLeft = usePaddleLeft(inner, true);
	const secondPaddleRight = usePaddleRight(inner, true);
	const ball = useBall(inner, data, dataDoubleWall, paddleLeft, paddleRight, secondPaddleLeft.x, secondPaddleRight.x)
	const trainingBall = useTrainingBall(inner, data, dataDoubleWall, paddleLeft, paddleRight, secondPaddleLeft.x)
	const divider = useMemo(() => ("|\n".repeat(Math.floor(inner.y / 42))), [inner.y]);
	const dots = ["", ".", "..", "...", "..", "."];
	const [dotsIdx, setDotsIdx] = useState(0);
	const { handleSFX } = useContext(SoundContext);

	if (inPause)
		setInPause(false);
	if (dataGame.mode !== "training" && dataGame.mode !== "local")
		formatCurrentDate();
	const handleGoHome = () => {
		setStatus({activity: "Online", isInvisible: status.isInvisible});
		setDataGame({mode: undefined, isDouble: undefined, speed: undefined, id: undefined});
		setScores({x: 0, y:0});
		handleSFX("exit");
	}
	useEffect(() => {
		const interval = setInterval(() => setDotsIdx((prevIdx) => (prevIdx + 1) % 6), 750);
		return () => clearInterval(interval);
	}, []);
	return (<Container>
				{dataGame.mode !== "training" && <Score>{scores.x}</Score>}
				{dataGame.mode === "training" ? <Score style={{left: "50%", fontSize: "3.3vh"}}>{status.activity === "In Matchmaking" ? `Waiting for opponent${dots[dotsIdx]}` : "Training Mode"}</Score>
				: <Score style={{left: "75%"}}>{scores.y}</Score>}
				<Divider>{divider}</Divider>
				{dataGame.isDouble ?
				<StyledStage width={inner.x * 0.752} height={inner.y * 0.68}>
					<Layer>
						<Rect x={dataDoubleWall.left} y={0} width={data.width} height={dataDoubleWall.height} fill="white" />
						<Rect x={paddleLeft.x} y={paddleLeft.y} width={data.width} height={data.height} fill="white" />
						<Rect x={secondPaddleRight.x} y={secondPaddleRight.y} width={data.width} height={dataGame.mode === "training" ? 0 : data.height} fill="white" />
						<Rect x={dataDoubleWall.left} y={dataDoubleWall.bot} width={data.width} height={dataDoubleWall.height} fill="white" />
						<Circle x={dataGame.mode === "training" ? trainingBall.x : ball.x} y={dataGame.mode === "training" ? trainingBall.y : ball.y} radius={data.radius} fill="white" />
						<Rect x={dataDoubleWall.right} y={0} width={data.width} height={dataGame.mode === "training" ? 0 : dataDoubleWall.height} fill="white" />
						<Rect x={secondPaddleLeft.x} y={secondPaddleLeft.y} width={data.width} height={data.height} fill="white" />
						<Rect x={paddleRight.x} y={paddleRight.y} width={data.width} height={data.height} fill="white" />
						<Rect x={dataDoubleWall.right} y={dataDoubleWall.bot} width={data.width} height={dataGame.mode === "training" ? 0 : dataDoubleWall.height} fill="white" />
					</Layer>
				</StyledStage> :
				<StyledStage width={inner.x * 0.752} height={inner.y * 0.68}>
				<Layer>
					<Rect x={paddleLeft.x} y={paddleLeft.y} width={data.width} height={data.height} fill="white" />
					<Circle x={dataGame.mode === "training" ? trainingBall.x : ball.x} y={dataGame.mode === "training" ? trainingBall.y : ball.y} radius={data.radius} fill="white" />
					<Rect x={paddleRight.x} y={paddleRight.y} width={data.width} height={data.height} fill="white" />
				</Layer>
				</StyledStage>}
				<Notice>Press ↑ and ↓ to move</Notice>
				{dataGame.mode === "local" && <Notice style={{left: "65%"}}>Use mouse to move</Notice>}
				{dataGame.mode !== "local" && <Leave to="/game" onClick={handleGoHome}>{status.activity === "In Matchmaking" ? "Cancel Queue" : "Leave Game"}</Leave>}
			</Container>
	);
}

export default Pong;
