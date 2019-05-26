
export const positionStyle = (position, customPosition) => (
    position === 'top-left'      ? 'posa t24 l24'
  : position === 'top-center'    ? 'posa t24 center-hori'
  : position === 'top-right'     ? 'posa t24 r24'
  : position === 'center-left'   ? 'posa l24 center-vert'
  : position === 'center'        ? 'posa center'
  : position === 'center-right'  ? 'posa r24 center-vert'
  : position === 'bottom-left'   ? 'posa b24 l24'
  : position === 'bottom-center' ? 'posa b24 center-hori'
  : position === 'bottom-right'  ? 'posa b24 r24'
  : position === 'custom'        ? customPosition
  : ''
)

export const positionStyleMd = (position, customPosition) => (
    position === 'top-left'      ? 'posa@md t24@md l24@md'
  : position === 'top-center'    ? 'posa@md t24@md center-hori@md'
  : position === 'top-right'     ? 'posa@md t24@md r24@md'
  : position === 'center-left'   ? 'posa@md l24@md center-vert@md'
  : position === 'center'        ? 'posa@md center@md'
  : position === 'center-right'  ? 'posa@md r24@md center-vert@md'
  : position === 'bottom-left'   ? 'posa@md b24@md l24@md'
  : position === 'bottom-center' ? 'posa@md b24@md center-hori@md'
  : position === 'bottom-right'  ? 'posa@md b24@md r24@md'
  : position === 'custom'        ? customPosition
  : ''
)

export const positionStyleSm = (position, customPosition) => (
    position === 'top-left'      ? 'posa@sm t24@sm l24@sm'
  : position === 'top-center'    ? 'posa@sm t24@sm center-hori@sm'
  : position === 'top-right'     ? 'posa@sm t24@sm r24@sm'
  : position === 'center-left'   ? 'posa@sm l24@sm center-vert@sm'
  : position === 'center'        ? 'posa@sm center@sm'
  : position === 'center-right'  ? 'posa@sm r24@sm center-vert@sm'
  : position === 'bottom-left'   ? 'posa@sm b24@sm l24@sm'
  : position === 'bottom-center' ? 'posa@sm b24@sm center-hori@sm'
  : position === 'bottom-right'  ? 'posa@sm b24@sm r24@sm'
  : position === 'custom'        ? customPosition
  : ''
)