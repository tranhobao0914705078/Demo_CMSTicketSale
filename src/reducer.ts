import { stat } from "fs";

export interface State {
    data: any[];
}

type Action =
  | { type: "SET_DATA"; payload: any[] }
  | { type: "ADD_DATA"; payload: any };

export function reducerItems(state: State, action: Action): State {
    switch(action.type) {
        case "SET_DATA":
            return {...state, data:action.payload};
        case "ADD_DATA":
            return {...state, data: [...state.data, action.payload]};
        default:
            return state;
    }
}