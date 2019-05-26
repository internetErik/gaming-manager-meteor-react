import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import {
  InputText,
  InputTextarea,
  InputDate,
  InputSelect,
  formHasErrors,
} from '../../inputs';

import {
  defaultCharacter,
  initValues,
  initDirty,
  initErrors,
} from './constants';

class CharacterFormPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initValues,
      ...initDirty,
      ...initErrors,
      buttonDisabled    : false,
      formBottomMessage : '',
    }
  }

  handleFieldChanged = change => this.setState({ ...change, formBottomMessage: '' }, this.formValidation)

  formValidation = () => new Promise((resolve, reject) => {
    const { campaignNameValue, campaignNameDirty } = this.state;
    const errors = {}

    if(campaignNameDirty) {
      errors.campaignNameRequired = campaignNameValue === '';
    }

    this.setState(errors, resolve);
  })

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ campaignNameDirty : true }, () => {
      this.formValidation()
      .then(() => {
        if(!formHasErrors(initErrors, this.state) && !this.state.buttonDisabled)
          this.setState({ buttonDisabled: true, buttonText: 'Processing'}, this.addCampaign);
        else
          this.setState({ formBottomMessage: 'The form has errors', })
      });
    });
  }

  addCharacter = characterValues => {
    const { currentUser, selectedCampaign, history } = this.props;
    const character = {
      ...defaultCharacter,
      userId        : currentUser._id,
      campaignId    : selectedCampaign._id,
      // reduce all values for the character
      ...(
        Object.keys(characterValues)
        .reduce((acc, key) => ({
          ...acc,
          // length - 5 in order to remove 'Value'
          [ key.substr(0, key.length - 5) ] : characterValues[key],
        }) ,{})
      )
    };

    Meteor.call('character.insert', character, (e, characterId) => {
      if (e)
        console.log("Error inserting character: ", e);
      else
        history.push(`/CharacterDetail/${ characterId }`);
    });
  }

  render() {
    const {
      // values
      firstNameValue,
      middleNameValue,
      lastNameValue,
      titleValue,
      characterTypeValue,
      raceValue,
      sexValue,
      heightMValue,
      heightCmValue,
      weightValue,
      birthdayValue,
      ageValue,
      descriptionValue,
      hpValue,
      strValue,
      intValue,
      wisValue,
      conValue,
      dexValue,
      chaValue,
      backstoryValue,

      // error
      firstNameRequired,
      middleNameRequired,
      lastNameRequired,
      titleRequired,
      characterTypeRequired,
      raceRequired,
      sexRequired,
      heightMRequired,
      heightCmRequired,
      weightRequired,
      birthdayRequired,
      ageRequired,
      descriptionRequired,
      hpRequired,
      strRequired,
      intRequired,
      wisRequired,
      conRequired,
      dexRequired,
      chaRequired,
      backstoryRequired,

      // other
      buttonDisabled,
      formBottomMessage,
    } = this.state;

    return (
    <div className="character-form-page grid-container">
      <h1>Character Creation</h1>
      <hr/>
      <form onSubmit={this.handleSubmit}>
        <section className="p20-0 m20-0">
          <InputSelect
            labelText="Character Type"
            fieldName="characterType"
            fieldValue={characterTypeValue}
            getFieldChanged={this.handleFieldChanged}
            setFieldDirty={this.handleFieldChanged}
            hasError={characterTypeRequired}
          >
            <option value="PC">PC</option>
            <option value="NPC">NPC</option>
          </InputSelect>
        </section>
        <section className="p20-0 m20-0">
          <h2>Name</h2>
          <div className="p10-0">
            <InputText
              labelText="First Name"
              fieldName="firstName"
              fieldValue={firstNameValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Middle Name"
              fieldName="middleName"
              fieldValue={middleNameValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Last Name"
              fieldName="lastName"
              fieldValue={lastNameValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Title"
              fieldName="title"
              fieldValue={titleValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
        </section>
        <hr />
        <section className="p20-0 m20-0">
          <h2>Biological Information</h2>
          <div className="p10-0">
            <InputText
              labelText="Race"
              fieldName="race"
              fieldValue={raceValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Sex"
              fieldName="sex"
              fieldValue={sexValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0 df aic">
            <InputText
              className="dib"
              labelText="Height"
              fieldName="heightM"
              fieldValue={heightMValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
            m
            <InputText
              className="dib"
              labelText="Height"
              fieldName="heightCm"
              fieldValue={heightCmValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
            cm
          </div>
          <div className="p10-0 df aic">
            <InputText
              className="dib"
              labelText="Weight"
              fieldName="weight"
              fieldValue={weightValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
            kg
          </div>
          <div className="p10-0">
            <InputDate
              labelText="Birthday"
              fieldName="birthday"
              fieldValue={birthdayValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Age"
              fieldName="age"
              fieldValue={ageValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputTextarea
              labelText="Description"
              fieldName="description"
              fieldValue={descriptionValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
        </section>
        <hr />
        <section className="p20-0 m20-0">
          <h2>Stats</h2>
          <div className="p10-0">
            <InputText
              labelText="Hit Points (hp)"
              fieldName="hp"
              fieldValue={hpValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Strength (str)"
              fieldName="str"
              fieldValue={strValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="INtelligence (int)"
              fieldName="int"
              fieldValue={intValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Wisdom (wis)"
              fieldName="wis"
              fieldValue={wisValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Constitution (con)"
              fieldName="con"
              fieldValue={conValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Dexterity (dex)"
              fieldName="dex"
              fieldValue={dexValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputText
              labelText="Charisma (cha)"
              fieldName="cha"
              fieldValue={chaValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
        </section>
        <hr />
        <section className="p20-0 m20-0">
          <h2>Backstory</h2>
          <InputTextarea
            fieldName="backstory"
            fieldValue={backstoryValue}
            getFieldChanged={this.handleFieldChanged}
            setFieldDirty={this.handleFieldChanged}
          />
        </section>
        <button { ...(buttonDisabled ? { disabled : true } : { }) }>
          Create Character
        </button>
        <div>
        { formBottomMessage }
        </div>
      </form>
    </div>
    )
  }
}

export default CharacterFormPage;
