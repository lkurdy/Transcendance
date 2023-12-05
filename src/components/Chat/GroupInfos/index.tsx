import styled from "styled-components";
import Exemple from '../../../assets/images/btn-profile.png'
import Edit from '../../../assets/images/btn-edit.png'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 87%;
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	text-align: center;
	justify-content: space-evenly;
	width: 100%;
	height: 15%;
`

const Duo = styled.div`
	display: flex;
	flex-direction: row;
	align-items: end;
`

const Picture = styled.img`
	height: 6vh;
	width: 3vw;
	margin-top: 2vh;
`;

const StyledButton = styled.button`
	font-size: 0.6vw;
	padding: 0px;
	height: 4vh;
	margin-right: 1vw;
	border: 1px solid transparent;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, rgb(50, 50, 50), rgb(25, 25, 25));
	&:hover{background: linear-gradient(0turn, rgb(50, 50, 50), rgb(25, 25, 25));}
`

const UserContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 75%;
	height: 100%;
`

const users = ["user 1"];
for (let i = 2; i <= 10; i++)
	users.push("user " + i);

function GroupInfos(props: {name: string})
{
	return(<Container>
				<Content>
					<Duo>
					<h1>Hang out and chat with others in this room!</h1>
					<StyledButton><img style={{height: "2.5vh"}} src={Edit}/></StyledButton>
					<h1>2/4</h1>
					<StyledButton><img style={{height: "2.5vh"}} src={Edit}/></StyledButton>
					</Duo>
				</Content>
				<Content style={{height: "85%"}}>
					<UserContainer>
						{users.map((username, index) => (
						<div style={{display: "flex", flexDirection: "row", width: "50%"}} key={index}>
							<Picture src={Exemple}/>
							<p>{users[index]}</p>
							<StyledButton>Add/Send Msg</StyledButton>
							<StyledButton>show id card</StyledButton>
							<StyledButton>kick</StyledButton>
							<StyledButton>ban</StyledButton>
							<StyledButton>...</StyledButton>
						</div>))}
					</UserContainer>
				</Content>
			</Container>);
}

export default GroupInfos;
