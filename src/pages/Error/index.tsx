import styled from 'styled-components'
import { StyledContainer } from '../../utils/styles/Atoms.tsx'
import GifError from '../../assets/images/404Error.gif'
import { useEffect } from 'react';

const CenteredContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const ErrorLogo = styled.img`
	max-width: 800px;
	margin: auto;
`

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`

const SubTitle = styled.h2`
	font-weight: 300;
	text-align: center;
	margin-bottom: 200px;
`

function Error()
{
	useEffect(() => {
		const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
		document.title = '404Error - ft_transcendence';
		const contextMenuListener: EventListener = (e) => handleContextMenu(e as unknown as React.MouseEvent);
		document.addEventListener('contextmenu', contextMenuListener);
		return () => document.removeEventListener('contextmenu', contextMenuListener);
	}, []);
	return (<StyledContainer>
				<CenteredContent>
					<ErrorLogo src={GifError} alt='GifError' />
					<Title>Page not found</Title>
					<SubTitle>The page you are looking for may have been moved, deleted or possibly never existed...</SubTitle>
				</CenteredContent>
			</StyledContainer>);
}

export default Error;
