import { isBrowser } from './environment-detection';

// All the elements we are going to event on
const elements = new WeakMap();

/**
 * Set up initial state of a new element we are eventing on
 *
 * @param  {Node}   ele The element
 * @return {Object}     Initial state
 */
const getInitialState = ele => ({
  listeners       : {},
  keys            : [],
  lastY           : 0,
  lastYDown       : 0,
  lastTouchDeltaY : 0,
  touchDeltaY     : 0,
  callback           : wheelHandler.bind(null, ele),
  touchstartCallback : handleTouchstart.bind(null, ele),
  touchmoveCallback  : handleTouchmove.bind(null, ele),
  touchendCallback   : handleTouchend.bind(null, ele),
})

/**
 * Start eventing on an element's scroll
 *
 * @param  {Node} ele The event we are eventing on
 */
export const registerElement = ele => {
  if(!ele) {
    console.warn('Element is invalid', ele);
    return;
  }

  if(!elements.has(ele)) {
    const initState = getInitialState(ele);
    elements.set(ele, initState);
    ele.addEventListener('wheel', initState.callback);
    ele.addEventListener('touchstart', initState.touchstartCallback);
    ele.addEventListener('touchmove', initState.touchmoveCallback);
    ele.addEventListener('touchend', initState.touchendCallback);
  }
  else
    console.warn(`Element (${ ele }) already registered`);
}

/**
 * Stop eventing on an element's scroll
 *
 * @param  {[type]} ele The element we were evengint on
 */
export const unregisterElement = ele => {
  const state = elements.get(ele);
  ele.removeEventListener('wheel', state.callback);
  ele.removeEventListener('touchstart', state.touchstartCallback);
  ele.removeEventListener('touchmove', state.touchmoveCallback);
  ele.removeEventListener('touchend', state.touchendCallback);
  elements.delete(ele);
}

/**
 * Start listening on an element
 *
 * @param  {Node}     ele      The element we are listening on
 * @param  {String}   name     The name of the listener we are adding
 * @param  {Function} callback Every time this element events, call this
 */
export const addScrollListener = (ele, name, callback) => {
  const item = elements.get(ele);
  if(!item){
    console.warn('Element not registered');
    return;
  }

  if(!item.listeners[name]){
    item.listeners[name] = callback;
    item.keys = Object.keys(item.listeners);
    elements.set(ele, item);
  }
  else
    console.warn(`Scroll Listener ${ name } already exists on element:`, ele);
}

/**
 * Stop listening on an element
 *
 * @param  {Node}   ele  The element we are listening on
 * @param  {String} name The name of the listener we are removing
 */
export const removeScrollListener = (ele, name) => {
  const update = { ...elements.get(ele) };
  delete update.listeners[name];
  update.keys = Object.keys(update.listeners);
}

/**
 * On every wheel action on an element, this fires and sets updates
 * to all listeners
 *
 * @param  {Node}   ele  The element we are listening on
 * @param  {Event}  e    The original event
 */
const wheelHandler = (ele, e) => {
  const last = elements.get(ele);
  const curr = {
    y  : Math.max((last.lastY + e.deltaY), 0),
    dY : e.deltaY,
  };

  const update = handleUpdateClients(ele, e, last, curr);

  elements.set(ele, { ...last, ...update });
}

/**
 * When we begin a touch, we register it by saving the lastX and lastY as
 * the position touched
 *
 * @param  {Node}   ele  The element we are listening on
 * @param  {Event}  e    The original event
 */
const handleTouchstart = (ele, e) => {
  e.preventDefault();
  const update = elements.get(ele);
  update.touchDeltaY = 0;
  update.lastTouchDeltaY = 0;
  update.lastYDown = e.changedTouches[0].pageY;
  elements.set(ele, update);
}

/**
 * When we begin moving with touch we capture the different in the direction
 * moved so we can add it to how far we have scrolled
 *
 * @param  {Node}   ele  The element we are listening on
 * @param  {Event}  e    The original event
 */
const handleTouchmove = (ele, e) => {
  e.preventDefault();
  const last = elements.get(ele);
  // if touchstart isn't working, then we can set our own touchstart
  if(!last.lastY) {
    elements.set(ele, { ...last, lastY : e.touches[0].pageY });
    console.warn('touchstart does not seem to be working');
    return;
  }

  const { pageY } = e.touches[0];

  const lastTouchDeltaY = last.lastYDown - pageY;
  const curr = {
    y  : Math.max((last.lastY + lastTouchDeltaY), 0),
    dY : lastTouchDeltaY,
  }

  const update = handleUpdateClients(ele, e, last, curr);

  const touchDeltaY = last.touchDeltaY + lastTouchDeltaY;
  const lastYDown = pageY;
  elements.set(ele, { ...last, ...update, touchDeltaY, lastTouchDeltaY, lastYDown });
}

/**
 * When we begin moving with touch we capture the different in the direction
 * moved so we can add it to how far we have scrolled
 *
 * @param  {Node}   ele  The element we are listening on
 * @param  {Event}  e    The original event
 */
const handleTouchend = (ele, e) => {
  e.preventDefault();
  const last = elements.get(ele);

  // if touchstart isn't working, then we can set our own touchstart
  if(!last.lastY) {
    elements.set(ele, { ...last, lastY : e.touches[0].pageY });
    console.warn('touchstart does not seem to be working');
    return;
  }

  const lastTouchDeltaY = last.lastYDown - pageY;
  const curr = {
    finalDY : last.touchDeltaY,
  };

  const update = handleUpdateClients(ele, e, last, curr);

  elements.set(ele, { ...last, ...update });
}

/**
 * Actually handles updating clients with new information. Allows an abstraction
 * over mouse wheel or touchmove
 *
 * @param  {Node}   ele  The element we are listening on
 * @param  {Event}  e    The original event
 * @param  {Object} last The last state sent
 * @param  {Object} curr The current scroll change
 * @return {Object}      The updates to the state
 */
const handleUpdateClients = (ele, e, last, curr) => {
  const update = {}

  // actually send updates
  last.keys.forEach(key => last.listeners[key] && last.listeners[key](e, { ...curr }));

  update.lastY = curr.y;

  return update;
}

// automatically register window for scroll events when on browser
isBrowser && registerElement(window);

