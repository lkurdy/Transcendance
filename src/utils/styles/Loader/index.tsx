import styled, { keyframes } from 'styled-components'

const moveBall = keyframes`
	0%, 100%	{
		height: 13%;
		width: 10%;
		transform: translateX(-200%);
	}

	12%, 88% {
		height: 11.5%;
		width: 11.5%;
	}

	25%, 75%	{
		height: 10%;
		width: 13%;
	}

	50% {
		height: 13%;
		width: 10%;
		transform: translateX(125%);
	}
`;

const movePaddleUp = keyframes`
  0%, 100% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-80%);
  }
`;

const movePaddleDown = keyframes`
  0%, 100% {
    transform: translateY(-80%);
  }
  50% {
    transform: translateY(-0%);
  }
`;

const PongAnimation = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 7%;
	height: 15%;
	background-color: rgba(50, 50, 50, 0.95);
	border-radius: 10px;
	overflow: hidden;
`;

const PaddleRight = styled.div`
  position: absolute;
  width: 7%;
  height: 40%;
  background-color: #ecf0f1;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  animation: ${movePaddleUp} 1.5s ease-in-out infinite alternate;
`;

const PaddleLeft = styled.div`
	position: absolute;
	width: 7%;
	height: 40%;
	background-color: #ecf0f1;
	top: 50%;
	left: 25%;
	transform: translate(-50%, -50%);
	animation: ${movePaddleDown} 2s ease-in-out infinite alternate;
`;

const Ball = styled.div`
	position: absolute;
	width: 10%;
	height: 10%;
	background-color: white;
	border-radius: 50%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: ${moveBall} 1s linear infinite;
`;

function Loader()
{
	return (<PongAnimation>
				<PaddleLeft />
				<PaddleRight />
				<Ball />
			</PongAnimation>);
}

export default Loader;
