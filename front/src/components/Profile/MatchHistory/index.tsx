import { useState, useContext } from "react";
import styled from "styled-components";
import { SoundContext } from "../../../utils/context/SoundContext";
import Exemple from "../../../assets/images/btn-profile.png"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const NoConv = styled.p`
	font-size: 1.7vw;
	font-weight: 600;
	text-align: center;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 55vh;
`

const Card = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 2.5vh;
	margin: 0.5vh;
	font-size: 1.5vh;
	border: 2px solid dimgrey;
	border-radius: 5px;
	text-shadow: 1px 1px 2px dimgrey;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	position: relative;
`;

const Picture = styled.img`
	height: 6vh;
`

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 1%;
	width: 100%;
`;

const ChangePage = styled.button`
	font-size: 2vh;
	display: block;
	margin-top: 2.5vh;
	text-shadow: 2px 2px 4px dark;
	border-radius: 5px;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
	cursor: pointer;
	@media all and (min-height: 832px) and (max-width: 1280px){
		font-size: 1.4vh;
	}
	margin: 10px;
`;

const matchDataNames = ["amin", "moha", "rayan", "richar", "lais",
"hamid", "antoine", "richard", "jeanClaude", "gustave", "adam"];

const matchDataScores = ["5 - 11", "11 - 3", "11 - 0", "1 - 11", "11 - 8",
"5 - 3", "11 - 10", "11 - 10", "2 - 11", "11 - 6", "5 - 7"];

const playername = "username90";

const matchDataWinner = ["Username", "Username", "rayan", "richar", "lais",
"hamid", "Username", "hamid", "Username", "rayan", "moha"];

const matchDataDate = ["09/22", "01/08", "07/28", "02/14", "11/04",
"08/19", "10/07", "06/30", "05/12", "03/15", "08/01"];

const matchDataMode = ["Simple", "Simple", "Double", "Simple", "Double",
"Simple", "Double", "Simple", "Double", "Simple", "Double"];

const matchDataDifficulty = ["Easy", "Hard", "Hard", "Medium", "Medium",
"Hard", "Easy", "Medium", "Easy", "Hard", "Medium"];

const userRR = [11, 16, 10, 20, 14,
	16, 13, 14, 3, 10, 15];

const matchRR = [10, 17, 11, 18, 13,
15, 12, 13, 2, 9, 16];

function MatchHistory()
{
	const [startIndex, setStartIndex] = useState(0);
	const { handleSFX } = useContext(SoundContext);

	const handlePrev = () => {
		if (startIndex - 4 >= 0)
			setStartIndex(startIndex - 4);
		handleSFX('clic');
	};
	const handleNext = () => {
		if (startIndex + 4 < matchDataNames.length)
			setStartIndex(startIndex + 4);
		handleSFX('clic');
	};
	return (<Container>
				{!matchDataNames.length && <NoConv>No game yet.</NoConv>}
				{matchDataNames.slice(startIndex, startIndex + 4).map((username, index) => (
				<Card key={startIndex + index}>
					<Picture src={Exemple} alt="Picture"/>
					<h2>{playername}</h2>
					<h3 style={{ position: "absolute", top: "50%", left: "20%" }}>{userRR[startIndex + index]}RR</h3>
					<h4 style={{ position: "absolute", top: "10%", left: "37%" }}>Mode: </h4>
					<h3>{matchDataMode[startIndex + index]}</h3>
					<h2 style={{ position: "absolute", top: "0%", left: "50%" }}>{matchDataWinner[startIndex + index] === username ? "Victory" : "Defeat"}</h2>
					<h1>{matchDataScores[startIndex + index]}</h1>
					<h3 style={{ position: "absolute", top: "50%", left: "51%" }}>{matchDataDate[startIndex + index]}</h3>
					<h4 style={{ position: "absolute", top: "10%", left: "65%" }}>Difficulty: </h4>
					<h3>{matchDataDifficulty[startIndex + index]}</h3>
					<h2>{username}</h2>
					<h3 style={{ position: "absolute", top: "50%", left: "80%" }}>{matchRR[startIndex + index]}RR</h3>
					<Picture src={Exemple} alt="Picture"/>
				</Card>))}
				<ButtonContainer>
						{startIndex > 0 && <ChangePage onClick={handlePrev}>{"<"}</ChangePage>}
						{startIndex < matchDataNames.length - 4 && <ChangePage onClick={handleNext}>{">"}</ChangePage>}
				</ButtonContainer>
			</Container>);
}

export default MatchHistory;