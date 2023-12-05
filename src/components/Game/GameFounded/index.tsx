import styled from "styled-components";
import Loader from "../../../utils/styles/Loader";

const Card = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 60%;
	height: 60%;
	border-radius: 5px;
	background: rgba(25, 25, 25, 0.95);
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-bottom: 50px;
	text-shadow: 2px 2px 4px black;
	padding: 1vw;
`;

function GameFounded()
{
	return (<Card>
				<Loader/>
				Waiting opponent
			</Card>);
}

export default GameFounded;
