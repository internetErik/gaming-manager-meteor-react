import React from 'react';

import {
  InputText,
  InputTextarea,
  InputInt,
  InputDate,
  InputSelect,
  InputMultiSelect,
  formHasErrors,
  getFormValues,
  ConfigurableForm,
} from '../../inputs';

import {
  errorRequired,
} from '../../inputs/util/errors';

const getDefaultTextInput = () => ({
  type          : 'InputText',
  defaultValue  : '',
  defaultDirty  : false,
  defaultErrors : {
    errorRequired : { value : false, message : 'This field is Required' },
  },
})

const getDefaultIntInput = () => ({
  type          : 'InputInt',
  defaultValue  : '',
  defaultDirty  : false,
  defaultErrors : {
    errorRequired : { value : false, message : 'This field is Required' },
  },
})

export const getCharacterInfoConfiguration = characterData => ({
  types : {
    InputText,
    InputSelect,
    InputInt,
    InputDate,
    InputTextarea,
  },
  errorTypes : {
    errorRequired,
  },
  form : [
    {
      ...getDefaultTextInput(),
      name  : 'firstName',
      label : 'First Name',
      defaultValue : characterData.firstName,
    },
    {
      ...getDefaultTextInput(),
      name  : 'middleName',
      label : 'Middle Name',
      defaultValue :  characterData.middleName,
    },
    {
      ...getDefaultTextInput(),
      name  : 'lastName',
      label : 'Last Name',
      defaultValue : characterData.lastName,
    },
    {
      ...getDefaultTextInput(),
      name  : 'title',
      label : 'Title',
      defaultValue : characterData.title,
    },
    {
      type  : 'InputSelect',
      name  : 'characterType',
      label : 'Character Type',
      defaultValue : characterData.characterType,
      children : [
      <option key="NPC" value="NPC">NPC</option>,
      <option key="PC" value="PC">PC</option>,
      ],
      defaultDirty : false,
      defaultErrors : {
        errorRequired : { value : false, message : 'This field is Required' },
      },
    },
    {
      ...getDefaultTextInput(),
      name  : 'deity',
      label : 'Deity',
      defaultValue : characterData.deity || '',
    },
    {
      type  : 'InputSelect',
      name  : 'alignment',
      label : 'Alignment',
      defaultValue : characterData.alignment,
      children : [
      <option key="Lawful Good" value="Lawful Good">Lawful Good</option>,
      <option key="Neutral Good" value="Neutral Good">Neutral Good</option>,
      <option key="Chaotic Good" value="Chaotic Good">Chaotic Good</option>,
      <option key="Lawful Neutral" value="Lawful Neutral">Lawful Neutral</option>,
      <option key="Neutral Neutral" value="Neutral Neutral">Neutral</option>,
      <option key="Chaotic Neutral" value="Chaotic Neutral">Chaotic Neutral</option>,
      <option key="Lawful Evil" value="Lawful Evil">Lawful Evil</option>,
      <option key="Neutral Evil" value="Neutral Evil">Neutral Evil</option>,
      <option key="Chaotic Evil" value="Chaotic Evil">Chaotic Evil</option>,
      ],
      defaultDirty : false,
      defaultErrors : {
        errorRequired : { value : false, message : 'This field is Required' },
      },
    },
    {
      ...getDefaultTextInput(),
      name  : 'race',
      label : 'Race',
      defaultValue : characterData.race,
    },
    {
      ...getDefaultTextInput(),
      name  : 'sex',
      label : 'Sex',
      defaultValue : characterData.sex,
    },
    {
      ...getDefaultIntInput(),
      name  : 'heightM',
      defaultValue : characterData.heightM,
    },
    {
      ...getDefaultIntInput(),
      name  : 'heightCm',
      defaultValue : characterData.heightCm,
    },
    {
      ...getDefaultIntInput(),
      name  : 'weight',
      defaultValue : characterData.weight,
    },
    {
      type  : 'InputDate',
      name  : 'birthday',
      label : 'Birthday',
      defaultValue : characterData.birthday,
      defaultDirty : false,
      defaultErrors : {
        errorRequired : { value : false, message : 'This field is Required' },
      },
    },
    {
      ...getDefaultIntInput(),
      name  : 'age',
      defaultValue : characterData.age,
    },
    {
      type  : 'InputTextarea',
      name  : 'description',
      label : 'Description',
      defaultValue : characterData.description,
      defaultDirty : false,
      defaultErrors : {
        errorRequired : { value : false, message : 'This field is Required' },
      },
    },
    {
      type  : 'InputTextarea',
      name  : 'notes',
      label : 'Notes',
      defaultValue : characterData.notes,
      defaultDirty : false,
      defaultErrors : {},
    },
    {
      type  : 'InputTextarea',
      name  : 'backstory',
      label : 'Backstory',
      defaultValue : characterData.backstory,
      defaultDirty : false,
      defaultErrors : {},
    },
   ]
 })

