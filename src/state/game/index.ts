import { GameState } from "../types";
import { createSlice } from "@reduxjs/toolkit";
const initialState: GameState = {
  camera: {
    lookAt: { x: 0, y: 0, z: 0 },
    prevLookAt: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    cameraType: "grid",
  },
  dice: {
    rolls: {
      roll1: 1,
      roll2: 2,
    },
    nextDiceRoll: 0,
    diceAvailable: 0,
  },

  gridPosition: 0,
  hover: -1,
  characterSelected: -1,
};

export const Game = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update lootbox with live data
    builder.addCase("changeCam", (state, action: any) => {
      return {
        ...state,
        camera: {
          ...state.camera,
          cameraType: action.cameraType,
        },
      };
    });
    builder.addCase("move", (state, action: any) => {
      return {
        ...state,
        camera: {
          ...state.camera,
          position: action.plot,
          prevLookAt: action.prevLookAt,
        },
      };
    });
    builder.addCase("userInfos", (state, action: any) => {
      return {
        ...state,
        dice: {
          ...state.dice,
          diceAvailable: action.diceAvailable,
          nextDiceRoll: action.nextDiceRoll,
          rolls: {
            roll1: action.roll1,
            roll2: action.roll2,
          },
        },
        gridPosition: parseInt(action.gridPosition),
        characterSelected: parseInt(action.characterSelected),
      };
    });
    builder.addCase("mouseOver", (state, action: any) => {
      return {
        ...state,
        hover: parseInt(action.hover),
      };
    });
    builder.addCase("mouseOverOut", (state, action: any) => {
      return {
        ...state,
        hover: -1,
      };
    });
    builder.addCase("characterSelected", (state, action: any) => {
      return {
        ...state,
        characterSelected: action.token,
      };
    });
    builder.addCase("resetGame", (state, action: any) => {
      return {
        ...state,
        characterSelected: -1,
        dice: {
          ...state.dice,
          diceAvailable: 0,
          nextDiceRoll: 0,
          rolls: {
            roll1: 1,
            roll2: 1,
          }
        },
        gridPosition: -1
      };
    });
  },
});

export default Game.reducer;
