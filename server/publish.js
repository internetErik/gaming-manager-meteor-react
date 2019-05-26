import {
  Characters,
  Campaigns,
  Rolls,
  Spells,
  Skills,
  Feats,
  Monsters,
  Battles,
} from '../imports/api';

Meteor.publish('battles', campaignId => Battles.find({campaignId: campaignId}));

Meteor.publish('campaigns', () => Campaigns.find());

Meteor.publish('characters', () => Characters.find());

Meteor.publish('character', characterId => Characters.find({_id: characterId}));

Meteor.publish('feats', () => Feats.find());

Meteor.publish('monsters', () => Monsters.find());

Meteor.publish('rolls', campaignId =>
  Rolls.find({ campaignId : campaignId },
  {
    sort  : { createDate: -1 },
    limit : 5,
  })
);

Meteor.publish('skills', () => Skills.find());

Meteor.publish('spells', () => Spells.find());