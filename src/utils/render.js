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
