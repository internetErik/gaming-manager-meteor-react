//https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if(typeof value === 'object' && value !== null) {
      if(seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};

export const deepCopy = object =>
  JSON.parse(JSON.stringify(object, getCircularReplacer()))