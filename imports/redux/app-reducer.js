import {
  SELECT_CAMPAIGN, UNSELECT_CAMPAIGN,
  SELECT_CHARACTER, UNSELECT_CHARACTER,
} from './app-constants';

const gameSelections = JSON.parse(localStorage.getItem('gameSelections'))||{};

const saveSelections = state => localStorage.setItem('gameSelections', JSON.stringify(state));

let initState = {
  selectedCampaign  : null,
  selectedCharacter : null,
}

// This is so we can load in the site configuration
export const setAppInitialState = state => {
  state = gameSelections;
  initState = {
    ...initState,
    ...state,
  };
}

const reducer = (state = initState, action) => {
  const newState = { ...state };
  switch(action.type) {
    case SELECT_CAMPAIGN :
      newState.selectedCampaign = action.campaign;
      saveSelections(newState);
      break;
    case UNSELECT_CAMPAIGN :
      newState.selectedCampaign = null;
      saveSelections(newState);
      break;
    case SELECT_CHARACTER :
      newState.selectedCharacter = action.character;
      saveSelections(newState);
      break;
    case UNSELECT_CHARACTER :
      newState.selectedCharacter = null;
      saveSelections(newState);
      break;
    default:
      break;
  }
  return newState;
}

export default reducer;
