import styled from "styled-components";
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './WebsocketContext';
import { GameContext } from "../../../utils/context/GameContext";


const Container = styled.div`
	height: 100%;
	width: 100%;
`

function Matchmaking()
{
	const socket = useContext(WebsocketContext);
	const { dataGame } = useContext(GameContext);

	useEffect(() => {
    socket.on('connect', () => {
		console.log('Connected!');
		socket.emit('gameMode', dataGame.mode! + dataGame.speed);
    });

    socket.on('Match starts soon', (value:any) => {
		dataGame.id = value;
    });

    return () => {
		socket.off('connect');
		socket.off('joinedGame');
    };
	}, []);

	//const move = () => {
    //socket.emit('move', 'w');
	//};
	return (<Container>Pending</Container>);
}

export default Matchmaking;
