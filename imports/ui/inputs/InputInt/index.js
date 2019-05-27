import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../InputText';

/**
 * Takes the value of a form input and fomats it to a money format
 *
 * @param  {string} value The current value of the input
 * @param  {string} max   The highest number value possible - will override value
 * @return {string}       New value for the input
 */
const formatNumberField = (value, input) => {
  const num = parseInt(value, 10);
  input.value = (Number.isNaN(num)) ? '' : num;
  return (Number.isNaN(num)) ? '' : num;
}

const InputInt = props => (
<div className={`input-money ${props.outerClassName || ''}`}>
  <InputText
    {...props}
    fieldValue={''+props.fieldValue}
    valueFormatter={formatNumberField}
    selectOnFocus={(props.selectOnFocus === false) || true}
  />
</div>
);

InputInt.propTypes = {
  className      : PropTypes.string,
  outerClassName : PropTypes.string,
  fieldName      : PropTypes.string.isRequired,
  fieldValue     : PropTypes.number.isRequired,
  getFieldChanged: PropTypes.func.isRequired,
  setFieldDirty  : PropTypes.func.isRequired,
  labelText      : PropTypes.string,
  hasError       : PropTypes.bool,
  selectOnFocus  : PropTypes.bool,
  onKeyUp        : PropTypes.func,
};

export default InputInt;
