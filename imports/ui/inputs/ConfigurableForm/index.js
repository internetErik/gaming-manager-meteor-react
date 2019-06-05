import React from 'react';
import PropTypes from 'prop-types';

import InputError from '../InputError';

export default class ConfigurableForm extends React.Component {

  constructor(props) {
    super(props);

    const { configuration : { form } } = props;

    // iterate through form elements to set up initial state
    // this will also populate initialValues, etc
    form.forEach(row => {
      if(Array.isArray(row))
        row.forEach(this.setupInput);
      else
        this.setupInput(row)
    })

    this.state = {
      values : this.initialValues,
      dirty  : this.initialDirty,
      errors : this.initialErrors,
    }
  }

  // these are used for resetting form, or getting the expected field keys
  initialValues = {};
  initialDirty  = {};
  initialErrors = {};

  static propTypes = {
    className      : PropTypes.string,
    configuration  : PropTypes.object.isRequired,
    onChange       : PropTypes.func,
    getSetDirtyFn  : PropTypes.func,
    getAllValuesFn : PropTypes.func,
    getAllDirtyFn  : PropTypes.func,
    getAllErrorsFn : PropTypes.func,
  }

  shouldComponentUpdate(newProps, newState) {
    // only update this form when there is a new internal state
    return this.state !== newState;
  }

  componentDidMount() {
    // provide outside world a way to flag everything as dirty (e.g., for onSubmit)
    const { onChange, getSetDirtyFn, getAllValuesFn, getAllDirtyFn, getAllErrorsFn } = this.props;
    if(getSetDirtyFn) getSetDirtyFn(this.setAllDirty);

    if(getAllValuesFn) getAllValuesFn(() => this.state.values);
    if(getAllDirtyFn) getAllDirtyFn(() => this.state.dirty);
    if(getAllErrorsFn) getAllErrorsFn(() => this.state.errors);

    // now that this component is loaded give initial values to external world once
    if(onChange) this.callOnChange();
  }

  /**
   * Function that sets all fields dirty (based on entried in initialDirty)
   */
  setAllDirty = () => new promise((resolve, reject) => {
    const dirty = object.keys(this.initialDirty).reduce((acc, key) => ({ ...acc, [key] : true }), {})
    this.setState({ dirty }, resolve);
  });

  /**
   * When component constructor is run it calls this to setup all the initial
   * values in order to generate the first state
   *
   * @param  {String} element.type          The type of the form element
   * @param  {String} element.name          The name (fieldName) of the form element
   * @param  {Object} element.defaultValue  The default value of form element
   * @param  {Object} element.defaultDirty  The default dirty/touched state of the element
   * @param  {Object} element.defaultErrors What errors are true/false by default
   */
  setupInput = ({ type, name, defaultValue, defaultDirty, defaultErrors }) => {
    if(type === 'CUSTOM') return;

    this.initialValues[`${ name }Value`] = defaultValue;
    this.initialDirty[`${ name }Dirty`]  = defaultDirty;
    Object.keys(defaultErrors)
    .forEach(errorType => {
      const { value } =  defaultErrors[errorType]
      this.initialErrors[`${ name }.${ errorType }`] = value;
    })
  }

  /**
   * Whenever a form field changes, this updates the values and sends this data
   * to consumer of ConfirugableForm
   *
   * @param  {Object} change Object representing the change in the form
   */
  handleFieldChanged = change => {
    const values = { ...this.state.values, ...change };
    this.setState({ values }, () => this.formValidation().then(this.callOnChange))
  }

  /**
   * When a form field is blurred it seeks to flag itself as dirty/touched
   *
   * @param  {Object} change contains info about field being flagged dirty
   */
  handleFieldDirty = change => {
    const dirty = { ...this.state.dirty, ...change };
    this.setState({ dirty }, () => this.formValidation())
  }

  /**
   * When there is a change on the form, we update the outside world with this
   * method
   */
  callOnChange = () => this.props.onChange && this.props.onChange ([
    this.state.errors,
    this.state.dirty,
    this.state.values,
  ])

  /**
   * Validates the form using the configured error checks
   */
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

  /**
   * Generates the react elements for representing a configured element based
   * on its configuration
   *
   * @param  {String} element.type          the type of input of 'CUSTOM' for an element that has a render function
   * @param  {String} element.name          field name of the input
   * @param  {String} element.label         Label for input if one is used
   * @param  {Object} element.defaultErrors Used for generating error messages and figuring out if we are in an error state
   * @param  {Object} element.children      Children, in case an input (e.g., select) needs them
   * @param  {func}   element.render        Non-input types will use the render method to display themselves
   * @param  {Number} key                   Used to give a unique key for diffing CUSTOM elements
   * @return {Object}                       Input/Element being rendered
   */
  generateInput = ({ type, name, label, defaultErrors, children, render }, key) => {
    const { configuration : { types } } = this.props;
    const { values, errors } = this.state;

    if(type === 'CUSTOM') return render(key+'CUSTOM', values, errors);

    const Input = types[type];
    if(!Input) {
      console.warn(`Bad type '${ type }'`);
      return <></>
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
        labelText={label}
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

  /**
   * This if for times when a nested array is found in the form configuration
   *
   * @param  {Array} row The row of inputs being rendered
   * @param  {Object} key used for react diffing
   * @return {Object}     Row or inputs
   */
  generateInputRow = (row, key) => (
  <div
    key={key}
    className="configurable-form-row df aic"
  >
  { row.map(this.generateInput) }
  </div>
  )

  /**
   * Determines how best to generate the parts of the form
   *
   * @return {Array} The form and other things being generated by the configuration
   */
  generateForm = () => this.props.configuration.form.map(((ele, i) =>
    Array.isArray(ele) ? this.generateInputRow(ele, i) : this.generateInput(ele, i)
  ))

  render() {
    const { className } = this.props;

    return (
    <div className={`configurable-form ${ className || '' }`}>
    { this.generateForm() }
    </div>
    )
  }
}