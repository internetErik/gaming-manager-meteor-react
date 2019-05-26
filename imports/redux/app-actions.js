import {
  SELECT_CAMPAIGN, UNSELECT_CAMPAIGN,
  SELECT_CHARACTER, UNSELECT_CHARACTER,
} from './app-constants';

export const selectCampaignAction = campaign => ({
  type : SELECT_CAMPAIGN,
  campaign,
})

export const unselectCampaignAction = () => ({
  type : UNSELECT_CAMPAIGN,
})

export const selectCharacterAction = character => ({
  type : SELECT_CHARACTER,
  character,
})

export const unselectCharacterAction = () => ({
  type : UNSELECT_CHARACTER,
})
