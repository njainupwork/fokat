import { ThunkAction } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  AnyAction
>;

export interface UserState {
  balance: number;
  allowance: boolean;
}

export interface GameState {
  camera: CameraState;
  dice: Dices;
  gridPosition: number;
  hover: number,
  characterSelected: number
}

export interface Dices {
  rolls: {
    roll1: number;
    roll2: number;
  };
  nextDiceRoll: number;
  diceAvailable: number;
}
export interface Dice {
  roll: number;
}
export interface CameraState {
  prevLookAt: any;
  lookAt: any;
  position: any;
  cameraType: string;
}

// Global state

export interface State {
  user: UserState;
  game: GameState;
}
