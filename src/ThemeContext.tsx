import React, { createContext, useState, useContext } from 'react';

let ThemeContext: React.Context<unknown>;
// @ts-ignore
ThemeContext = createContext();

export class ThemeProvider extends React.Component<{ children: any }> {
    render() {
        let {children} = this.props;
        const [theme, setTheme] = useState('light');

        const toggleTheme = () => {
            setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        };

        return (
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                {children}
            </ThemeContext.Provider>
        );
    }
}

export const useTheme = () => useContext(ThemeContext);