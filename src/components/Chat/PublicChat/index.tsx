import { useContext, useState } from 'react';
import styled from 'styled-components';
import Banner from '../Banner/';
import { SoundContext } from '../../../utils/context/SoundContext';
import Exemple from '../../../assets/images/btn-profile.png'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 75%;
`;

const Card = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	padding: 0.5vh;
	margin: 0.5vh 1.5vw;
	font-size: 1.5vh;
	border: 2px solid dimgrey;
	border-radius: 5px;
	text-shadow: 1px 1px 2px dimgrey;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
`;

const Element = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	text-align: center;
	height: 100%;
`

const Picture = styled.img`
	height: 6vh;
`

const StyledButton = styled.button`
	font-size: 0.8vw;
	padding: 0.6vh 0.4vw;
	margin: auto;
	margin-right: 1vw;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, dimgrey, rgb(25, 25, 25, 0.95));
	&:hover{background: linear-gradient(0turn, dimgrey, rgb(25, 25, 25, 0.95));}
`

const Footer = styled.div`
	margin-top: auto;
	display: flex;
	justify-content: center;
`;

const ChangePage = styled.button`
	font-size: 2vh;
	display: block;
	margin-top: 2.5vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px dark;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
	cursor: pointer;
	@media all and (min-height: 732px) and (max-width: 1270px){
		font-size: 1.4vh;
	}
	margin: 10px;
`;

const groups = ["name 1"];
for (let i = 2; i <= 30; i++)
	groups.push("name " + i);
const status = ["Ici c'est pas riz", "Hang out and chat with others in this room!", "Wesh alors, wesh aloooors"]
const groupsStatus = ["Hang out and chat with others in this room!"];
for (let i = 2; i <= 30; i++)
	groupsStatus.push(status[Math.floor(Math.random() * 3)]);
const nbUser = [5];
for (let i = 2; i <= 30; i++)
	nbUser.push(Math.floor(Math.random() * (10 - 2)) + 1);
const maxUser = [8];
for (let i = 2; i <= 30; i++)
	maxUser.push(Math.floor(Math.random() * (10 - nbUser[i] + 1) + nbUser[i] + 1));

function PublicChat(props: {tab: string})
{
	const [startIndex, setStartIndex] = useState(0);
	const { handleSFX } = useContext(SoundContext);

	const handlePrev = () => {
		if (startIndex - 6 >= 0)
			setStartIndex(startIndex - 6);
		handleSFX('clic');
	};
	const handleNext = () => {
		if (startIndex + 6 < groups.length)
			setStartIndex(startIndex + 6);
		handleSFX('clic');
	};
	return (<Container>
				<Banner type={props.tab}/>
				{groups.slice(startIndex, startIndex + 6).map((name, index) => (
					<Card key={startIndex + index}>
						<Element style={{width: "20%"}}>
							<Picture src={Exemple}/>
						</Element>
						<Element style={{width: "20%"}}>
							<h1>{name}</h1>
						</Element>
						<Element style={{width: "40%"}}>
							<p style={{ overflowWrap: "break-word", maxWidth: "100%"}}>{groupsStatus[startIndex + index]}</p>
						</Element>
						<Element style={{width: "10%"}}>
							<StyledButton>Join</StyledButton>
						</Element>
						<Element style={{width: "10%"}}>
							<p style={{ fontSize: "1vw"}}>{nbUser[startIndex + index]} / {maxUser[startIndex + index]}</p>
						</Element>
					</Card>))}
				<Footer>
					{startIndex > 0 && <ChangePage onClick={handlePrev}>{"<"}</ChangePage>}
					{startIndex < groups.length - 6 && <ChangePage onClick={handleNext}>{">"}</ChangePage>}
				</Footer>
			</Container>);
}

export default PublicChat;

// description par defaut : Hang out and chat with others in this room!
