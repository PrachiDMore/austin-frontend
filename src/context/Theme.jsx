import { createContext, useContext } from "react";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
	
	const selectTheme = {
		control: (styles, { isFocused }) => {
			return ({ ...styles, backgroundColor: 'white', padding: "0.43rem", boxShadow: isFocused ? `0 4px 6px -1px rgba(145 33 143 0.45), 0 2px 4px -2px rgba(145 33 143 0.45)` : `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`, borderRadius: "0.375rem", border: `1px solid rgb(229, 231, 235)` })
		},
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isFocused ? 'rgba(171, 46, 169, 0.4)' : "white",
				color: '#000',
			};
		},
		theme: (theme) => ({
			...theme,
			borderRadius: 0,
			colors: {
				...theme.colors,
				primary25: 'hotpink',
				primary: 'black',
			},
		})
	}

	return <ThemeContext.Provider value={{ selectTheme }}>
		{children}
	</ThemeContext.Provider>
}

const UseThemeContext = () => {
	return useContext(ThemeContext)
}

export { ThemeContextProvider, UseThemeContext };