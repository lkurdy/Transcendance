import { useContext, useState } from 'react';
import styled from 'styled-components';
import { SoundContext } from '../../../utils/context/SoundContext';
import Exemple from '../../../assets/images/btn-profile.png'
import { ChatContext } from '../../../utils/context/ChatContext';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 25%;
	border-right: 2px solid dimgrey;
`;

const Banner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	width: 100%;
`

const NavButton = styled.button`
	height: 20%;
	width: 95%;
	margin-top: 2%;
	font-size: 1vw;
	cursor: pointer;
	border: 1px solid dimgrey;
	border-radius: 5px;
	text-shadow: 2px 2px 4px dimgrey;
	&:hover{opacity: 0.8;}
`;

const NoConv = styled.p`
	font-size: 1.7vw;
	font-weight: 600;
	text-align: center;
	margin: auto;
`

const Card = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	padding: 3%;
	margin-top: 2.5%;
	font-size: 1vh;
	border-top: 2px solid dimgrey;
	border-bottom: 2px solid dimgrey;
	text-shadow: 1px 1px 2px dimgrey;
`;

const Picture = styled.img`
	max-width: 2.7vw;
`

const CloseButton = styled.button`
	padding: 0.4vh 0.3vw;
	background-color: transparent;
	&:hover{background: rgba(100, 100, 100, 0.5)}
	border: none;
	border-radius: 100%;
	text-shadow: 2px 2px 4px black;
	font-size: 1vw;
	width: 10%;
`

const Footer = styled.div`
	margin-top: auto;
	display: flex;
	justify-content: center;
`;

const ChangePage = styled.button`
	font-size: 2vh;
	display: block;
	margin: 1vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px dark;
	background: linear-gradient(0.5turn, grey, dimgrey);
	&:hover{background: linear-gradient(0turn, grey, dimgrey);}
	cursor: pointer;
	@media all and (min-height: 732px) and (max-width: 1270px){
		font-size: 1.4vh;
	}
`;

const chat = [{name: "user 1", isGroup: false}];
for (let i = 1; i <= 13; i++)
	Math.floor(Math.random() * 11) % 2 === 0 ? chat.push({name: `user ${i + 1}`, isGroup: false}) : chat.push({name: `group ${i + 1}`, isGroup: true});

const status = ["online", "offline", "in-Game"]
const userStatus = ["online"];
for (let i = 1; i <= 13; i++)
{
	if (chat[i].isGroup === false)
		userStatus.push(status[Math.floor(Math.random() * 3)]);
	else if (chat[i].isGroup === true)
		userStatus.push("isGroup");
}
const nbUser = [5];
for (let i = 2; i <= 30; i++)
	nbUser.push(Math.floor(Math.random() * (10 - 2)) + 1);
const maxUser = [8];
for (let i = 2; i <= 30; i++)
	maxUser.push(Math.floor(Math.random() * (10 - nbUser[i] + 1) + nbUser[i] + 1));

function List(props: {talk?: {name:string, isGroup: boolean}, setTalk: (value?: {name:string, isGroup: boolean}) => void, tab: string, setTab: (value: string) => void})
{
	const [startIndex, setStartIndex] = useState(0);
	const { handleSFX } = useContext(SoundContext);
	const [ closeIdx, setCloseIdx ] = useState(-1);
	const [ colorIdx, setColorIdx ] = useState(-1);
	const [ updatedChat, setUpdatedChat ] = useState([...chat]);
	const {setShowGroupInfo, setShowIdCard } = useContext(ChatContext);

	const handleBanner = (type: string) => {
		if (props.tab !== type)
		{
			props.setTab(type)
			props.setTalk(undefined);
			handleSFX('clic');
		}
	}
	const handlePrev = () => {
		if (startIndex - 6 >= 0)
			setStartIndex(startIndex - 6);
		handleSFX('clic');
	};
	const handleNext = () => {
		if (startIndex + 6 < chat.length)
			setStartIndex(startIndex + 6);
		handleSFX('clic');
	};
	const handleTalk = (index: number, otherTalk?: {name:string, isGroup: boolean}) => {
		if (props.talk?.name !== otherTalk?.name)
		{
			setColorIdx(index);
			if (otherTalk !== undefined)
				props.setTalk({name: otherTalk.name, isGroup: otherTalk.isGroup});
			setShowGroupInfo(false);
			setShowIdCard(false);
			handleSFX('clic');
		}
	}
	const handleClose = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.stopPropagation();
		const newUpdatedChat = [...updatedChat];
		newUpdatedChat.splice(startIndex + index, 1);
		if (startIndex - 6 >= 0 && startIndex >= newUpdatedChat.length && newUpdatedChat.length > 0)
			setStartIndex(Math.max(0, newUpdatedChat.length - 6));
		if (chat[startIndex + index].name === props.talk?.name)
			props.setTalk(undefined);
		chat.splice(startIndex + index, 1);
		setUpdatedChat(newUpdatedChat);
		if (startIndex + index < colorIdx)
			setColorIdx(colorIdx - 1);
		handleSFX('goBack');
	}
	return (<Container>
				<Banner>
						<NavButton onClick={() => handleBanner("join")} style={{background: (props.talk === undefined && props.tab === "join") ? 'rgb(50, 50, 50)' : 'rgb(25, 25, 25)'}}>Join</NavButton>
						<NavButton onClick={() => handleBanner("create")} style={{background: (props.talk === undefined && props.tab === "create") ? 'rgb(50, 50, 50)' : 'rgb(25, 25, 25)'}}>Create</NavButton>
						<NavButton onClick={() => handleBanner("search")} style={{background: (props.talk === undefined && props.tab === "search") ? 'rgb(50, 50, 50)' : 'rgb(25, 25, 25)'}}>Search</NavButton>
						<NavButton onClick={() => handleBanner("add")} style={{background: (props.talk === undefined && props.tab === "add") ? 'rgb(50, 50, 50)' : 'rgb(25, 25, 25)'}}>Add</NavButton>
				</Banner>
				{!updatedChat.length && <NoConv>No private conversations yet.</NoConv>}
				{updatedChat.slice(startIndex, startIndex + 6).map((otherTalk, index) => (
					<Card key={startIndex + index} onMouseEnter={() => setCloseIdx(startIndex + index)} onMouseLeave={() => setCloseIdx(-1)} onClick={() => handleTalk(startIndex + index, otherTalk)}
					style={{background: closeIdx === startIndex + index ? 'rgb(50, 50, 50)' : (colorIdx === startIndex + index && props.talk !== undefined) ? 'rgb(75, 75, 75)' : 'rgb(25, 25, 25)'}}>
					<Picture src={Exemple} alt="Exemple"/>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<h1 style={{margin: 'auto'}}>{otherTalk.name}</h1>
						<p style={{margin: 'auto', fontSize: '0.8vw'}}>{otherTalk.isGroup ? `${nbUser[startIndex + index]} / ${maxUser[startIndex + index]}` : userStatus[startIndex + index]}</p>
					</div>
					<CloseButton style={{visibility: startIndex + index === closeIdx ? 'visible' : 'hidden'}} onClick={(event) => handleClose(index, event)}>x</CloseButton>
				</Card>))}
				<Footer>
					{startIndex > 0 && <ChangePage onClick={handlePrev}>{"<"}</ChangePage>}
					{startIndex < updatedChat.length - 6 && <ChangePage onClick={handleNext}>{">"}</ChangePage>}
				</Footer>
			</Container>);
}

export default List;
