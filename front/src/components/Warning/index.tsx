import styled from "styled-components";
import { useContext, useState } from "react";
import { SoundContext } from "../../utils/context/SoundContext";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 5px;
`;

const Card = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40%;
	height: 35%;
	border-radius: 5px;
	background: rgb(10, 10, 10);
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-bottom: 50px;
	text-shadow: 2px 2px 4px black;
	padding: 1vw;
`;

const Title = styled.h3`
	font-size: 2.5vh;
	margin-bottom: 0px;
`

const Text = styled.p`
	font-size: 2vh;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const StyledButton = styled.button`
	width: 30%;
	padding: 5px;
	margin: 5px;
	font-size: 2vh;
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, dimgrey, rgb(25, 25, 25, 0.95));
	&:hover{background: linear-gradient(0turn, dimgrey, rgb(25, 25, 25, 0.95));}
`;

function Warning(props: {name: string, warningType?: string, setDisplay: (value?: string) => void})
{
	const { handleSFX } = useContext(SoundContext);
	const [okayPressed, setOkayPressed] = useState(false);

	const handleClick = () => {
		if (props.warningType === "remove")
			console.log("remove");
		else if (props.warningType === "block")
			console.log("block");
		else if (props.warningType === "leave")
			console.log("leave");
		props.setDisplay(undefined);
		setOkayPressed(true);
		handleSFX("clic");
	}
	const handleGoBack = () => {
		props.setDisplay(undefined);
		setOkayPressed(true);
		handleSFX("goBack");
	}
	if (okayPressed)
		return (null);
	return (<Overlay><Card>
				{props.warningType === "remove" && <Title>Remove {props.name}?</Title>}
				{props.warningType === "remove" && <Text>Are you sure to permanently remove {props.name} from your friends list?</Text>}
				{props.warningType === "block" && <Title>Block {props.name}?</Title>}
				{props.warningType === "block" && <Text>Are you sure to block {props.name}?<br />Blocking this user will also remove them from your friends list if this is the case.</Text>}
				{props.warningType === "leave" && <Title>Leave {props.name}?</Title>}
				{props.warningType === "leave" && <Text>Are you sure you want to leave {props.name}?<br />You will not be able to return to this group if it is private and you do not have the password.</Text>}
				<ButtonContainer>
					{<StyledButton onClick={handleGoBack}>No</StyledButton>}
					{<StyledButton onClick={handleClick}>Yes</StyledButton>}
				</ButtonContainer>
			</Card></Overlay>);
}

export default Warning;
