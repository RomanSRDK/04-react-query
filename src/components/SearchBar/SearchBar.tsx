import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get("query") as string;

    if (!searchValue.trim()) {
      toast.error("Please enter your search query", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    onSubmit(searchValue);
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
          TMDB
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
      </div>
    </header>
  );
}
