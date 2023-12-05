import styled from "styled-components";
import CreateInfo from '../CreateInfo'
import { useContext, useEffect, useState } from "react";
import { SoundContext } from "../../../utils/context/SoundContext";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 2px solid dimgrey;
	padding: 1vh 0vw;
	height: 50%;
	width: 100%;
`

const StyledForm = styled.form`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
`

const StyledInput = styled.input`
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 1px solid dimgrey;
	border-radius: 10px;
	width: 90%;
	height: 40%;
	font-size: 2vh;
	margin: 10px;
	text-align: center;
`

const GroupName = styled.input`
	width: 17%;
	margin: auto;
	margin-right: 0%;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border-radius: 10px;
	font-size: 1vw;
	text-align: center;
`

const Password = styled.input`
	width: 50%;
	margin: auto;
	margin-right: 0%;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 1px solid dimgrey;
	border-radius: 10px;
	font-size: 1vw;
	text-align: center;
`

const Capacity = styled.input`
	width: 13%;
	margin: auto;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 1px solid dimgrey;
	border-radius: 10px;
	font-size: 1vw;
	text-align: center;
`;

const Description = styled.input`
	width: 82%;
	margin-top: 1vh;
	background: linear-gradient(0.5turn, rgb(50, 50, 50, 0.95), rgb(25, 25, 25, 0.95));
	border: 1px solid dimgrey;
	border-radius: 10px;
	font-size: 1vw;
	text-align: center;
`

const Confirm = styled.button`
	font-size: 0.8vw;
	padding: 1vh 0.5vw;
	margin: auto;
	margin-right: 1vw;
	border: 2px solid rgb(75, 75, 75, 0.95);
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	cursor: pointer;
	background: linear-gradient(0.5turn, dimgrey, rgb(25, 25, 25, 0.95));
	&:hover{background: linear-gradient(0turn, dimgrey, rgb(25, 25, 25, 0.95));}
`

const Info = styled.button`
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

interface FormData {
	name: string;
	password: string;
	capacity: number;
	description: string;
}

function Banner(props: {type: string})
{
	const [formData, setFormData] = useState<FormData>({name: '', password: '', capacity: 0, description: ''});
	const [isValid, setIsValid] = useState({name: true, password: true, capacity: true, description: true});
	const [grpInfo, setGrpInfo] = useState(false);
	const { handleSFX } = useContext(SoundContext);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter')
			e.preventDefault();
	};
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (formData.name && formData.name.length > 1 && (formData.capacity || props.type === "join") && (!formData.password || formData.password && formData.password.length > 3) && (!formData.description || formData.description && formData.description.length > 5))
		{
			handleSFX('clic');
			setIsValid({name: true, password: true, capacity: true, description: true});
		}
		else
		{
			if (!formData.name || formData.name.length < 2)
				setIsValid((prevState) => ({ ...prevState, name: false }));
			else
				setIsValid((prevState) => ({ ...prevState, name: true }));
			if (formData.password && formData.password.length < 4)
				setIsValid((prevState) => ({ ...prevState, password: false }));
			else
				setIsValid((prevState) => ({ ...prevState, password: true }));
			if (!formData.capacity)
				setIsValid((prevState) => ({ ...prevState, capacity: false }));
			else
				setIsValid((prevState) => ({ ...prevState, capacity: true }));
			if (formData.description && formData.description.length < 6)
				setIsValid((prevState) => ({ ...prevState, description: false }));
			else
				setIsValid((prevState) => ({ ...prevState, description: true }));
			handleSFX('goBack');
		}
	}
	const handleInfo = () => {
		setGrpInfo(true);
		handleSFX('clic');
	}
	useEffect(() => {
		setFormData({ name: '', password: '', capacity: 0, description: '' });
		setIsValid({ name: true, password: true, capacity: true, description: true });
	}, [props.type]);
	return (<Container>
				{props.type === "search" && <StyledForm method="get" action="">
					<StyledInput type="text" name="search" autoComplete="off" placeholder="Search Talk" minLength={2} maxLength={10}></StyledInput>
				</StyledForm>}
				{props.type === "add" && <StyledForm method="get" action="">
					<StyledInput type="text" name="add" autoComplete="off" placeholder="Add Friend" minLength={2} maxLength={10}></StyledInput>
				</StyledForm>}
				{props.type === "create" && <StyledForm onSubmit={handleSubmit} method="get" action="" noValidate>
					<div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%"}}>
						<div style={{display: "flex", alignItems: "center", width: "100%", height: "100%"}}>
							<GroupName type='text' name='name' autoComplete="off" placeholder="Group Name" minLength={2} maxLength={10} onChange={handleInputChange} onKeyDown={handleKeyDown} style={{ border: `1px solid ${isValid.name ? "dimgrey" : "lightgrey"}`}} required/>
							<Password type='password' name='password' autoComplete="off" placeholder="Password" minLength={4} maxLength={30} onChange={handleInputChange} onKeyDown={handleKeyDown} style={{ border: `1px solid ${isValid.password ? "dimgrey" : "lightgrey"}`}}/>
							<Capacity type='number' name='capacity' autoComplete="off" placeholder="Capacity" min={2} max={10} onChange={handleInputChange} onKeyDown={(e) => e.preventDefault()} style={{ border: `1px solid ${isValid.capacity ? "dimgrey" : "lightgrey"}`}}></Capacity>
						</div>
						<Description type='text' name='description' autoComplete="off" placeholder="Description" minLength={6} maxLength={50} onChange={handleInputChange} onKeyDown={handleKeyDown} style={{ border: `1px solid ${isValid.description ? "dimgrey" : "lightgrey"}`}}/>
					</div>
					<Confirm type="submit">Create</Confirm>
				</StyledForm>}
				{props.type === "create" && <Info onClick={handleInfo}>?</Info>}
				{props.type === "create" && grpInfo && <CreateInfo setInfo={setGrpInfo}/>}
				{props.type === "join" && <StyledForm onSubmit={handleSubmit} method="get" action="" style={{height: "100%", width: "100%"}} noValidate>
					<div style={{display: "flex", alignItems: "center", width: "100%", height: "100%"}}>
						<StyledInput type='text' name='name' autoComplete="off" placeholder="Group Name" minLength={2} maxLength={10} onChange={handleInputChange} onKeyDown={handleKeyDown}  style={{ border: `1px solid ${isValid.name ? "dimgrey" : "lightgrey"}`}} required/>
						<StyledInput type='password' name='password' autoComplete="off" placeholder="Password" minLength={4} maxLength={30} onChange={handleInputChange} onKeyDown={handleKeyDown} style={{ border: `1px solid ${isValid.password ? "dimgrey" : "lightgrey"}`}} />
					</div>
					<Confirm type="submit">Join</Confirm>
				</StyledForm>}
			</Container>)
}

export default Banner;
