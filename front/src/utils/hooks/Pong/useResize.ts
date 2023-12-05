import { useEffect, useState } from 'react';
import useWindowSize from '../WindowSize/useWindowSize';

function useResize(object: {x: number, y: number}, setObject: (value: {x: number, y: number}) => void)
{
	const inner = useWindowSize();
	const [lastInner, setLastInner] = useState({...inner});

	useEffect(() => {
		const handleResize = () => {
			const NewXPos = (object.x * inner.x) / lastInner.x;
			const NewYPos = (object.y * inner.y) / lastInner.y;
			setObject({x: NewXPos, y: NewYPos});
			setLastInner({...inner});
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [inner, object, setObject]);
}

export default useResize;
