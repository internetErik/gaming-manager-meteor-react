
/**
 * [description]
 * @param  {[type]}   destination [description]
 * @param  {Number}   duration    [description]
 * @param  {String}   easing      [description]
 * @param  {Function} callback    [description]
 * @return {[type]}               [description]
 */
export const windowScrollTo = (destination, duration = 600, easing = 'linear', callback) => {
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const { innerHeight } = window;
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const destinationOffset = getDestinationOffset(destination);
  const destinationOffsetToScroll = getDestinationOffsetToScroll(documentHeight, destinationOffset, innerHeight);

  if('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if(callback) callback();
    return;
  }

  const scroll = () => {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start)) + start));
    if(window.pageYOffset === destinationOffsetToScroll) {
      if(callback) callback();
      return;
    }
    requestAnimationFrame(scroll);
  }

  scroll();
}

/**
 * [description]
 * @param  {[type]}   target        [description]
 * @param  {[type]}   contentHeight [description]
 * @param  {[type]}   destination   [description]
 * @param  {Number}   duration      [description]
 * @param  {String}   easing        [description]
 * @param  {Function} callback      [description]
 * @return {[type]}                 [description]
 */
export const elementScrollTo = (target, contentHeight, destination, duration = 600, easing = 'linear', callback) => {
  const start = target.scrollTop;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const { innerHeight } = window;
  const destinationOffset = getDestinationOffset(destination);
  const destinationOffsetToScroll = getDestinationOffsetToScroll(contentHeight, destinationOffset, innerHeight);

  if('requestAnimationFrame' in window === false) {
    target.scrollTop = destinationOffsetToScroll;
    if(callback) callback();
    return;
  }

  const scroll = () => {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    target.scrollTop = Math.ceil((time * (destinationOffsetToScroll - start)) + start);
    if(target.scrollTop === destinationOffsetToScroll) {
      if(callback) callback();
      return;
    }
    requestAnimationFrame(scroll);
  }

  scroll();
}

/**
 * [description]
 * @param  {[type]} destination [description]
 * @return {[type]}             [description]
 */
const getDestinationOffset = destination =>
  typeof destination === 'number' ? destination : destination.offsetTop;

/**
 * [description]
 * @param  {[type]} documentHeight    [description]
 * @param  {[type]} destinationOffset [description]
 * @param  {[type]} innerHeight       [description]
 * @return {[type]}                   [description]
 */
const getDestinationOffsetToScroll = (documentHeight, destinationOffset, innerHeight) =>
  Math.round(documentHeight - destinationOffset < innerHeight ? documentHeight - innerHeight : destinationOffset);
