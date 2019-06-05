import React from 'react';
import PropTypes from 'prop-types';

export default class InputMultiSelect extends React.Component {

  static propTypes = {
    className       : PropTypes.string,
    inputClassName  : PropTypes.string,
    fieldName       : PropTypes.string.isRequired,
    // [{ label: 'Something', value : 'something', selected : false },]
    fieldValue      : PropTypes.array.isRequired,
    getFieldChanged : PropTypes.func.isRequired,
    setFieldDirty   : PropTypes.func.isRequired,
    labelText       : PropTypes.string,
    hasError        : PropTypes.bool,
    disabled        : PropTypes.bool,

    openPopup       : PropTypes.bool,
  }

  handleChange = value => {
    const { fieldValue, getFieldChanged, setFieldDirty } = this.props;
    const newValues = fieldValue.map(option => {
      if(option.value === value) option.selected = !option.selected;
      return option;
    })
    getFieldChanged({ [`${ fieldName }Value`] : newValues });
    setFieldDirty && setFieldDirty({[`${ fieldName }Dirty`] : true})
  }

  renderMultiSelect = () => {
    const { fieldName, fieldValue } = this.props;
    const memo = {};
    return fieldValue.map(({ label, value, selected }, i) => {
      if(memo[value]){
        console.warn('In InputMultiSelect: multiple entries with the same value');
        return <div></div>;
      }
      memo[value] = true;
      return (
      <div
        key={i}
        className="input-multi-select__option"
      >
        <label htmlFor={`${ fieldName }${ value }`}>
        { label }
        </label>
        <input
          type="checkbox"
          className="input-checkbox__checkbox"
          id={`${ fieldName }${ value }`}
          checked={selected}
          ref={checkbox => this.checkbox = checkbox}
          onChange={() => this.handleChange(value)}
        />
      </div>
      )
    })
  }

  render() {
    const { className } = this.props;

    return (
    <div className={`input-multi-select ${ className || '' }`}>
    { this.renderMultiSelectr() }
    </div>
    )
  }
}