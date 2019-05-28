import React from 'react';

import {
  InputText,
  InputTextarea,
  InputInt,
  InputDate,
  InputSelect,
  formHasErrors,
  getFormValues,
  ConfigurableForm,
} from '../../inputs';

import {
  errorRequired,
} from '../../inputs/util/errors';

const config = {
  types : {
    InputText,
  },
  errorTypes : {
    errorRequired,
  },
  form : [
    {
      type  : 'InputText',
      name  : 'testField',
      label : 'Test Field',
      defaultValue : '',
      defaultDirty : false,
      defaultErrors : {
        errorRequired : { value : false, message : 'This field is Required' },
      },
    },
    {
      type  : 'InputText',
      name  : 'testField2',
      label : 'Test Field 2',
      defaultValue : '',
      defaultDirty : false,
      defaultErrors : {
        errorRequired : { value : false, message : 'This field is Required' },
      },
    },
  ],
};

export default class TestFormPage extends React.Component {
  handleChange = change => {
    const [ values, dirty, errors ] = change;
    console.log(change);
  }

  render() {
    return (
    <ConfigurableForm
      configuration={config}
      onChange={this.handleChange}
    />
    );
  }
}