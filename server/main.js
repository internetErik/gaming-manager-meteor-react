import { Meteor } from 'meteor/meteor';
import { initFeats, initSkills, initSpells } from './init';

import './publish.js';

Meteor.startup(() => {
  initFeats();
  initSkills();
  initSpells();
});