export const getCharacterInventoryConfiguration = characterData => ({
  types : {
    InputText,
    InputSelect,
    InputInt,
    InputDate,
    InputTextarea,
  },
  errorTypes : {
    errorRequired,
  },
  form : [
    {
      ...getDefaultIntInput(),
      name  : 'bronze',
      defaultValue : characterData.bronze,
      defaultErrors : {},
    },
    {
      ...getDefaultIntInput(),
      name  : 'silver',
      defaultValue : characterData.silver,
      defaultErrors : {},
    },
    {
      ...getDefaultIntInput(),
      name  : 'gold',
      defaultValue : characterData.gold,
      defaultErrors : {},
    },
    {
      type  : 'InputTextarea',
      name  : 'inventory',
      label : 'Inventory',
      defaultValue : characterData.inventory,
      defaultDirty : false,
      defaultErrors : {},
    },
  ]
})


export const getCharacterStatConfiguration = characterData => ({
  types : {
    InputText,
    InputSelect,
    InputInt,
    InputDate,
    InputTextarea,
  },
  errorTypes : {
    errorRequired,
  },
  form : [
    {
      ...getDefaultIntInput(),
      name  : 'hp',
      label : 'HP',
      defaultValue : characterData.hp,
    },
    {
      ...getDefaultIntInput(),
      name  : 'damage',
      label : 'Damage',
      defaultValue : characterData.damage,
    },
    {
      ...getDefaultIntInput(),
      name  : 'hpBonus',
      label : 'HP Bonus',
      defaultValue : characterData.hpBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'str',
      label : 'str',
      defaultValue : characterData.str,
    },
    {
      ...getDefaultIntInput(),
      name  : 'int',
      label : 'int',
      defaultValue : characterData.int,
    },
    {
      ...getDefaultIntInput(),
      name  : 'wis',
      label  : 'wis',
      defaultValue : characterData.wis,
    },
    {
      ...getDefaultIntInput(),
      name  : 'con',
      label  : 'con',
      defaultValue : characterData.con,
    },
    {
      ...getDefaultIntInput(),
      name  : 'dex',
      label  : 'dex',
      defaultValue : characterData.dex,
    },
    {
      ...getDefaultIntInput(),
      name  : 'cha',
      label  : 'cha',
      defaultValue : characterData.cha,
    },
    {
      ...getDefaultIntInput(),
      name  : 'strBonus',
      label  : 'str Bonus',
      defaultValue : characterData.strBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'intBonus',
      label  : 'int Bonus',
      defaultValue : characterData.intBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'wisBonus',
      label  : 'wis Bonus',
      defaultValue : characterData.wisBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'conBonus',
      label  : 'con Bonus',
      defaultValue : characterData.conBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'dexBonus',
      label  : 'dex Bonus',
      defaultValue : characterData.dexBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'chaBonus',
      label  : 'cha Bonus',
      defaultValue : characterData.chaBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'movement',
      label  : 'Movement',
      defaultValue : characterData.movement,
    },
    {
      ...getDefaultIntInput(),
      name  : 'movementBonus',
      label  : 'Movement Bonus',
      defaultValue : characterData.movementBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'hitRoll',
      label  : 'Hit Roll',
      defaultValue : characterData.hitRoll,
    },
    {
      ...getDefaultIntInput(),
      name  : 'hitRollBonus',
      label  : 'Hit Roll Bonus',
      defaultValue : characterData.hitRollBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'ac',
      label  : 'AC',
      defaultValue : characterData.ac,
    },
    {
      ...getDefaultIntInput(),
      name  : 'acBonus',
      label  : 'AC Bonus',
      defaultValue : characterData.acBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'evade',
      label  : 'Evade',
      defaultValue : characterData.evade,
    },
    {
      ...getDefaultIntInput(),
      name  : 'evadeBonus',
      label  : 'Evade Bonus',
      defaultValue : characterData.evadeBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'block',
      label  : 'Block',
      defaultValue : characterData.block,
    },
  ]
})

