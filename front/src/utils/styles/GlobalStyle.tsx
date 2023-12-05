import { createGlobalStyle } from 'styled-components'
import Background from '../../assets/images/background.gif'

const GlobalStyle = createGlobalStyle`
	* {
		color: white;
		text-decoration: none;
		outline: none;
		font-family: 'Pixelify Sans';
		&::selection {
			background-color: transparent;
	}
	body {
		background: url(${Background});
		margin: 0;
	}
	::-webkit-scrollbar {
		width: 0.5vw;
	}
	
	::-webkit-scrollbar-track {
		background: rgba(50, 50, 50, 0.95);
		border-radius: 5px;
	} 
	
	::-webkit-scrollbar-thumb {
		background: linear-gradient(darkgrey, dimgrey);
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: dimgrey;
	}
	}`

export default GlobalStyle;
