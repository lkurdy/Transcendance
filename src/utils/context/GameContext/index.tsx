import { createContext, useState, ReactNode, useEffect } from 'react';

type GameContextType = {
	logged: boolean;
	setLogged: (value: boolean) => void;
	showMode: boolean,
	setShowMode: (value: boolean) => void;
	status: {activity: string, isInvisible: boolean};
	setStatus: (value: {activity: string, isInvisible: boolean}) => void;
	scores: {x: number, y: number};
	setScores: (value: {x: number, y: number}) => void;
	dataGame: {mode?: string, isDouble?: boolean, speed?: number, id?: number};
	setDataGame: (value: {mode?: string, isDouble?: boolean, speed?: number, id?: number}) => void;
	inPause: boolean;
	setInPause: (value: boolean) => void;
};

export const GameContext = createContext<GameContextType>({
	logged: false,
	setLogged: () => {},
	showMode: true,
	setShowMode: () => {},
	status: {activity: "Online", isInvisible: false},
	setStatus: () => {},
	scores: {x: 0, y: 0},
	setScores: () => {},
	dataGame: {mode: undefined, isDouble: undefined, speed: undefined, id: undefined},
	setDataGame: () => {},
	inPause: false,
	setInPause: () => {}
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const initialLogged = localStorage.getItem('logged');
	const [logged, setLoggedState] = useState<boolean>(initialLogged ? JSON.parse(initialLogged) : true);
	const initialInPause = localStorage.getItem('inPause');
	const [inPause, setInPauseState] = useState<boolean>(initialInPause ? JSON.parse(initialInPause) : false);
	const initialStatus = localStorage.getItem('status');
	const [status, setStatusState] = useState<{activity: string, isInvisible: boolean}>(initialStatus ? JSON.parse(initialStatus) : {activity: "Online", isInvisible: false});
	const initialShowMode = localStorage.getItem('showMode');
	const [showMode, setShowModeState] = useState(initialShowMode && status ? JSON.parse(initialShowMode) : true);
	const initialDataGame = localStorage.getItem('dataGame');
	const [dataGame, setDataGameState] = useState<{mode?: string, isDouble?: boolean, speed?: number, id?: number}>(initialDataGame && status.activity !== "Online" ? JSON.parse(initialDataGame) : {mode: undefined, isDouble: undefined, speed: undefined, id: undefined});
	const initialScores = localStorage.getItem('scores');
	const [scores, setScoresState] = useState<{x: number, y: number}>(initialScores ? JSON.parse(initialScores) : {x: 0, y: 0});

	const setLogged = (value: boolean) => {
		localStorage.setItem('logged', JSON.stringify(value));
		setLoggedState(value);
	};
	const setShowMode = (value: boolean) => {
		localStorage.setItem('showMode', JSON.stringify(value));
		setShowModeState(value);
	};
	const setInPause = (value: boolean) => {
		localStorage.setItem('inPause', JSON.stringify(value));
		setInPauseState(value);
	};
	const setStatus = (value: {activity: string, isInvisible: boolean}) => {
		localStorage.setItem('status', JSON.stringify(value));
		setStatusState(value);
	};
	const  setDataGame = (value: {mode?: string, isDouble?: boolean, speed?: number, id?: number}) => {
		localStorage.setItem('dataGame', JSON.stringify(value));
		setDataGameState(value);
	};
	const setScores = (value: {x: number, y: number}) => {
		localStorage.setItem('scores', JSON.stringify(value));
		setScoresState(value);
	};
	useEffect(() => {
		console.log("send ", status, " to database");
	}, [status]);
	return (
		<GameContext.Provider value={{ logged, setLogged, showMode, setShowMode, status, setStatus, scores, setScores, dataGame, setDataGame, inPause, setInPause }}>
			{children}
		</GameContext.Provider>);
};
