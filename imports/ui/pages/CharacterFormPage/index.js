import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  InputText,
  InputTextarea,
  InputInt,
  InputDate,
  InputSelect,
  formHasErrors,
  getFormValues,
} from '../../inputs';

import {
  initValues,
  testValues,
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

  componentDidMount() {
    window.testData = this.testData;
  }

  testData = () => this.setState({ ...testValues }, this.formValidation)

  handleFieldChanged = change => this.setState({ ...change, formBottomMessage: '' }, this.formValidation)

  formValidation = () => new Promise((resolve, reject) => {
    const {
      firstNameValue     , firstNameDirty,
      characterTypeValue,
      heightMValue       , heightMDirty,
      heightCmValue      , heightCmDirty,
      weightValue        , weightDirty,
      hpValue            , hpDirty,
      strValue           , strDirty,
      intValue           , intDirty,
      wisValue           , wisDirty,
      conValue           , conDirty,
      dexValue           , dexDirty,
      chaValue           , chaDirty,
    } = this.state;

    const errors = {}

    if(firstNameDirty)
      errors.firstNameRequired = firstNameValue === '';

    if(heightMDirty)
      errors.heightMRequired = heightMValue === '';

    if(heightCmDirty)
      errors.heightCmRequired = heightCmValue === '';

    if(weightDirty)
      errors.weightRequired = weightValue === '';

    if(hpDirty)
      errors.hpRequired = hpValue === '';

    if(strDirty)
      errors.strRequired = strValue === '';

    if(intDirty)
      errors.intRequired = intValue === '';

    if(wisDirty)
      errors.wisRequired = wisValue === '';

    if(conDirty)
      errors.conRequired = conValue === '';

    if(dexDirty)
      errors.dexRequired = dexValue === '';

    if(chaDirty)
      errors.chaRequired = chaValue === '';

    this.setState({ ...initErrors, ...errors }, resolve);
  })

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

  addCharacter = () => {
    const characterValues = getFormValues(initValues, this.state, key => key.substr(0, key.length - 5));
    const { currentUser, selectedCampaign, history } = this.props;
    const character = {
      userId        : currentUser._id,
      campaignId    : selectedCampaign._id,
      ...characterValues,
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
      characterTypeRequired,
      heightMRequired,
      heightCmRequired,
      weightRequired,
      hpRequired,
      strRequired,
      intRequired,
      wisRequired,
      conRequired,
      dexRequired,
      chaRequired,

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
          <div className="p10-0">
            <div>Height</div>
            <div className="df aic">
              <InputInt
                className="dib"
                fieldName="heightM"
                fieldValue={heightMValue}
                getFieldChanged={this.handleFieldChanged}
                setFieldDirty={this.handleFieldChanged}
              />
              m
              <InputInt
                className="dib"
                fieldName="heightCm"
                fieldValue={heightCmValue}
                getFieldChanged={this.handleFieldChanged}
                setFieldDirty={this.handleFieldChanged}
              />
              cm
            </div>
          </div>
          <div className="p10-0">
            <div>Weight</div>
            <div className="df aic">
              <InputInt
                className="dib"
                fieldName="weight"
                fieldValue={weightValue}
                getFieldChanged={this.handleFieldChanged}
                setFieldDirty={this.handleFieldChanged}
              />
              kg
            </div>
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
            <InputInt
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
            <InputInt
              labelText="Hit Points (hp)"
              fieldName="hp"
              fieldValue={hpValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputInt
              labelText="Strength (str)"
              fieldName="str"
              fieldValue={strValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputInt
              labelText="Intelligence (int)"
              fieldName="int"
              fieldValue={intValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputInt
              labelText="Wisdom (wis)"
              fieldName="wis"
              fieldValue={wisValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputInt
              labelText="Constitution (con)"
              fieldName="con"
              fieldValue={conValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputInt
              labelText="Dexterity (dex)"
              fieldName="dex"
              fieldValue={dexValue}
              getFieldChanged={this.handleFieldChanged}
              setFieldDirty={this.handleFieldChanged}
            />
          </div>
          <div className="p10-0">
            <InputInt
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

const mapStateToProps = ({ appReducer : { selectedCampaign } }) => ({
  selectedCampaign,
})

export default connect(mapStateToProps)(CharacterFormPage);
