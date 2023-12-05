import { createContext, useState, useEffect, ReactNode, useContext  } from 'react';
import { GameContext } from '../GameContext/';
import useSound from 'use-sound';
import LittlerootTownOST from '../../../assets/sounds/ost/LittlerootTownOST.wav'
import Route101OST from '../../../assets/sounds/ost/Route101OST.wav'
import OldaleTownOST from '../../../assets/sounds/ost/OldaleTownOST.wav'
import GoldenrodCityOST from '../../../assets/sounds/ost/GoldenrodCityOST.wav'
import BattleOST from '../../../assets/sounds/ost/BattleOST.wav'
import HeaderSFX from '../../../assets/sounds/sfx/HeaderSFX.wav'
import FallaborTownOST from '../../../assets/sounds/ost/FallaborTownOST.wav'
import NewBarkTownOST from '../../../assets/sounds/ost/NewBarkTownOST.wav'
import SurfingOST from '../../../assets/sounds/ost/SurfingOST.wav'
import VerdanturfTownOST from '../../../assets/sounds/ost/VerdanturfTownOST.wav'
import CeruleanCityOST from '../../../assets/sounds/ost/CeruleanCityOST.wav'
import ExitSFX from '../../../assets/sounds/sfx/ExitSFX.wav'
import ClicSFX from '../../../assets/sounds/sfx/ClicSFX.wav'
import ClicSFX2 from '../../../assets/sounds/sfx/ClicSFX2.wav'
import ClicSFX3 from '../../../assets/sounds/sfx/ClicSFX3.wav'
import ClicSFX4 from '../../../assets/sounds/sfx/ClicSFX4.wav'
import GoBackSFX from '../../../assets/sounds/sfx/GoBackSFX.wav'
import PaddleSFX from '../../../assets/sounds/sfx/PaddleSFX.wav'
import GoalSFX from '../../../assets/sounds/sfx/GoalSFX.wav'
import WallSFX from '../../../assets/sounds/sfx/WallSFX.wav'

type Song = {
	title: string;
	url: string;
	volume: number;
};

type SoundContextType = {
	setSoundFX: (type: string) => void;
	handleSFX: (name: string) => void;
	menuSFX: boolean;
	gameSFX: boolean;
	setGameMusic: () => void;
	battleMusic: boolean;
	setBattleMusic: () => void,
	gameMusic: boolean;
	playlist: Song[];
	currentSong: number;
	handleChangeMusic: (value?: boolean) => void;
	setMenuMusic: () => void;
	menuMusic: boolean;
};

export const SoundContext = createContext<SoundContextType>({
	setSoundFX: () => {},
	handleSFX: () => {},
	menuSFX: true,
	gameSFX: true,
	setGameMusic: () => {},
	battleMusic: true,
	setBattleMusic: () => {},
	gameMusic: true,
	playlist: [],
	currentSong: 0,
	handleChangeMusic: () => {},
	setMenuMusic: () => {},
	menuMusic: true
});


