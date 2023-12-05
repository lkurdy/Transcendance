import styled from "styled-components";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 5px;
`;

const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 2px solid dimgrey;
	border-radius: 5px;
	background-color: rgb(25, 25, 25, 0.95);
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	font-size: 1.5vw;
	padding: 0.5vw;
`

const CloseButton = styled.button`
	background: linear-gradient(0.5turn, dimgrey, rgb(25, 25, 25, 0.95));
	&:hover{background: linear-gradient(0turn, dimgrey, rgb(25, 25, 25, 0.95));}
	border-radius: 5px;
	text-shadow: 2px 2px 4px black;
	font-size: 1vw;
	width: 15%;
`

function RankInfo(props: {setRankInfo: (value: boolean) => void})
{
	return (<Overlay><Container>
				<table>
					<caption style={{padding: '0.5vw'}}>All Ranks</caption>
					<tbody>
						<tr>
							<th style={{padding: '0.5vw'}}>Name</th>
							<th style={{padding: '0.5vw'}}>Rookie</th>
							<th style={{padding: '0.5vw'}}>Novice</th>
							<th style={{padding: '0.5vw'}}>Adept</th>
							<th style={{padding: '0.5vw'}}>Master</th>
							<th style={{padding: '0.5vw'}}>Legend</th>
						</tr>
						<tr>
							<td style={{padding: '0.5vw'}}>Win</td>
							<td style={{padding: '0.5vw'}}>+4</td>
							<td style={{padding: '0.5vw'}}>+3</td>
							<td style={{padding: '0.5vw'}}>+3</td>
							<td style={{padding: '0.5vw'}}>+2</td>
							<td style={{padding: '0.5vw'}}>+1</td>
						</tr>
						<tr>
							<td style={{padding: '0.5vw'}}>Loose</td>
							<td style={{padding: '0.5vw'}}>-0</td>
							<td style={{padding: '0.5vw'}}>-1</td>
							<td style={{padding: '0.5vw'}}>-2</td>
							<td style={{padding: '0.5vw'}}>+3</td>
							<td style={{padding: '0.5vw'}}>-3</td>
						</tr>
						<tr>
							<td style={{padding: '0.5vw'}}>RR</td>
							<td style={{padding: '0.5vw'}}>0-10</td>
							<td style={{padding: '0.5vw'}}>10-20</td>
							<td style={{padding: '0.5vw'}}>20-30</td>
							<td style={{padding: '0.5vw'}}>30-40</td>
							<td style={{padding: '0.5vw'}}>40-50</td>
						</tr>
					</tbody>
				</table>
				<CloseButton onClick={() => props.setRankInfo(false)}>Close</CloseButton>
			</Container></Overlay>);
}

export default RankInfo;
