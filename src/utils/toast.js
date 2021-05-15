const SHOW_TIME = 5000;

const ToastMessages = {
  OPEN_POP_UP: 'Can\'t show comments.Offline mode',
  OFFLINE_SEND_COMMENT: 'You can\'t send comment. Offline mode',
  OFFLINE_DELETE_COMMENT: 'You can\'t delete comment. Offline mode',
};

const createToastContiner = () => {
  const toastContainer = document.createElement('div');
  toastContainer.classList.add('toast-container');
  document.body.append(toastContainer);
};

const toast = (message) => {
  if (document.querySelector('.toast-container') === null) {
    createToastContiner();
  }
  const toastContainer = document.querySelector('.toast-container');
  const toastItem = document.createElement('div');
  toastItem.textContent = message;
  toastItem.classList.add('toast-item');

  toastContainer.append(toastItem);

  setTimeout(() => {
    toastItem.remove();
    if (!toastContainer.firstChild) {
      toastContainer.remove();
    }
  }, SHOW_TIME);
};

export { toast, ToastMessages };
