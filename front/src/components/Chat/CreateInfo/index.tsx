import { useState, useContext } from "react";
import styled from "styled-components";
import { SoundContext } from "../../../utils/context/SoundContext";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
`;

const Card = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40%;
	height: 35%;
	border-radius: 5px;
	background-color: rgb(25, 25, 25, 0.95);
	z-index: 10;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 3vh;
	margin-bottom: 50px;
	text-shadow: 2px 2px 4px black;
	padding-bottom: 15px;
`;

const Text = styled.p`
	font-size: 2.2vh;
`

const LineBreak = styled.span`
	display: block;
	margin-bottom: 10px;
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

function CreateInfo(props: {setInfo: (value: boolean) => void})
{
	const [okayPressed, setOkayPressed] = useState(false);
	const { handleSFX } = useContext(SoundContext);

	const handleGoBack = () => {
		props.setInfo(false);
		setOkayPressed(true);
		handleSFX("goBack");
	}
	if (okayPressed)
		return (null);
	return (<Overlay><Card>
				<Text>
					- Group Name: Required, 2 to 10 characters.<LineBreak />
					- Password: Optional, 4 to 30 characters.<LineBreak />
					- Capacity: Required, 1 to 10 users.<LineBreak />
					- Description: Optional, 6 to 50 characters.<LineBreak />
					We wish you an enjoyable chat experience!
				</Text>
				<StyledButton onClick={handleGoBack}>Okay</StyledButton>
			</Card></Overlay>);
}

export default CreateInfo;
