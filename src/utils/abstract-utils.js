export const createNode = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstChild;
};
