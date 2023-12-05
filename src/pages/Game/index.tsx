import { useEffect, useContext } from 'react';
import Pong from '../../components/Game/Pong/';
import { StyledContainer } from '../../utils/styles/Atoms.tsx'
import { GameContext } from '../../utils/context/GameContext/';
import ModeMenu from '../../components/Game/ModeMenu/';
import EndGame from '../../components/Game/EndGame/';

function Game()
{
	const { status, dataGame, scores } = useContext(GameContext);

	useEffect(() => {
		document.title = 'Game - ft_transcendence';
		const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
		const contextMenuListener: EventListener = (e) => handleContextMenu(e as unknown as React.MouseEvent);
		document.addEventListener('contextmenu', contextMenuListener);
		return () => document.removeEventListener('contextmenu', contextMenuListener);
	}, []);
	
	return (
			<StyledContainer>
				{status.activity === "Online" && <ModeMenu />}
				{status.activity !== "Online" && <Pong />}
				{status.activity === "In Game" && dataGame.mode !== "training" && (scores.x === 11 || scores.y === 11) && <EndGame />}
			</StyledContainer>
	);
}

export default Game;
