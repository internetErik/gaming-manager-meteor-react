import React from 'react';
import PropTypes from 'prop-types';

export default class ConfigurableForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialValues : {},
      initialDirty  : {},
      initialErrors : {},
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

  componentWillMount() {
    const { configuration : { form, types, errorTypes } } = this.props;
    const initialValues = {};
    const initialDirty  = {};
    const initialErrors = {};
    form.forEach(({ name, defaultValue, defaultDirty, defaultErrors, }) => {
      initialValues[`${ name }Value`] = defaultValue;
      initialDirty[`${ name }Dirty`]  = defaultDirty;
      Object.keys(defaultErrors)
      .forEach(errorType => initialErrors[`${ name }.${ errorType }`] = defaultErrors[errorType])
    })

    this.setState({
      initialValues, initialDirty, initialErrors,
      values : initialValues,
      dirty  : initialDirty,
      errors : initialErrors,
    })
  }

  handleFieldChanged = change => {
    const values = { ...this.state.values, ...change };
    this.setState({ values }, () => this.formValidation().then(this.callOnChange))
  }

  handleFieldDirty = change => {
    const dirty = { ...this.state.dirty, ...change };
    this.setState({ dirty })
  }

  callOnChange = () => this.props.onChange([
    this.state.errors,
    this.state.dirty,
    this.state.values,
  ])

  formValidation = () => new Promise((resolve, reject) => {
    const { initialErrors, dirty, values } = this.state;
    const { configuration : { errorTypes } } = this.props;

    // start with all errors in default state;
    const errors = { ...initialErrors };

    // iterate through all errors and check them
    Object.keys(initialErrors).forEach(key => {
      const [ fieldName, errorType ] = key.split('.');
      // only test field if it is dirty
      if(dirty[`${ fieldName }Dirty`])
        errors[`${ fieldName }.${ errorType }`] =
          errorTypes[errorType](values[`${ fieldName }Value`])
    })

    this.setState({ errors }, resolve)
  })

  generateForm = () => {
    const { configuration : { types, form } } = this.props;
    const { values } = this.state;
    return form.map((({ type, name, label, children }) => {
      const Input = types[type];
      if(!Input) {
        console.warn(`Bad type '${ type }'`);
        return <div></div>
      }
      return (
      <div key={name}>
        <Input
          fieldName={name}
          fieldValue={values[`${ name }Value`]}
          getFieldChanged={this.handleFieldChanged}
          setFieldDirty={this.handleFieldDirty}
          labelText={label || name}
        >
        { children }
        </Input>
      </div>
      )
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