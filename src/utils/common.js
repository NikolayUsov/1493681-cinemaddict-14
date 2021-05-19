
export const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export const isObject = (obj) => {
  return obj !== null && obj.constructor.name === 'Object';
};

export const deepClone = (obj) => {
  const cloneObject = {};
  for (const i in obj) {
    if (isObject(obj[i])) {
      cloneObject[i] = deepClone(obj[i]);
      continue;
    }
    cloneObject[i] = obj[i];
  }

  return cloneObject;
};

export const createNode = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstChild;
};
