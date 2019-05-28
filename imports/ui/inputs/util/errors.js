
export const errorRequired = value => value === null || value === '' || value === void(0)

export const errorNotEmpty = value => errorRequired(value.trim())