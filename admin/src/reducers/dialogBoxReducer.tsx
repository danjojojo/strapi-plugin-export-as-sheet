type DialogBox = {
  message: string;
  isOpen: boolean;
};

type DialogBoxAction =
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'OPEN_DIALOG'; payload: boolean };

export function dialogBoxReducer(state: DialogBox, action: DialogBoxAction) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'OPEN_DIALOG':
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
}
