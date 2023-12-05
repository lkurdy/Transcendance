import { useState, useEffect } from 'react';
import { StyledContainer } from '../../utils/styles/Atoms.tsx'
import List from '../../components/Chat/List'
import PublicChat from '../../components/Chat/PublicChat/index.tsx';
import Talk from '../../components/Chat/Talk/index.tsx';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`

function Chat()
{
	const [ talk, setTalk ] = useState<{name:string, isGroup: boolean} | undefined>(undefined);
	const [ tab, setTab ] = useState<string>("join");

	useEffect(() => {
		const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
		document.title = 'Chat - ft_transcendence';
		const contextMenuListener: EventListener = (e) => handleContextMenu(e as unknown as React.MouseEvent);
		document.addEventListener('contextmenu', contextMenuListener);
		return () => document.removeEventListener('contextmenu', contextMenuListener);
	}, []);
	return (<StyledContainer>
				<Container>
					<List talk={talk} setTalk={setTalk} tab={tab} setTab={setTab}/>
					{talk === undefined && <PublicChat tab={tab}/>}
					{talk && <Talk talk={talk} setTalk={setTalk}/>}
				</Container>
			</StyledContainer>);
}

export default Chat;
