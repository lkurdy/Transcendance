import { useState, useEffect, useMemo, useContext } from 'react';
import useResize from '../../../utils/hooks/Pong/useResize.ts'
import { GameContext } from '../../context/GameContext/index.tsx';

function usePaddleRight(inner: {x: number, y: number}, isSecondPaddles: boolean)
{
	const { dataGame } = useContext(GameContext);
	const [paddleRight, setPaddleRight] = useState({ x: inner.x * (isSecondPaddles ? 0.233 : 0.739) - inner.y * 0.10,
		y: dataGame!.mode === "training" ? inner.y * 0.5 : inner.y * 0.273});
	const mouseBox = useMemo(() => ({top: inner.y * 0.25, bot: inner.y * 0.825, left: inner.x * 0.5, right: inner.x * 0.875}), [inner]);

	useResize(paddleRight, setPaddleRight);
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) =>
		{
			if (dataGame.mode === "local" && event.clientY >= mouseBox.top && event.clientY <= mouseBox.bot && event.clientX >= mouseBox.left && event.clientX <= mouseBox.right)
				setPaddleRight({ x: paddleRight.x, y: (event.clientY - mouseBox.top) });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [paddleRight, inner]);
	return (paddleRight);
}

export default usePaddleRight;
