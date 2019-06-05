import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Characters, Spells, Skills, Feats } from '/imports/api';

import { ConfigurableForm } from '../../inputs';

import {
  getCharacterInfoConfiguration,
  getCharacterInventoryConfiguration,
  getCharacterStatConfiguration,
  getCharacterSkillConfiguration,
} from './constants';

class CharacterDetailPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      values : {},
      dirty  : {},
      errors : {},
      buttonDisabled    : false,
      formBottomMessage : '',
    }
  }

  // this is setup to be used with multiple configurable forms
  handleOnChange = ([ v, d, e ]) => {
    const values = { ...this.state.values, ...v };
    const dirty = { ...this.state.dirty, ...d };
    const errors = { ...this.state.errors, ...e };
    this.setState({ values, dirty, errors })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ campaignNameDirty : true }, () => {
      this.formValidation()
      .then(() => {
        if(!formHasErrors(initErrors, this.state) && !this.state.buttonDisabled)
          this.setState({ buttonDisabled: true, buttonText: 'Processing'}, this.addCharacter);
        else
          this.setState({ formBottomMessage: 'The form has errors', })
      });
    });
  }

  setFieldsDirty = null

  addCharacter = () => {
    const characterValues = getFormValues(initValues, this.state, key => key.substr(0, key.length - 5));
    const { currentUser, selectedCampaign, history } = this.props;
    const character = {
      userId     : currentUser._id,
      campaignId : selectedCampaign._id,
      ...characterValues,
    };

    Meteor.call('character.insert', character, (e, characterId) => {
      if (e)
        console.log("Error inserting character: ", e);
      else
        history.push(`/CharacterDetail/${ characterId }`);
    });
  }

  characterConfigs = [];
  generateFormConfiguration = () => {
    if(this.characterConfigs.length > 0) return this.characterConfigs;
    const { character, spells, skills, feats } = this.props;
    this.characterConfigs.push(
      getCharacterInfoConfiguration(character),
      getCharacterInventoryConfiguration(character),
      getCharacterStatConfiguration(character),
      getCharacterSkillConfiguration(character, spells, skills, feats),
    );
  }

  render() {
    const {
      // other
      buttonDisabled,
      formBottomMessage,
    } = this.state;
    const { character } = this.props;

    if(this.characterConfigs.length === 0 && character) this.generateFormConfiguration()

    if(this.characterConfigs.length === 0) return <div></div>;

    return (
    <div className="character-detail-page grid-container">
    {this.characterConfigs.map((config, i) => (
    <ConfigurableForm
      key={i}
      configuration={config}
      getAllDirtyFn={fn => this.setFieldsDirty = fn}
    />
    ))
    }
    </div>
    )
  }
}

const trackedCharacterDetailPage = withTracker(({ selectedCharacter, history }) => {
  // if we don't have a character selected, then we should redirect
  if(!selectedCharacter) {
    history.push('/character-list');
    return { character : {}, spells : [], skills : [], feats : [] };
  }

  const _id = selectedCharacter._id;
  Meteor.subscribe('characters');
  Meteor.subscribe('spells');
  Meteor.subscribe('skills');
  Meteor.subscribe('feats');
  return {
    character : Characters.find({ _id }).fetch()[0],
    spells    : Spells.find().fetch(),
    skills    : Skills.find().fetch(),
    feats     : Feats.find().fetch(),
  }
})(CharacterDetailPage);

const mapStateToProps = ({ appReducer : { selectedCharacter } }) => ({
  selectedCharacter,
})

export default connect(mapStateToProps)(trackedCharacterDetailPage)
