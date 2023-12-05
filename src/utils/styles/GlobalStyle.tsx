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
		width: 0.3vw;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	::-webkit-scrollbar:hover {
		opacity: 1;
	}
	::-webkit-scrollbar:active {
		opacity: 1;
	}
	* {
		scrollbar-width: thin;
		scrollbar-color: transparent transparent; /* Définissez la couleur de la barre de défilement sur transparent par défaut */
	}

	/* Style pour Firefox (utilisez scrollbar-color) au survol */
	*:hover {
		scrollbar-color: dimgrey transparent; /* Lorsque l'utilisateur survole, définissez la couleur de la barre de défilement */
	}

	}`

export default GlobalStyle;
