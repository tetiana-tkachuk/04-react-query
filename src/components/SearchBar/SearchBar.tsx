import { Toaster } from 'react-hot-toast';
import { notify, toastOptions } from '../../helpers/hot-toast';

import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = (formData.get('query') as string).trim();
    if (!query) {
      notify('Please enter your search query.');
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDBcss
        </a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
        <Toaster toastOptions={toastOptions} />
      </div>
    </header>
  );
}
