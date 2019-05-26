import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Spells } from '../../../api';

import HeadingPrimary from '../../components/HeadingPrimary';

const SpellListPage = ({ spells, spellCount, currentUser }) => (
<main className="spell-list-page grid-container">
  <HeadingPrimary text="Spells" />
  <hr />
  <section className="p20-0 m20-0">
  { spellCount }
  {
    spells.map(s => (
    <div key={s.name}>
    { s.name }
    </div>
    ))
  }
  </section>
</main>
)

export default withTracker(() => {
  Meteor.subscribe('spells');
  return {
    spellCount  : Spells.find({}).count(),
    spells      : Spells.find({}).fetch(),
    currentUser : Meteor.user(),
  }
})(SpellListPage);
