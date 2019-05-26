import React from 'react';
import PropTypes from 'prop-types';

export default class InputToggle extends React.Component {

  static propTypes = {
    className       : PropTypes.string,
    fieldName       : PropTypes.string.isRequired,
    fieldValue      : PropTypes.bool.isRequired,
    getFieldChanged : PropTypes.func.isRequired,
    setFieldDirty   : PropTypes.func.isRequired,
    leftLabelText   : PropTypes.string.isRequired,
    rightLabelText  : PropTypes.string.isRequired,
    hasError        : PropTypes.bool,
    disabled        : PropTypes.bool,
    resultValueKey  : PropTypes.func,
  }

  componentDidMount() {
    const { fieldName, getFieldChanged } = this.props;
    if(this.checkbox.checked)
      getFieldChanged({
        [this.resultValueKeyFunction(fieldName)]: true,
      });
  }

  // string -> string
  resultValueKeyFunction = fieldName => this.props.resultValueKey ? this.props.resultValueKey(fieldName) : `${fieldName}Value`;

  render() {
    const {
      className,
      fieldName,
      fieldValue,
      getFieldChanged,
      setFieldDirty,
      leftLabelText,
      rightLabelText,
      hasError,
      disabled,
      resultValueKey,
    } = this.props;
    return (
    <div className={`input-toggle ${className || ''}`}>
      <input
        type="checkbox"
        className="input-checkbox__checkbox dn"
        id={fieldName}
        checked={fieldValue}
        ref={checkbox => this.checkbox = checkbox}
        onChange={
          () => {
            getFieldChanged({
              [this.resultValueKeyFunction(fieldName)]: !fieldValue,
            });
            setFieldDirty && setFieldDirty({[fieldName + 'Dirty']: true})
          }
        }
      />
      <label
        htmlFor={fieldName}
        className={`input-checkbox__label curp df posr w100% dib aic`}
      >
      <span className={`fxg1 ${fieldValue ? 'c-black' : 'c-gray'}`}>{ leftLabelText }</span>
      <div className="fxg5 posr h12">
        <span
          className={`posa h12 w12 bgc-black round-element trs-l-0.3s ${fieldValue ? 'l0' : 'l100%'}`}
        ></span>
        <div className="posa t5 h2 w100% bgc-black"></div>
      </div>
      <span className={`fxg1 tar ${fieldValue ? 'c-gray' : 'c-black'}`}>{ rightLabelText }</span>
      </label>
    </div>
    )
  }
}