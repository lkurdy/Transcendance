import styled from 'styled-components';
import { useContext, useState, useRef, useEffect } from 'react';
import { SoundContext } from '../../../utils/context/SoundContext';
import Warning from '../../Warning';
import GroupInfos from '../GroupInfos';
import IdCard from '../../../components/Profile/User/IdCard';
import { ChatContext } from '../../../utils/context/ChatContext';
import Exemple from '../../../assets/images/btn-profile.png'
import Edit from '../../../assets/images/btn-edit.png'

const Containers = styled.div`
	display: flex;
	flex-direction: column;
	width: 75%;
`;

const Banner = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-bottom: 2px solid dimgrey;
	height: 13%;
	width: 100%;
`

const Picture = styled.img`
	height: 7vh;
	width: 3.5vw;
	margin-right: -2vw;
	&:hover{opacity: 0.5}
`;

const Name = styled.p`
	font-size: 2vw;
	font-weight: 500;
	&:hover{opacity: 0.5}
	cursor: pointer;
`

const StyledButton = styled.button`
	height: 50%;
	padding: 0.6vh 0.5vw;
	font-size: 1vw;
	border: 1px solid rgb(75, 75, 75, 0.95);
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, dimgrey, rgb(25, 25, 25, 0.95));
	&:hover{background: linear-gradient(0turn, dimgrey, rgb(25, 25, 25, 0.95));}
`

const StyledFrom = styled.form`
	display: flex;
	border-top: 2px solid dimgrey;
	height: 10%;
	width: 100%;
`

const StyledInput = styled.input`
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 2px solid dimgrey;
	border-radius: 10px;
	width: 100%;
	font-size: 2vh;
	margin: 10px;
	text-align: center;
`

const Chat = styled.div`
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

const ChatContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0.5vh 1.5vw;
	padding-left: 0.5vw;
	margin: 0.5vh 1.5vw;
	border: 2px solid dimgrey;
	border-radius: 5px;
	text-shadow: 1px 1px 2px dimgrey;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	max-width: 91%;
`;

const MessageContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	max-width: 100%;
`

const Text = styled.p`
	font-size: 1vw;
	margin: 0.5vh 0.5vw;
	overflow-wrap: break-word;
	max-width: 95%;
`

const userChat = [{username: "Hamid", msg: "msg 1", isBlocked: false, isInvite: false, opponent: "", gameStatus: ""}];
for (let i = 2; i <= 15; i++)
{
	if (i !== 10)
		userChat.push({username: "Hamid", msg: `msg ${i}`, isBlocked: false, isInvite: false, opponent: "", gameStatus: ""});
	else
		userChat.push({username: "Hamid", msg: `msg ${i}`, isBlocked: false, isInvite: true, opponent: "Guillaume", gameStatus: "Pending"});
} 
//si c'est 2 fois la meme personne d'affilé qui envoie un message, concaténer les 2

function Talk(props: {talk?: {name:string, isGroup: boolean}, setTalk: (value?: {name:string, isGroup: boolean}) => void})
{
	const [ showWarning, setShowWarning ] = useState<string | undefined>(undefined);
	const { handleSFX } = useContext(SoundContext);
	const { showGroupInfo, setShowGroupInfo, showIdCard, setShowIdCard } = useContext(ChatContext);
	const chatRef = useRef<HTMLDivElement>(null);

	const handleGoBack = () => {
		props.setTalk(undefined);
		handleSFX('goBack');
	}
	const handleEdit = (value: string) => {
		console.log(value, "to edit");
	}
	const handleDisplayWarning = (type: string) => {
		setShowWarning(type);
		handleSFX('clic');
	}
	const handleShowInfo = () => {
		if (props.talk?.isGroup)
			setShowGroupInfo(!showGroupInfo);
		else
		setShowIdCard(!showIdCard);
		handleSFX('clic');
	}
	const scrollToBottom = () => {
		if (chatRef.current)
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
	};
	useEffect(() => {
		scrollToBottom();
	}, [props]);

	const style = { fontSize: "2vw", marginLeft: "-2vw", 'hover': {opacity: "0.5"} };
	return (<Containers>
				<Banner>
					<StyledButton onClick={handleGoBack}>Go back</StyledButton>
					<Picture onClick={() => handleEdit("picture")} src={Exemple}/>
					<Name onClick={() => handleEdit("picture")} style={style}>{props.talk?.name}</Name>
					<StyledButton onClick={handleShowInfo}>{showGroupInfo || showIdCard ? "Hide" : "Show"} {props.talk?.isGroup ? "Infos" : "ID Card"}</StyledButton>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						{!props.talk?.isGroup && <StyledButton onClick={() => handleDisplayWarning("remove")} style={{marginBottom: "0.5vh"}}>Remove</StyledButton>}
						{!props.talk?.isGroup && <StyledButton onClick={() => handleDisplayWarning("block")}>Block</StyledButton>}
						{props.talk?.isGroup && <StyledButton onClick={() => handleDisplayWarning("leave")}>Leave</StyledButton>}
						{showWarning !== undefined && <Warning name={props.talk!.name} warningType={showWarning} setDisplay={setShowWarning}/>}
					</div>
				</Banner>
				{showGroupInfo && <GroupInfos name={props.talk!.name}/>}
				{showIdCard && <IdCard user={props.talk!.name} isLocal={false}/>}
				{!showIdCard && !showGroupInfo && <Chat ref={chatRef} style={{justifyContent: userChat.length > 9 ? "start" : "end"}}>
					{userChat.map((name, index) =>
						<ChatContent key={index}>
							<img src={Exemple} style={{width: "2vw", height: "4vh", marginRight: "0.75vw"}}/>
							<MessageContent>
								<Text style={{marginBottom: "-0.2vh"}}>{userChat[index].username}</Text>
								<Text style={{fontSize: "0.8vw"}}>{userChat[index].msg}</Text>
							</MessageContent>
						</ChatContent>
					)}
				</Chat>}
				{!showIdCard && !showGroupInfo && <StyledFrom method="get" action="">
					<StyledInput type="text" name="msg" autoComplete="off" placeholder={`Send a message to ${props.talk?.name}`} maxLength={120}></StyledInput>
				</StyledFrom>}
			</Containers>);
}

export default Talk;
