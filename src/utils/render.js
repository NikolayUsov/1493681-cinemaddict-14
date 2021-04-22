import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTEREND: 'afterend',
  BEFOREEND: 'beforeend',
};


export const renderElement = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (template instanceof Abstract) {
    template = template.getElement();
  }

  container.insertAdjacentElement(place, template);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};
