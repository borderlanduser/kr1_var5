export const render = (component, container, place = 'beforeend') => {
  if (!component || !component.getElement()) {
    throw new Error('Component or component.getElement() is undefined');
  }

  const containerElement = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;

  if (!containerElement) {
    throw new Error('Container not found');
  }

  switch (place) {
    case 'afterbegin':
      containerElement.prepend(component.getElement());
      break;
    case 'beforeend':
      containerElement.append(component.getElement());
      break;
    default:
      containerElement.append(component.getElement());
  }
};