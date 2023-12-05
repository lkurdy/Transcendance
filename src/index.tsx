import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './utils/styles/GlobalStyle.tsx'
import { SoundProvider } from './utils/context/SoundContext/index.tsx'
import { GameProvider } from './utils/context/GameContext/index.tsx'
import { ChatProvider } from './utils/context/ChatContext/index.tsx'
import WindowSize from './components/WindowSize/index.tsx'
import Header from './components/Header/index.tsx';
import Error from './pages/Error/index.tsx';
import Home from './pages/Home/index.tsx';
import Game from './pages/Game/index.tsx';
import Chat from './pages/Chat/index.tsx';
import Profile from './pages/Profile/index.tsx';
import Footer from './components/Footer/index.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Router>
			<GlobalStyle />
			<GameProvider>
				<SoundProvider>
					<WindowSize />
					<Header />
					<ChatProvider>
					<Routes>
						<Route path="*" element={<Error />} />
						<Route path="/" element={<Home />} />
						<Route path="/game" element={<Game />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
					</ChatProvider>
					<Footer />
				</SoundProvider>
			</GameProvider>
		</Router>
	</React.StrictMode>
);
