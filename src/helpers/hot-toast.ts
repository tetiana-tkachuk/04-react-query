import toast from 'react-hot-toast';

export const notify = (message: string) => toast.error(message);

export const toastOptions = {
  className: '',
  style: {
    // border: '1px solid #ccc',
    padding: '16px',
    color: '#0a66c2',
  },
};
