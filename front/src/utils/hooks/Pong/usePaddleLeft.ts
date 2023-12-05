import { useState, useEffect, useMemo, useRef } from 'react';
import useResize from '../../../utils/hooks/Pong/useResize.ts'
function usePaddleLeft(inner: {x: number, y: number}, isSecondPaddles: boolean)
{
	const [paddleLeft, setPaddleLeft] = useState({x: (isSecondPaddles ? inner.x * 0.557 : inner.y * 0.10), y: inner.y * 0.273});
	const innerBot = useMemo(() => (inner.y * 0.573), [inner.y]);
	const keysPressed = useRef<{ [key: string]: boolean }>({});

	useResize(paddleLeft, setPaddleLeft);
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => keysPressed.current[event.key] = true;
		const handleKeyUp = (event: KeyboardEvent) => keysPressed.current[event.key] = false;
		const movePaddle = () => {
			if (keysPressed.current['ArrowUp'] && paddleLeft.y >= 0)
				setPaddleLeft({ x: paddleLeft.x, y: paddleLeft.y - 2 });
			else if (keysPressed.current['ArrowDown'] && (paddleLeft.y < innerBot))
				setPaddleLeft({ x: paddleLeft.x, y: paddleLeft.y + 2 });
		};
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		const interval = setInterval(movePaddle, 2);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			clearInterval(interval);
		};
	}, [paddleLeft, inner]);
	return (paddleLeft);
}

export default usePaddleLeft;
