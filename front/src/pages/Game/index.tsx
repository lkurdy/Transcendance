import { useEffect, useContext } from 'react';
import Pong from '../../components/Game/Pong/';
import { StyledContainer } from '../../utils/styles/Atoms.tsx'
import { GameContext } from '../../utils/context/GameContext/';
import ModeMenu from '../../components/Game/ModeMenu/';
import EndGame from '../../components/Game/EndGame/';
import Matchmaking from '../../components/Game/Matchmaking/'

function Game()
{
	const { status, dataGame, scores } = useContext(GameContext);

	useEffect(() => {
		const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
		document.title = 'Game - ft_transcendence';
		const contextMenuListener: EventListener = (e) => handleContextMenu(e as unknown as React.MouseEvent);
		document.addEventListener('contextmenu', contextMenuListener);
		return () => document.removeEventListener('contextmenu', contextMenuListener);
	}, []);
	console.log(status.activity);
	return (
			<StyledContainer>
				{status.activity === "Online" && <ModeMenu />}
				{status.activity === "In Matchmaking" && dataGame.mode === "online" && <Matchmaking />}
				{status.activity === "In Game" && dataGame.mode !== "online" && <Pong />}
				{status.activity === "In Game" && (scores.x === 11 || scores.y === 11) && <EndGame />}
			</StyledContainer>
	);
}

export default Game;
