import React from "react";
import { GameState } from "./state/types";

const AppContext = React.createContext<GameState>({} as GameState);
export const AppProvider = AppContext.Provider;
export default AppContext;
