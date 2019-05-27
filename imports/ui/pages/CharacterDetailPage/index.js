import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Characters } from '/imports/api';

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

class CharacterDetailPage extends React.Component {

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
    <div className="character-detail-page grid-container">
      <div *ngIf="campaign && character">
  <section class="p20-0 m20-0">
    <a id="name"></a>
    <h2>Name</h2>
    <h1>
      { character.title }
      { character.firstName }
      { character.middleName }
      { character.lastName }
      ({ character.characterType })
    </h1>

    <div class="p10-0">
      <label for="firstName" class="w125">First Name*:</label>
      <input id="firstName" type="text" [(ngModel)]="character.firstName">
    </div>
    <div class="p10-0">
      <label for="middleName" class="w125">Middle Name:</label>
      <input id="middleName" type="text" [(ngModel)]="character.middleName">
    </div>
    <div class="p10-0">
      <label for="lastName" class="w125">Last Name:</label>
      <input id="lastName" type="text" [(ngModel)]="character.lastName">
    </div>
    <div class="p10-0">
      <label for="title" class="w125">Title:</label>
      <input id="title" type="text" [(ngModel)]="character.title">
    </div>
    <div class="p10-0">
      <label for="characterType" class="w125">Character Type: </label>
      <select id="characterType" [(ngModel)]="character.characterType">
        <option value="PC">PC</option>
        <option value="NPC">NPC</option>
      </select>
    </div>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="religion"></a>
    <h2>Religion/Morals</h2>
    <div class="p10-0">
      <label for="alignment" class="w125">Deity: </label>
      <input type="text" [(ngModel)]="character.deity">
    </div>
    <div class="p10-0">
      <label for="alignment" class="w125">Alignment: </label>
      <input type="text" [(ngModel)]="character.alignment">
    </div>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="biological"></a>
    <h2>Biological Information</h2>
    <div class="p10-0">
      <label for="race" class="w125">Race:</label>
      <input type="text" [(ngModel)]="character.race">
    </div>
    <div class="p10-0">
      <label for="sex" class="w125">Sex:</label>
      <input type="text" [(ngModel)]="character.sex">
    </div>
    <div class="p10-0">
      <label for="height" class="w125">Height:</label>
      { character.heightM } m { character.heightCm } cm
    </div>
    <div class="p10-0">
      <label for="weight" class="w125">Weight:</label>
      { character.weight } kg
    </div>
    <div class="p10-0">
      <label for="age" class="w125">Birthday:</label>
      <input type="text" [(ngModel)]="character.birthday">
    </div>
    <div class="p10-0">
      <label for="age" class="w125">Age:</label>
      <input type="number" min="0" max="9999" [(ngModel)]="character.age">
    </div>
    <div class="p10-0">
      <label for="description" class="w125">Description:</label>
      <br/ >
      <textarea id="description" cols="45" rows="10" [(ngModel)]="character.description"></textarea>
    </div>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="equipment"></a>
    <h2>Equipment</h2>
    <div class="p10-0">
      <label for="inventory" class="w125">Inventory:</label>
      <br/ >
      <textarea id="inventory" cols="45" rows="10" [(ngModel)]="character.inventory"></textarea>
    </div>
    <h3>Money</h3>
    <div class="p10-0">
      <label for="bronze">Bronze:</label>
      <input id="bronze" type="number" min="0" [(ngModel)]="character.bronze">
      <label for="silver">Silver:</label>
      <input id="silver" type="number" min="0" [(ngModel)]="character.silver">
      <label for="gold">Gold:</label>
      <input id="gold" type="number" min="0" [(ngModel)]="character.gold">
    </div>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="general"></a>
    <h2>General Attributes</h2>
    <div class="p10-0">
        <label for="str" class="w125">HP:</label>
        { character.hp + character.hpBonus - character.damage }
        <br/ >
        Base: <input type="number" min="-100" max="9999" [(ngModel)]="character.hp">
        Damage: <input type="number" min="0" max="9999" [(ngModel)]="character.damage">
        Bonus: <input type="number" min="-9999" max="9999" [(ngModel)]="character.hpBonus">
    </div>
    <div class="p10-0">
        <label for="str" class="w125">Strength:</label>
        { character.str + character.strBonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.str">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.strBonus">
    </div>
    <div class="p10-0">
        <label for="int" class="w125">Intelligence:</label>
        { character.int + character.intBonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.int">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.intBonus">
    </div>
    <div class="p10-0">
        <label for="wis" class="w125">Wisdom:</label>
        { character.wis + character.wisBonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.wis">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.wisBonus">
    </div>
    <div class="p10-0">
        <label for="con" class="w125">Constitution:</label>
        { character.con + character.conBonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.con">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.conBonus">
    </div>
    <div class="p10-0">
        <label for="dex" class="w125">Dexterity:</label>
        { character.dex + character.dexBonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.dex">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.dexBonus">
    </div>
    <div class="p10-0">
        <label for="cha" class="w125">Charisma:</label>
        { character.cha + character.chaBonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.cha">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.chaBonus">
    </div>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="combat"></a>
    <h2>Combat Attributes</h2>
    <div class="p10-0">
      <label for="hitRoll" class="w125">Hit Roll:</label>
      {  getHitRoll()  }
      <br/ >
      Base: <input type="number" min="0" max="100" [(ngModel)]="character.hitRoll">
      Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.hitRollBonus">
    </div>
    <div class="p10-0">
      <label for="ac" class="w125">Evade:</label>
      {  character.evade + character.block + character.evadeBonus  }
      <br/ >
      Base: <input type="number" min="-100" max="100" [(ngModel)]="character.evade">
      Block: <input type="number" min="-100" max="100" [(ngModel)]="character.block">
      Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.evadeBonus">
    </div>
    <div class="p10-0">
      <label for="ac" class="w125">Armor Class:</label>
      {  character.ac + character.acBonus  }
      <br/ >
      Base: <input type="number" min="-100" max="100" [(ngModel)]="character.ac">
      Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.acBonus">
    </div>
    <div class="p10-0">
      <label for="movement" class="w125">Movement:</label>
      { character.movement + character.movementBonus }
      <br/ >
      Base: <input type="number" min="0" max="100" [(ngModel)]="character.movement">
      Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.movementBonus">
    </div>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="magic"></a>
    <h2>Magic</h2>
    <h3>Caster Level: {  getCasterLevel()  }</h3>
    <h3>Effortless Spells</h3>
    <div class="p10-0">
      <label for="level0" class="w125">Level 0:</label>
        { character.level0 + character.level0Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level0">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level0Bonus">
    </div>
    <div class="p10-0">
      <label for="level1" class="w125">Level 1:</label>
        { character.level1 + character.level1Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level1">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level1Bonus">
    </div>
    <div class="p10-0">
      <label for="level2" class="w125">Level 2:</label>
        { character.level2 + character.level2Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level2">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level2Bonus">
    </div>
    <div class="p10-0">
      <label for="level3" class="w125">Level 3:</label>
        { character.level3 + character.level3Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level3">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level3Bonus">
    </div>
    <div class="p10-0">
      <label for="level4" class="w125">Level 4:</label>
        { character.level4 + character.level4Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level4">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level4Bonus">
    </div>
    <div class="p10-0">
      <label for="level5" class="w125">Level 5:</label>
        { character.level5 + character.level5Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level5">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level5Bonus">
    </div>
    <div class="p10-0">
      <label for="level6" class="w125">Level 6:</label>
        { character.level6 + character.level6Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level6">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level6Bonus">
    </div>
    <div class="p10-0">
      <label for="level7" class="w125">Level 7:</label>
        { character.level7 + character.level7Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level7">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level7Bonus">
    </div>
    <div class="p10-0">
      <label for="level8" class="w125">Level 8:</label>
        { character.level8 + character.level8Bonus }
        <br/ >
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level8">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level8Bonus">
    </div>
    <div class="p10-0">
      <label for="level9" class="w125">Level 9:</label>
        { character.level9 + character.level9Bonus }
        <br />
        Base: <input type="number" min="0" max="100" [(ngModel)]="character.level9">
        Bonus: <input type="number" min="-100" max="100" [(ngModel)]="character.level9Bonus">
    </div>

    <h3 class="pt20">Spell Fail Rate</h3>
    <div class="p10-0">
      <label class="w125">Level 0:</label>
      { character.level0Fail - character.level0FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level0Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level0FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 1:</label>
      { character.level1Fail - character.level1FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level1Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level1FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 2:</label>
      { character.level2Fail - character.level2FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level2Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level2FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 3:</label>
      { character.level3Fail - character.level3FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level3Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level3FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 4:</label>
      { character.level4Fail - character.level4FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level4Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level4FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 5:</label>
      { character.level5Fail - character.level5FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level5Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level5FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 6:</label>
      { character.level6Fail - character.level6FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level6Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level6FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 7:</label>
      { character.level7Fail - character.level7FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level7Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level7FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 8:</label>
      { character.level8Fail - character.level8FailBonus }%
      <br />
      Base: <input type="number" [(ngModel)]="character.level8Fail" min="0" max="100">%
      Bonus: <input type="number" [(ngModel)]="character.level8FailBonus" min="0" max="100">%
    </div>
    <div class="p10-0">
      <label class="w125">Level 9:</label>
      { character.level9Fail - character.level9FailBonus }%
      <br/ >
      Base: <input type="number"
        [(ngModel)]="character.level9Fail" min="0" max="100">%
      Bonus: <input type="number"
        [(ngModel)]="character.level9FailBonus" min="0" max="100">%
    </div>
    <a id="spelllist"></a>
    <h3 class="pt20">Spell List</h3>
    <spell-filter [spells]="characterSpells"
      (sortChanged)="sortLearnedSpells($event)"
      (filterChanged)="filterLearnedSpells($event)"></spell-filter>

    <spell-list [spells]="characterSpells" [spellsRemovable]="true"
        (spellRemoved)="unlearnSpell($event)"></spell-list>

    <button onClick="showSpellModal = true">Add Spells</button>

  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="skills"></a>
    <h2>Skills</h2>
    <h3>Skill List</h3>
    <skill-list [skills]="character.skills"
      [skillsRemoveable]="true"
      (skillRemoved)="unlearnSkill($event)"></skill-list>

    <button onClick="showSkillModal = true">Add Skill</button>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="feats"></a>
    <h2>Feats</h2>
    <h3>Feat List</h3>
    <feat-list [feats]="character.feats"
      [featsRemoveable]="true"
      (featRemoved)="unlearnFeat($event)"></feat-list>

    <button onClick="showFeatModal = true">Add Feat</button>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="notes"></a>
    <h2>Notes</h2>
    <div class="p10-0">
      <textarea cols="45" rows="10" [(ngModel)]="character.notes"></textarea>
    </div>
  </section>
  <hr />
  <section class="p20-0 m20-0">
    <a id="backstory"></a>
    <h2>Backstory</h2>
    <div class="p10-0">
      <textarea cols="45" rows="10" [(ngModel)]="character.backstory"></textarea>
    </div>
  </section>

  <div class="p30-0" *ngIf="currentUser._id === character.userId">
    <button onClick="deleteCharacter($event)">Delete</button>
  </div>
</div>
{showSpellModal &&
<section class="p20 oa bgc-white h80% w80% add-shadow posf center z1">
<button class="posf t0 r0 border-circle"
  onClick="showSpellModal = false">&times;</button>
<spell-filter [spells]="spells"
  (sortChanged)="sortAllSpells($event)"
  (filterChanged)="filterAllSpells($event)"></spell-filter>

<spell-list [spells]="spells" [spellsSelectable]="true"
  (spellSelected)="learnSpell($event)"></spell-list>
</section>
}
{showSkillModal &&
<section class="p20 oa bgc-white h80% w80% add-shadow posf center z1">
  <button class="posf t0 r0 border-circle"
    onClick="showSkillModal = false">&times;</button>
  <skill-list [skills]="skills" [skillsSelectable]="true"
    (skillSelected)="learnSkill($event)"></skill-list>
</section>
}
{showFeatModal &&
<section class="p20 oa bgc-white h80% w80% add-shadow posf center z1">
  <button class="posf t0 r0 border-circle"
    onClick="showFeatModal = false">&times;</button>
  <feat-list [feats]="feats" [featsSelectable]="true"
    (featSelected)="learnFeat($event)"></feat-list>
</section>
}
<character-jump-menu
  [saveMessage]="saveMessage"
  (characterSaved)="updateCharacter()"></character-jump-menu>
    </div>
    )
  }
}

const trackedCharacterDetailPage = withTracker(({ selectedCharacter, history }) => {
  if(!selectedCharacter) {
    history.push('/character-list');
    return { character : {} };
  }

  Meteor.subscribe('characters');
  const _id = selectedCharacter._id;
  return {
    character : Character.find({ _id }).fetch(),
  }
})(CharacterDetailPage);

const mapStateToProps = ({ appReducer : { selectedCharacter } }) => ({
  selectedCharacter,
})

export default connect(mapStateToProps)(trackedCharacterDetailPage)
