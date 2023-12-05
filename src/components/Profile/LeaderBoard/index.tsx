import { useState, useContext } from "react";
import styled from "styled-components";
import { SoundContext } from "../../../utils/context/SoundContext";
import Exemple from "../../../assets/images/btn-profile.png"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	text-align: start;
`;

const Card = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: 2.5vh;
	margin: 0.5vh;
	font-size: 1.5vh;
	border: 2px solid dimgrey;
	border-radius: 5px;
	text-shadow: 1px 1px 2px dimgrey;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
`;

const Picture = styled.img`
	height: 6vh;
`

const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	position: absolute;
	bottom: 1%;
	width: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: -15vw;
`;

const StyledInput = styled.input`
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 1px solid dimgrey;
	border-radius: 10px;
	height: 3.5vh;
	width: 60%;
	font-size: 2vh;
	margin: 10px;
	text-align: center;
	text-shadow: 2px 2px 4px dark;
	@media all and (min-height: 832px) and (max-width: 1280px){
		height: 3vh;
		font-size: 1.5vh;
		margin: 10px 0px;
	}
`

const ChangePage = styled.button`
	font-size: 2vh;
	display: block;
	margin-top: 2.5vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px dark;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
	cursor: pointer;
	@media all and (min-height: 832px) and (max-width: 1280px){
		font-size: 1.4vh;
	}
	margin: 10px;
`;

const leaderboardData = ["nickname 1", "nickname 2", "nickname 3", "nickname 4", "nickname 5",
"nickname 6", "nickname 7", "nickname 8", "nickname 9", "nickname 10", "nickname 11"];

function LeaderBoard()
{
	const [startIndex, setStartIndex] = useState(0);
	const { handleSFX } = useContext(SoundContext);

	const handlePrev = () => {
		if (startIndex - 4 >= 0)
			setStartIndex(startIndex - 4);
		handleSFX('clic');
	};
	const handleNext = () => {
		if (startIndex + 4 < leaderboardData.length)
			setStartIndex(startIndex + 4);
		handleSFX('clic');
	};

	return (<Container>
				{leaderboardData.slice(startIndex, startIndex + 4).map((username, index) => (
				<Card key={startIndex + index}>
					<h1>{startIndex + index + 1}</h1>
					<Picture src={Exemple} alt="Picture"/>
					<h3>{username}</h3>
					<>
						<h3>rank<br/>nb win</h3>
						<h3>1 badge</h3>
					</>
					<>
						<h3>accept friend request ?= add friend</h3>
						<h3>profile public ?= show profile</h3>
					</>
				</Card>))}
				<Footer>
					<form method="get" action="">
						<StyledInput type="text" name="search" autoComplete="off" placeholder="Search Player" minLength={2} maxLength={10}></StyledInput>
					</form>
					<ButtonContainer>
						{startIndex > 0 && <ChangePage onClick={handlePrev}>{"<"}</ChangePage>}
						{startIndex < leaderboardData.length - 4 && <ChangePage onClick={handleNext}>{">"}</ChangePage>}
					</ButtonContainer>
				</Footer>
			</Container>);
}

export default LeaderBoard;