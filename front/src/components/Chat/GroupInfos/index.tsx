import styled from "styled-components";
import Exemple from '../../../assets/images/btn-profile.png'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	width: 100%;
`;

const Picture = styled.img`
	height: 10vh;
	width: 5vw;
	margin-top: 2vh;
`;

function GroupInfos(props: {name: string})
{
	return(<Container>
				<Picture src={Exemple}/>
				<button>Edit if admin</button>
				<p>Name</p>
				<button>Edit if admin</button>
				<p>Description</p>
				<button>Edit if admin</button>
				<div style={{display: "flex", flexDirection: "row"}}>
					<Picture src={Exemple}/>
					<p>Member</p>
					<div style={{display: "flex", flexDirection: "column"}}>
						<button>show profile if public</button>
						<button>kick if admin</button>
						<button>ban if admin</button>
					</div>
				</div>
			</Container>);
}

export default GroupInfos;
