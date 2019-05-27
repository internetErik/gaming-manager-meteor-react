import { Meteor } from 'meteor/meteor'
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Characters } from '/imports/api';

import { selectCharacterAction } from '/imports/redux/app-actions';

class CharacterListPage extends React.Component {

  selectCharacter = character => this.props.selectCharacter(character)

  render() {
    const { pcs, npcs, currentUser, selectedCampaign } = this.props;
    return (
    <div className="character-list-page grid-container">
      <h1>Character List</h1>
      <hr />
      <section className="p20-0 m20-0">
        <Link to="/character-form">
          Add Character
        </Link>
      </section>
      <section className="p20-0 m20-0">
        <h2>PCs</h2>
        {
        pcs.map(({ _id, userId, firstName, middleName, lastName }) => (
        <div
          key={_id}
          className="p10-0"
        >
          <Link to={`/CharacterDetail/${ _id }`}>
            { firstName } { middleName } { lastName }
          </Link>
          {currentUser._id === userId &&
          <span onClick={() => this.selectCharacter(character)}>
            Select
          </span>
          }
        </div>
        ))
        }
      </section>
      {currentUser._id === selectedCampaign.creator &&
      <>
        <hr />
        <section className="p20-0 m20-0">
          <h2>NPCs</h2>
          {
          npcs.map(({ _id, userId, firstName, middleName, lastName }) => (
          <div
            key={_id}
            className="p10-0"
          >
            <Link to={`/CharacterDetail/${ _id }`}>
              { firstName } { middleName } { lastName }
            </Link>
          </div>
          ))
          }
        </section>
      </>
      }
    </div>
    )
  }
}

const mapStateToProps = ({ appReducer : { selectedCampaign, selectedCharacter } }) => ({
  selectedCampaign,
  selectedCharacter,
})

const mapDispatchToProps = dispatcher => ({
  selectCharacter : character => dispatcher(selectCharacterAction(character)),
})

const trackedCharacterListPage = withTracker(({ selectedCampaign, history }) => {
  if(!selectedCampaign) {
    history.push('/campaign-list');
    return { pcs  : [], npcs : [], };
  }

  Meteor.subscribe('characters');

  return {
    pcs  : Characters.find({ campaignId : selectedCampaign._id, characterType : 'PC' }).fetch(),
    npcs : Characters.find({ campaignId : selectedCampaign._id, characterType : 'NPC' }).fetch(),
  }
})(CharacterListPage);

export default connect(mapStateToProps, mapDispatchToProps)(trackedCharacterListPage);
