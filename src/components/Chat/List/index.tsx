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
	padding-bottom: 1vh;
	background: rgba(25, 25, 25, 1);
`

const NavButton = styled.button`
	height: 20%;
	width: 95%;
	margin-top: 2%;
	font-size: 2vh;
	cursor: pointer;
	border: 1px solid dimgrey;
	border-radius: 5px;
	text-shadow: 2px 2px 4px dimgrey;
	&:hover{opacity: 0.8;}
`;

const TalkList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	text-align: center;
	overflow-y: auto;
	overflow-x: hidden;
	height: 100%;
	width: 100%;
	flex: 1;
`

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
	width: 100%;
	padding: 0.5vh;
	margin-bottom: 0.5vh;
	font-size: 1vh;
	border-top: 2px solid dimgrey;
	border-bottom: 2px solid dimgrey;
	text-shadow: 1px 1px 2px dimgrey;
`;

const Picture = styled.img`
	max-height: 6vh;
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
		newUpdatedChat.splice(index, 1);
		if (chat[index].name === props.talk?.name)
			props.setTalk(undefined);
		chat.splice(index, 1);
		setUpdatedChat(newUpdatedChat);
		if (index < colorIdx)
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
				<TalkList>
					{!updatedChat.length && <NoConv>No private conversations yet.</NoConv>}
					{updatedChat.map((otherTalk, index) => (
						<Card key={index} onMouseEnter={() => setCloseIdx(index)} onMouseLeave={() => setCloseIdx(-1)} onClick={() => handleTalk(index, otherTalk)}
						style={{background: closeIdx === index ? 'rgb(50, 50, 50)' : (colorIdx === index && props.talk !== undefined) ? 'rgb(75, 75, 75)' : 'rgb(25, 25, 25)'}}>
						<Picture src={Exemple} alt="Exemple"/>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<h1 style={{margin: 'auto'}}>{otherTalk.name}</h1>
							<p style={{margin: 'auto', fontSize: '1.6vh'}}>{otherTalk.isGroup ? `${nbUser[index]} / ${maxUser[index]}` : userStatus[index]}</p>
						</div>
						<CloseButton style={{visibility: index === closeIdx ? 'visible' : 'hidden'}} onClick={(event) => handleClose(index, event)}>x</CloseButton>
				</Card>))}
				</TalkList>
			</Container>);
}

export default List;
