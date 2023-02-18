import { SyntheticEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Results from "./types/Results";
import Music from "./Music";

type Theme = "light" | "dark";
type FontStyle = "serif" | "sans" | "mono";
function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>();
  const [theme, setTheme] = useState<Theme>("light");
  const [fontStyle, setFontStyle] = useState<FontStyle>("serif");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Type a word to search in dictionary");

  const fetchData = async () => {
    setLoading(true);
    let res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
    );

    let data: Results = await res.json();
    console.log(data);
    setResults(data);
    if (Array.isArray(data)) {
      setMessage("No results found.");
    }
    setLoading(false);
  };

  useEffect(() => {
    let el = document.getElementById("html");
    el?.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    let el = document.getElementById("html");
    el?.setAttribute("data-font", fontStyle);
  }, [fontStyle]);

  useEffect(() => {
    if (search && search != "") {
      fetchData();
    } else {
      setMessage("Type a word to search in dictionary");
      setResults(undefined);
    }
    console.log("searching");
  }, [search]);

  return (
    <div className="">
      <header>
        <div className="container py-4 px-6  max-w-5xl flex items-center justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          <div className="flex items-center space-x-10">
            <div className="header__dropdown">
              <div className="flex">
                {fontStyle.toLocaleUpperCase()}{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div className="dropdown__list-wrapper">
                <input className="dropdown__item-check" type={"checkbox"} />
                <div className="dropdown__list">
                  {["serif", "sans", "mono"].map((d, i) => (
                    <p key={i} onClick={() => setFontStyle(d as FontStyle)}>
                      {d.toUpperCase()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="header__switch flex items-center space-x-2">
              <div className="header__switch-slider relative flex items-center">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTheme("dark");
                    } else setTheme("light");
                  }}
                  className="theme-switch"
                  type={"checkbox"}
                />
                <div className="switch "></div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-6 max-w-5xl py-10">
        <form
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              search: { value: string };
            };
            console.log(target.search.value);
            setSearch(target.search.value);
          }}
          className="flex rounded-md py-2 px-4 bg-gray-200 dark:bg-gray-800 items-center"
        >
          <input
            // onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="Search"
            className="w-full bg-transparent border-none outline-none"
            type={"text"}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>

        {loading ? (
          <p className="mt-4">Loading...</p>
        ) : results && results.length > 0 ? (
          <div className="flex flex-col mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold">{search}</h2>

              <Music
                audio={
                  results[0].phonetics.filter(
                    (p) => p.audio && p.audio !== "" && p.text && p.text !== ""
                  )[0].audio
                }
              />
            </div>
            <h3 className="text-2xl text-blue-600 dark:text-blue-300">
              {
                results[0].phonetics.filter(
                  (p) => p.audio && p.audio !== "" && p.text && p.text !== ""
                )[0].text
              }
            </h3>

            <section className="mt-6 flex flex-col space-y-10">
              {results[0].meanings.map((m, i) => {
                return (
                  <div key={i} className="">
                    <div className="flex items-center space-x-5">
                      <h4 className="text-xl font-bold">{m.partOfSpeech}</h4>
                      <div className="h-1 w-full border-b dark:border-b-slate-700" />
                    </div>
                    <h5 className="text-xl mt-3 text-gray-500 dark:text-gray-400 font-semibold">
                      Meaning
                    </h5>
                    <ul className="list-disc mt-2">
                      {m.definitions.map((d, i) => (
                        <li key={i} className="text-lg">
                          {d.definition}
                        </li>
                      ))}
                    </ul>
                    {m.synonyms.length > 0 && (
                      <p className="mt-5">
                        Synonyms -{" "}
                        <span className="text-blue-600 dark:text-blue-300 font-bold">
                          {m.synonyms.join(", ")}
                        </span>
                      </p>
                    )}
                    {m.antonyms.length > 0 && (
                      <p className="mt-3">
                        Antonymns -{" "}
                        <span className="text-blue-600 dark:text-blue-300  font-bold">
                          {m.antonyms.join(", ")}
                        </span>
                      </p>
                    )}
                  </div>
                );
              })}
            </section>
          </div>
        ) : (
          <p className="mt-6 font-semibold">{message}</p>
        )}
      </main>
    </div>
  );
}

export default App;
