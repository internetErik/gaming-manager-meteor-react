import React from 'react';
import PropTypes from 'prop-types';

import InputError from '../InputError';

export default class ConfigurableForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      values : {},
      dirty  : {},
      errors : {},
    }
  }

  static propTypes = {
    className     : PropTypes.string,
    configuration : PropTypes.object.isRequired,
    onChange      : PropTypes.func.isRequired,
  }

  initialValues = {};
  initialDirty  = {};
  initialErrors = {};

  componentWillMount() {
    const { configuration : { form } } = this.props;
    form.forEach(row => {
      if(Array.isArray(row)) {
        row.forEach(this.setupInput);
        return;
      }

      this.setupInput(row)
    })

    this.setState({
      values : this.initialValues,
      dirty  : this.initialDirty,
      errors : this.initialErrors,
    })
  }

  setupInput = ({ name, defaultValue, defaultDirty, defaultErrors }) => {
    this.initialValues[`${ name }Value`] = defaultValue;
    this.initialDirty[`${ name }Dirty`]  = defaultDirty;
    Object.keys(defaultErrors)
    .forEach(errorType => {
      const { value } =  defaultErrors[errorType]
      this.initialErrors[`${ name }.${ errorType }`] = value;
    })
  }

  handleFieldChanged = change => {
    const values = { ...this.state.values, ...change };
    this.setState({ values }, () => this.formValidation().then(this.callOnChange))
  }

  handleFieldDirty = change => {
    const dirty = { ...this.state.dirty, ...change };
    this.setState({ dirty }, () => this.formValidation())
  }

  callOnChange = () => this.props.onChange([
    this.state.errors,
    this.state.dirty,
    this.state.values,
  ])

  formValidation = () => new Promise((resolve, reject) => {
    const { dirty, values } = this.state;
    const { configuration : { errorTypes } } = this.props;

    // start with all errors in default state;
    const errors = { ...this.initialErrors };

    // iterate through all errors and check them
    Object.keys(this.initialErrors).forEach(key => {
      const [ fieldName, errorType ] = key.split('.');
      // only test field if it is dirty
      if(dirty[`${ fieldName }Dirty`])
        errors[`${ fieldName }.${ errorType }`] =
          errorTypes[errorType](values[`${ fieldName }Value`])
    })

    this.setState({ errors }, resolve)
  })

  generateHeading = ele => {}

  generateInput = ({ type, name, label, defaultErrors, children }) => {
    const { configuration : { types } } = this.props;
    const { values, errors } = this.state;
    const Input = types[type];
    if(!Input) {
      console.warn(`Bad type '${ type }'`);
      return <div></div>
    }

    const errorKeys = Object.keys(defaultErrors);
    const hasError =
      errorKeys.reduce((acc, errorType) => acc ? acc : errors[`${ name }.${ errorType }`], false);

    return (
    <div key={name}>
      <Input
        fieldName={name}
        fieldValue={values[`${ name }Value`]}
        getFieldChanged={this.handleFieldChanged}
        setFieldDirty={this.handleFieldDirty}
        labelText={label || name}
        hasError={hasError}
      >
      { children }
      </Input>
      {
        errorKeys.map((errorType) => {
          const { message } = defaultErrors[errorType];
          return (
          <InputError
            key={errorType}
            hasError={errors[`${ name }.${ errorType }`]}
            renderMessage={() => <span>{ message }</span>}
          />
          )
        })
      }
    </div>
    )
  }

  generateInputRow = (row, key) => {
    return (
    <div
      key={key}
      className="configurable-form-row df aic"
    >
    {
      row.map(this.generateInput)
    }
    </div>
    )
  }

  generateForm = () => {
    const { configuration : { form } } = this.props;
    return form.map(((ele, i) => {

      if(Array.isArray(ele))
        return this.generateInputRow(ele, i)

      return this.generateInput(ele);

    }))
  }

  render() {
    const { className } = this.props;

    return (
    <div className={`configurable-form ${ className || '' }`}>
    { this.generateForm() }
    </div>
    )
  }
}