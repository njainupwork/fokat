import React from "react"
import { Web3ReactProvider } from "@web3-react/core"
import { ModalProvider } from "@kenjiwb/uikit"
import { getLibrary } from "utils/web3React"
import { LanguageProvider } from "contexts/Localization"
import { ThemeContextProvider } from "contexts/ThemeContext"
import { Provider } from "react-redux"
import store from "state"
import { ToastsProvider } from "contexts/ToastsContext"
type Props = {
  children: JSX.Element
}

const Providers: React.FC<Props> = ({ children }: Props) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <LanguageProvider>
          <ThemeContextProvider>
            <ToastsProvider>
              <ModalProvider>{children}</ModalProvider>
            </ToastsProvider>
          </ThemeContextProvider>
        </LanguageProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