export const getCharacterSkillConfiguration = (characterData, spells, skills, feats) => ({
  types : {
    InputText,
    InputSelect,
    InputInt,
    InputDate,
    InputTextarea,
  },
  errorTypes : {
    errorRequired,
  },
  form : [
    {
      ...getDefaultIntInput(),
      name  : 'level0',
      label : 'Level 0',
      defaultValue : characterData.level0,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level1',
      label : 'Level 1',
      defaultValue : characterData.level1,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level2',
      label : 'Level 2',
      defaultValue : characterData.level2,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level3',
      label : 'Level 3',
      defaultValue : characterData.level3,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level4',
      label : 'Level 4',
      defaultValue : characterData.level4,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level5',
      label : 'Level 5',
      defaultValue : characterData.level5,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level6',
      label : 'Level 6',
      defaultValue : characterData.level6,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level7',
      label : 'Level 7',
      defaultValue : characterData.level7,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level8',
      label : 'Level 8',
      defaultValue : characterData.level8,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level9',
      label : 'Level 9 ',
      label : 'Level 9',
      defaultValue : characterData.level9,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level0Bonus',
      label : 'Level 0 Bonus',
      defaultValue : characterData.level0Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level1Bonus',
      label : 'Level 1 Bonus',
      defaultValue : characterData.level1Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level2Bonus',
      label : 'Level 2 Bonus',
      defaultValue : characterData.level2Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level3Bonus',
      label : 'Level 3 Bonus',
      defaultValue : characterData.level3Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level4Bonus',
      label : 'Level 4 Bonus',
      defaultValue : characterData.level4Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level5Bonus',
      label : 'Level 5 Bonus',
      defaultValue : characterData.level5Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level6Bonus',
      label : 'Level 6 Bonus',
      defaultValue : characterData.level6Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level7Bonus',
      label : 'Level 7 Bonus',
      defaultValue : characterData.level7Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level8Bonus',
      label : 'Level 8 Bonus',
      defaultValue : characterData.level8Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level9Bonus',
      label : 'Level 9 Bonus',
      defaultValue : characterData.level9Bonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level0Fail',
      label : 'Level 0 Fail',
      defaultValue : characterData.level0Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level1Fail',
      label : 'Level 1 Fail',
      defaultValue : characterData.level1Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level2Fail',
      label : 'Level 2 Fail',
      defaultValue : characterData.level2Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level3Fail',
      label : 'Level 3 Fail',
      defaultValue : characterData.level3Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level4Fail',
      label : 'Level 4 Fail',
      defaultValue : characterData.level4Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level5Fail',
      label : 'Level 5 Fail',
      defaultValue : characterData.level5Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level6Fail',
      label : 'Level 6 Fail',
      defaultValue : characterData.level6Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level7Fail',
      label : 'Level 7 Fail',
      defaultValue : characterData.level7Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level8Fail',
      label : 'Level 8 Fail',
      defaultValue : characterData.level8Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level9Fail',
      label : 'Level 9 Fail',
      defaultValue : characterData.level9Fail,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level0FailBonus',
      label : 'Level 0 Fail Bonus',
      defaultValue : characterData.level0FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level1FailBonus',
      label : 'Level 1 Fail Bonus',
      defaultValue : characterData.level1FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level2FailBonus',
      label : 'Level 2 Fail Bonus',
      defaultValue : characterData.level2FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level3FailBonus',
      label : 'Level 3 Fail Bonus',
      defaultValue : characterData.level3FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level4FailBonus',
      label : 'Level 4 Fail Bonus',
      defaultValue : characterData.level4FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level5FailBonus',
      label : 'Level 5 Fail Bonus',
      defaultValue : characterData.level5FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level6FailBonus',
      label : 'Level 6 Fail Bonus',
      defaultValue : characterData.level6FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level7FailBonus',
      label : 'Level 7 Fail Bonus',
      defaultValue : characterData.level7FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level8FailBonus',
      label : 'Level 8 Fail Bonus',
      defaultValue : characterData.level8FailBonus,
    },
    {
      ...getDefaultIntInput(),
      name  : 'level9FailBonus',
      label : 'Level 9 Fail Bonus',
      defaultValue : characterData.level9FailBonus,
    },
    // {
    //   type  : 'InputMultiSelect',
    //   name  : 'spells',
    //   label : 'Spells',
    //   defaultValue : characterData.spells,
    //   defaultDirty : false,
    //   defaultErrors : {},
    //   children : spells.map(spell => {  }),
    // },
  ],
});
