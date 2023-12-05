import styled from "styled-components";
import { useContext, useState } from "react";
import useWindowSize from "../../../utils/hooks/WindowSize/useWindowSize";
import { SoundContext } from "../../../utils/context/SoundContext";
import Exemple from "../../../assets/images/btn-profile.png"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 2vh;
`;

const CardContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	height: 55vh;
	margin-top: 5px;
`;

const NoConv = styled.p`
	font-size: 1.7vw;
	font-weight: 600;
	text-align: center;
	margin: auto;
`

const Card = styled.div`
	padding: 1.5vw;
	margin: 0.5vw;
	border: 2px solid dimgrey;
	border-radius: 5px;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	text-shadow: 1px 1px 2px dimgrey;
`;

const Picture = styled.img`
	height: 10vh;
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

const friendsData = ["nickname 1", "nickname 2", "nickname 3", "nickname 4", "nickname 5",
	"nickname 6", "nickname 7", "nickname 8", "nickname 9", "nickname 10", "nickname 11"];

function Friends() {
	const inner = useWindowSize();
	const [startIndex, setStartIndex] = useState(0);
	const { handleSFX } = useContext(SoundContext);

	const handlePrev = () => {
		if (startIndex - ((inner.x < 640 || inner.x < 1060) ? 2 : 4) >= 0)
			setStartIndex(startIndex - ((inner.x < 640 || inner.x < 1060) ? 2 : 4));
		handleSFX('clic');
	};
	const handleNext = () => {
		if (startIndex + ((inner.x < 640 || inner.x < 1060) ? 2 : 4) < friendsData.length)
			setStartIndex(startIndex + ((inner.x < 640 || inner.x < 1060) ? 2 : 4));
		handleSFX('clic');
	};
	return (
		<Container>
			<CardContainer>
				{!friendsData.length && <NoConv>No friends yet.</NoConv>}
				{friendsData.slice(startIndex, startIndex + ((inner.x < 640 || inner.x < 1060) ? 2 : 4)).map((friend, index) => (
				<Card key={startIndex + index}>
					<Picture src={Exemple} alt="Picture"/>
					<h3>{friend}</h3>
					online/offline/inGame<br />
					<button style={{display: "inline-block"}}>Spectate</button>
					show profile<br />
					remove friend<br />
					block friend
				</Card>))}
			</CardContainer>
			<Footer>
				<form method="get" action="" style={{display: friendsData.length > 4 ? 'block' : 'none' }}>
					<StyledInput type="text" name="search" autoComplete="off" placeholder="Search Friend" minLength={2} maxLength={10}></StyledInput>
				</form>
				<ButtonContainer>
					{startIndex > 0 && <ChangePage onClick={handlePrev}>{"<"}</ChangePage>}
					{startIndex < friendsData.length - ((inner.x < 640 || inner.x < 1060) ? 2 : 4) && <ChangePage onClick={handleNext}>{">"}</ChangePage>}
				</ButtonContainer>
				<form method="get" action="">
					<StyledInput type="text" name="add" autoComplete="off" placeholder="Add Friend" minLength={2} maxLength={10}></StyledInput>
				</form>
			</Footer>
		</Container>
	);
}

export default Friends;