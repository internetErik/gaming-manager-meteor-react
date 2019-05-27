
/**
 * Sets all fields to dirty
 *
 * @param  {Object} initialDirty All the dirty flags so we can set them all false
 * @return {Object}              An object containaining all dirty flags set to false
 */
export const getDirtyFields = initialDirty =>
  Object.keys(initialDirty).reduce((acc, key) => acc = { ...acc, [key]: true}, {})

/**
 * Checks to see if there are errors in a form
 *
 * @param  {Object} initialErrors All the errors, so we can look up what the current state is
 * @param  {Object} state         The state of the form
 * @return {Boolean}              True if there is an error, false if there is no error
 */
export const formHasErrors = (initialErrors, state) =>
  Object.keys(initialErrors).reduce((acc, key) => acc || state[key], false)

/**
 * Get an object with all the values we are concerned with for the form
 *
 * @param  {Object} initialValues The object with initial values, used to lookup interesting fields
 * @param  {Object} state         The state of the form
 * @return {Object}               Collection of all the values we need for the form
 */
export const getFormValues = (initialValues, state, keyTransform = v=>v) =>
  Object.keys(initialValues).reduce((acc, key) => ({
    ...acc,
    [keyTransform(key)] : state[key]
  }), {})