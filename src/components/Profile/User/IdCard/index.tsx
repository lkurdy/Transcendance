import { useContext, useState } from "react";
import styled from "styled-components";
import { GameContext } from '../../../../utils/context/GameContext'
import RankInfo from '../../User/RankInfo/'
import ExemplePic from "../../../../assets/images/btn-profile.png"
import PongPioneer from "../../../../assets/images/PongPioneer.png"
import SimpleLegend from "../../../../assets/images/SimpleLegend.png"
import DoubleLegend from "../../../../assets/images/DoubleLegend.png"
import SimpleVeteran from "../../../../assets/images/SimpleVeteran.png"
import DoubleVeteran from "../../../../assets/images/DoubleVeteran.png"
import PongPerfectionist from "../../../../assets/images/PongPerfectionist.png"
import EditBtn from '../../../../assets/images/btn-edit.png'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 2px solid dimgrey;
	border-radius: 5px;
	width: 75%;
	margin: auto;
	text-shadow: 1px 1px 2px dimgrey;
`;

const Public = styled.div`
	display: flex;
	flex-direction: row;
	text-align: center;
`

const Primary = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 20%;
`

const Picture = styled.img`
	height: 15vh;
`

const Edit = styled.button`
	font-size: 1vw;
	padding: 0.1vh;
	width: 2vw;
	background-color: transparent;
	border: none;
`

const Secondary = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40%;
`

const Nickname = styled.h2`
	font-size: 2vw;
`

const EditingNickname = styled.input`
	font-size: 2vw;
	height: 5vh;
	width: 16vw;
	margin-left: 2vw;
	background: transparent;
`

const Rank = styled.div`
	font-size: 1vw;
	padding: 0.2vh;
	width: 5vw;
	background-color: transparent;
	border: 1px solid dimgrey;
	padding: 1vw;
`

const InfoRank = styled.button`
	height: 3vh;
	width: 1.6vw;
	margin-right: 1vw;
	font-size: 1vw;
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 100%;
	text-shadow: 2px 2px 4px dimgrey;
	cursor: pointer;
	background: transparent;
	&:hover{background: rgba(255, 255, 255, 0.2);}
`

const MatchHistory = styled.button`
	width: 50%;
	padding: 1vh;
	margin: 1.5vh;
	font-size: 2vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
`

const Badges = styled.div`
	display: flex;
	flex-direction: column;
	border-left: 2px solid dimgrey;
	width: 40%;
`

const Achievement  = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 15%;
`

const Pictogramme = styled.img`
	width: 20%;
	height: 100%;
	margin-right: 1vw;
`

const Private = styled.div`
	border-top: 1px solid dimgrey;
	padding: 1vh;
`

const PrivateButton = styled.button`
	font-size: 2vh;
	width: 40%;
	padding: 1vh;
	margin: 1vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, transparent, dimgrey);
	&:hover{background: linear-gradient(0turn, transparent, dimgrey);}
`

const achievements = [{picture: PongPioneer, title: "Pong Pioneer", description: "Sign up for the first time.", id: 0},
			{picture: SimpleLegend, title: "Simple Legend", description: "Reach Legend rank in solo mode.", id: 1},
			{picture: DoubleLegend, title: "Double Legend", description: "Attain Legend rank in doubles mode.", id: 2},
			{picture: SimpleVeteran, title: "Simple Veteran", description: "Complete 42 solo games.", id: 3},
			{picture: DoubleVeteran, title: "Double Veteran", description: "Play 42 doubles matches.", id: 4},
			{picture: PongPerfectionist, title: "Pong Perfectionist", description: "Win 11 games with perfect 11-0 scores.", id: 5}];

function IdCard(props: {user: string, isLocal: boolean})
{
	const { status, setStatus } = useContext(GameContext);
	const [ editing, setEditing ] = useState<boolean>(false);
	const [ showIdCard, setShowIdCard ] = useState<boolean>(true);
	const [ declineAuto, setDeclineAuto ] = useState<boolean>(false);
	const [ tfa, setTFA ] = useState<boolean>(false);
	const [ showRankInfo, setShowRankInfo ] = useState<boolean>(false);

	const handleEditPicture = () => {
	}
	const handleEditNickname = () => {
		setEditing(true);
	}
	const handleEditStatus = () => {
		setStatus({activity: status.activity, isInvisible: !status.isInvisible});
	}
	const handleTFA = () => {
		setTFA(!tfa)
	}
	const handleLogout = () => {
	}
	return (<Container>
				<Public>
					<Primary>
						<div>
							<Picture src={ExemplePic} alt="Exemple"/>
							{props.isLocal && <Edit onClick={handleEditPicture}><img style={{height: "2.5vh"}} src={EditBtn}/></Edit>}
						</div>
						<div>
							{!editing && <Nickname>Hamid</Nickname>}
							{!editing && props.isLocal && <Edit onClick={handleEditNickname}><img style={{height: "2.5vh"}} src={EditBtn}/></Edit>}
						</div>
						{editing && props.isLocal && <form method="get" action=""><EditingNickname type="text" autoComplete="off" placeholder="Hamid" maxLength={10}/></form>}
						{<button style={{background: "rgb(25, 25, 25)"}} onClick={handleEditStatus}>{status.isInvisible ? "Invisible" : status.activity}</button>}
						{!props.isLocal && status.activity === "In-Game" && <button>Spectate</button>}
					</Primary>
					<Secondary>
							<h1>ID Card</h1>
							<InfoRank onClick={() => setShowRankInfo(true)}>?</InfoRank>
							<p>Mode :</p>
							<Rank>Simple Adept 32RR 12W-9L</Rank>
							<Rank>Double Adept 13RR 5W-3L</Rank>
						{showRankInfo && <RankInfo setRankInfo={setShowRankInfo}/>}
						<MatchHistory style={{display: props.isLocal ? "none" : "inline-block"}}>Match History</MatchHistory>
					</Secondary>
					<Badges>
						<p>Achievements</p>
						{achievements.map((achievement, index) => (
							<Achievement key={index}>
								<Pictogramme src={achievement.picture} />
								<div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
									<p style={{margin: "0px"}}>{achievement.title}</p>
									<p style={{margin: "0px"}}>{achievement.description}</p>
								</div>
							</Achievement>
						))}
					</Badges>
				</Public>
				<Private style={{ display: props.isLocal ? 'block' : 'none' }}>
					<PrivateButton onClick={() => setShowIdCard(!showIdCard)}>Profile {showIdCard ? 'Public' : 'Private'}</PrivateButton>
					<PrivateButton onClick={handleTFA}>2fa: {tfa ? 'Enable' : 'Disable'}</PrivateButton>
					<PrivateButton onClick={() => setDeclineAuto(!declineAuto)}>Reject Friend Requests: {declineAuto ? 'On' : 'Off'}</PrivateButton>
					<PrivateButton onClick={handleLogout}>Logout</PrivateButton>
				</Private>
			</Container>);
}

export default IdCard;