export const SoundProvider = ({ children }: { children: ReactNode }) => {
	const { status } = useContext(GameContext);
	const [playlist] = useState<Song[]>([
		{
			title: 'Littleroot Town',
			url: LittlerootTownOST,
			volume: 0.2
		},
		{
			title: 'Route 101',
			url: Route101OST,
			volume: 0.2
		},
		{
			title: 'Oldale Town',
			url: OldaleTownOST,
			volume: 0.18
		},
		{
			title: 'Goldenrod City',
			url: GoldenrodCityOST,
			volume: 0.13
		},
		{
			title: 'Fallabor Town',
			url: FallaborTownOST,
			volume: 0.2
		},
		{
			title: 'Battle',
			url: BattleOST,
			volume: 0.07
		},
		{
			title: 'New Bark Town',
			url: NewBarkTownOST,
			volume: 0.12
		},
		{
			title: 'Surfing',
			url: SurfingOST,
			volume: 0.15
		},
		{
			title: 'Verdanturf Town',
			url: VerdanturfTownOST,
			volume: 0.18
		},
		{
			title: 'Cerulean City',
			url: CeruleanCityOST,
			volume: 0.2
		}
	]);
	const initialMenuMusic = localStorage.getItem('menuMusic');
	const [menuMusic, setMenuMusicState] = useState<boolean>(initialMenuMusic ? JSON.parse(initialMenuMusic) : true);
	const setMenuMusic = () => {
		localStorage.setItem('menuMusic', JSON.stringify(!menuMusic));
		setMenuMusicState(!menuMusic);
	};
	const initialGameMusic = localStorage.getItem('gameMusic');
	const [gameMusic, setGameMusicState] = useState<boolean>(initialGameMusic ? JSON.parse(initialGameMusic) : true);
	const setGameMusic = () => {
		localStorage.setItem('gameMusic', JSON.stringify(!gameMusic));
		setGameMusicState(!gameMusic);
	};
	const initialBattleMusic = localStorage.getItem('battleMusic');
	const [battleMusic, setBattleMusicState] = useState<boolean>(initialBattleMusic ? JSON.parse(initialBattleMusic) : true);
	const setBattleMusic = () => {
		localStorage.setItem('battleMusic', JSON.stringify(!battleMusic));
		setBattleMusicState(!battleMusic);
	};
	const initialMenuSFX = localStorage.getItem('menu');
	const [menuSFX, setMenuSFX] = useState<boolean>(initialMenuSFX ? JSON.parse(initialMenuSFX) : true);
	const initialGameSFX = localStorage.getItem('game');
	const [gameSFX, setGameSFX] = useState<boolean>(initialGameSFX ? JSON.parse(initialGameSFX) : true);
	const setSoundFX = (type: string) => {
		localStorage.setItem(type, JSON.stringify(type === "menu" ? !menuSFX : !gameSFX));
		type === "menu" ? setMenuSFX(!menuSFX) : setGameSFX(!gameSFX);
	}
	const initialCurrentSong = localStorage.getItem('currentSong');
	const [currentSong, setCurrentSongState] = useState(initialCurrentSong ? JSON.parse(initialCurrentSong) : 0);
	const setCurrentSong = (value: number) => {
		localStorage.setItem('currentSong', JSON.stringify(value));
		setCurrentSongState(value);
	}
	const [isPlaying, setIsPlaying] = useState(false);
	const [play, { stop }] = useSound(playlist[currentSong].url, {
		volume: playlist[currentSong].volume,
		onend: () => {
			setCurrentSong((currentSong + 1) % playlist.length);
		}
	});
	const handleChangeMusic = (next?: boolean) => {
		stop();
		if (next === undefined)
			setCurrentSong(playlist.findIndex((song) => song.title === 'Battle'));
		else if (currentSong !== 0 || next === true)
			setCurrentSong((currentSong + (next ? 1 : -1)) % playlist.length);
		else 
			setCurrentSong(playlist.length - 1);
	}
	useEffect(() => {
		if ((menuMusic && status.activity !== "In Game") || (gameMusic && status.activity === "In Game"))
			setIsPlaying(true);
		else
			setIsPlaying(false);
	}, [menuMusic, gameMusic, status.activity]);
	useEffect(() => {
		stop();
		if (isPlaying)
			play();
	}, [play, isPlaying]);
	const [headerSFX] = useSound(HeaderSFX, { volume: 0.45 });
	const [exitSFX] = useSound(ExitSFX, { volume: 0.65 });
	const [clicSFX1] = useSound(ClicSFX, { volume: 0.45 });
	const [clicSFX2] = useSound(ClicSFX2, { volume: 0.5 });
	const [clicSFX3] = useSound(ClicSFX3, { volume: 0.5 });
	const [clicSFX4] = useSound(ClicSFX4, { volume: 0.5 });
	const [goBackSFX] = useSound(GoBackSFX, { volume: 0.5 });
	const [paddleSFX] = useSound(PaddleSFX, { volume: 2.1 });
	const [goalSFX] = useSound(GoalSFX, { volume: 1.5 });
	const [wallSFX] = useSound(WallSFX, { volume: 2 });
	const [idx, setIdx] = useState(0);
	const handleSFX = (name: string) => {
		const clic = [clicSFX1, clicSFX2, clicSFX3, clicSFX4, clicSFX3, clicSFX2];

		if (menuSFX && name === "header")
			headerSFX();
		else if (menuSFX && name === "exit")
			exitSFX();
		else if (menuSFX && name === "goBack")
			goBackSFX();
		else if (gameSFX && name === "paddle")
			paddleSFX();
		else if (gameSFX && name === "goal")
			goalSFX();
		else if (gameSFX && name === "wall")
			wallSFX();
		else if (menuSFX && name === "clic")
		{
			clic[idx]();
			setIdx((idx + 1) % clic.length);
		}
	};
	return (<SoundContext.Provider value={{ menuSFX, gameSFX, setSoundFX, handleSFX, setGameMusic, battleMusic, setBattleMusic, gameMusic, playlist, currentSong, handleChangeMusic, setMenuMusic, menuMusic }}>
				{children}
			</SoundContext.Provider>);
};
