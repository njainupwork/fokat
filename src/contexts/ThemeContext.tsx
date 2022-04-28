import React, { useState } from "react"
import { ThemeProvider } from "styled-components"
// import { Darks, Lights } from 'config/constants/themes'
// import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from "@kenjiwb/uikit"

const CACHE_KEY = "IS_DARK"

const ThemeContext = React.createContext({
  isDark: null,
  toggleTheme: () => null,
})

type Props = {
  children: JSX.Element
}

const ThemeContextProvider = ({ children }: Props) => {
  const [isDark, setIsDark] = useState(() => {
    // const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    // return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
    return true
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeProvider theme={isDark ? dark : light}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
