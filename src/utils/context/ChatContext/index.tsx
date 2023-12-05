import { createContext, useState, ReactNode } from 'react';

type ChatContextType = {
	showIdCard: boolean;
	setShowIdCard: (value: boolean) => void;
	showGroupInfo: boolean;
	setShowGroupInfo: (value: boolean) => void;
};

export const ChatContext = createContext<ChatContextType>({
	showIdCard: false,
	setShowIdCard: () => {},
	showGroupInfo: false,
	setShowGroupInfo: () => {}
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
	const [ showIdCard, setShowIdCard ] = useState<boolean>(false);
	const [ showGroupInfo, setShowGroupInfo ] = useState<boolean>(false);

	return (
	<ChatContext.Provider value={{ showIdCard, setShowIdCard, showGroupInfo, setShowGroupInfo }}>
		{children}
	</ChatContext.Provider>);
};
