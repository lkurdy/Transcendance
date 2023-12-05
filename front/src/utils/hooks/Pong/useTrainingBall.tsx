import { useState, useEffect, useMemo, useContext } from 'react';
import { SoundContext } from '../../context/SoundContext'
import { GameContext } from '../../context/GameContext'
import useResize from '../../../utils/hooks/Pong/useResize.ts'

function useTrainingBall(inner: {x: number, y: number}, data: { width: number, height: number, radius: number}, doubleWall: { height: number, bot: number, left: number, right: number}, paddleLeft: {x: number, y: number}, paddleRight: {x: number, y: number}, secondPaddleLeftX: number)
{
	const { handleSFX } = useContext(SoundContext);
	const { scores, setScores, dataGame } = useContext(GameContext);
	const [direction, setDirection] = useState<'left' | 'right'>('left');
	const [stopGame, setstopGame] = useState<boolean>(true);
	const initialBallPos = useMemo(() => ({ x: inner.x * 0.375, y: Math.random() * (inner.y * 0.65 - data.radius * 2) + data.radius * 2}), [inner, stopGame]);
	const [ball, setBall] = useState({...initialBallPos});
	const newBall = useMemo(() => ({ ...ball }), [ball]);
	const [ballX, setballX] = useState<number>(0);
	const [ballY, setballY] = useState<number>((Math.random() * 14) - 7);
	const [speed, setSpeed] = useState(4 * dataGame.speed!);
	const innerBox = useMemo(() => ({bot: inner.y * 0.656, left: inner.x * 0.01, right: inner.x * 0.742}), [inner]);
	const wallX = useMemo(() => ({left: (doubleWall.left + data.width) * 1.15, right: doubleWall.right * 0.989}), [doubleWall.left, doubleWall.right]);
	const secondPaddleX = useMemo(() => (secondPaddleLeftX * 0.99), [secondPaddleLeftX]);
	const secondPaddleSideX = useMemo(() => ((secondPaddleLeftX + data.width) * 1.01), [secondPaddleLeftX]);
	const secondPaddleMiddleX = useMemo(() => (secondPaddleLeftX + (data.width / 2)), [secondPaddleLeftX]);
	const paddleX = useMemo(() => ({left: (paddleLeft.x + data.width) * 1.10, right: paddleRight.x * 0.989}), [paddleLeft.x, paddleRight.x]);
	const paddleY = useMemo(() => ({left: paddleLeft.y, right: paddleRight.y}), [paddleLeft.y, paddleRight.y]);
	const paddleWidth = useMemo(() => ({left: paddleLeft.x , right: paddleRight.x + data.width}), [paddleLeft.x, paddleRight.x]);
	const paddleHeight = useMemo(() => ({left: paddleY.left + data.height + data.radius , right: paddleY.right + data.height + data.radius }), [paddleY]);
	const paddleCenter = useMemo(() => ({left: (paddleY.left + data.height / 2) , right: (paddleY.right + data.height / 2)}), [paddleY]);
	const deltaLeftY = useMemo(() => ((newBall.y - paddleCenter.left) / (data.height / 2) * 5), [newBall, paddleCenter.left]);
	const deltaRightY = useMemo(() => ((newBall.y - paddleCenter.right) / (data.height / 2) * 5), [newBall, paddleCenter.right]);

	useResize(ball, setBall);
	useEffect(() =>
	{
		const interval = setInterval(() =>
			{
				if (stopGame)
				{
					if (scores.x < 11 && scores.y < 11)
					{
						setTimeout(() => {
							setBall(initialBallPos);
							setstopGame(false);
						}, 1250);
					}
					clearInterval(interval);
				}
				else
				{
					direction === 'left' ? setballX(ballX - speed) : setballX(ballX + speed)
					newBall.x = ball.x + (direction === 'left' ? -speed : speed);
					newBall.y = ball.y + ballY;
					setBall(newBall);
					if (dataGame.isDouble && ((newBall.y >= (paddleY.left - data.radius) && newBall.y <= paddleHeight.left && ((newBall.x >= secondPaddleX && newBall.x <= secondPaddleMiddleX) || (newBall.x <= secondPaddleSideX && newBall.x >= secondPaddleMiddleX)))))
					{
						if (newBall.x >= secondPaddleX && newBall.x <= secondPaddleMiddleX)
							setDirection('left');
						else
							setDirection('right');
						if ((newBall.x >= secondPaddleX && newBall.x <= secondPaddleMiddleX) || (newBall.x <= secondPaddleSideX && newBall.x >= secondPaddleMiddleX))
							setballY(deltaLeftY / 2);
						handleSFX("paddle");
					}
					else if ((newBall.x <= paddleX.left && newBall.y >= (paddleY.left - data.radius) && newBall.y <= paddleHeight.left)
					|| (newBall.x >= paddleX.right && newBall.y >= (paddleY.right - data.radius) && newBall.y <= paddleHeight.right)
					|| (dataGame.isDouble && (newBall.x <= wallX.left || newBall.x >= wallX.right) && newBall.y >= data.radius && newBall.y <= doubleWall.height + data.radius)
					|| (dataGame.isDouble && (newBall.x <= wallX.left || newBall.x >= wallX.right) && newBall.y >= innerBox.bot - doubleWall.height && newBall.y <= innerBox.bot))
					{
						setDirection(newBall.x <= paddleX.left ? 'right' : 'left');
						if (speed < 15)
							setSpeed(speed + 0.1);
						if (!(newBall.x <= wallX.left || newBall.x >= wallX.right))
							setballY(newBall.x <= paddleX.left ? deltaLeftY : deltaRightY);
						handleSFX("paddle");
					}
					else if (newBall.y <= 20 || newBall.y >= innerBox.bot)
					{
						setballY(newBall.y <= 20 ? Math.abs(ballY) : -Math.abs(ballY));
						handleSFX("wall");
					}
					else if (newBall.x <= paddleWidth.left || newBall.x >= paddleWidth.right)
					{
						if (newBall.x <= paddleWidth.left)
							setScores({ x: scores.x, y: scores.y + 1 });
						else
							setScores({ x: scores.x + 1, y: scores.y });
						if (scores.x < 11 && scores.y < 11)
							handleSFX("goal");
						setSpeed(4 * dataGame.speed!);
						setballY((Math.random() * 14) - 7);
						setstopGame(true);
					}
				}
			}, 10);
			return () => clearInterval(interval);
	}, [ball, stopGame]);
	return (ball);
}

export default useTrainingBall;
