// track observers
const observers = {};

export const addMutationListener = (name, rootNode, callback) => {
  const config = { attributes: false, childList: true, subtree: true };
  if(!observers[name]) {
    const observer = new MutationObserver(callback);
    observer.observe(rootNode, config);
    observers[name] = observer;
  }
  else
    console.warn(`Mutation Observer ${name} already exists.`)
}

export const removeMutationListener = name => {
  observers[name].disconnect()
  delete observers[name];
}
