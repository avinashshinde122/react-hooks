import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("React Hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const clearSearchTextRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${searchText}`
      );
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    getResults();
  };

  const handleClear = event => {
    event.preventDefault();
    setSearchText("");
    clearSearchTextRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <h1 className="text-grey-darkest text-2xl">React Hooks News </h1>
      <img
        src="https://icon.now.sh/react/c0c"
        alt="react logo"
        className="float-right h-12"
      />
      <form onSubmit={handleOnSubmit} className="mb-2">
        <input
          type="text"
          placeholder="search"
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          ref={clearSearchTextRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange-500 m-1  p-1 px-4 rounded">
          Search
        </button>
        <input
          type="button"
          value="Clear"
          onClick={handleClear}
          className="bg-teal-500 text-white m-1  p-1 px-4 rounded"
        />
      </form>
      {loading ? (
        <p className="font-bold text-orange-900">Loading....</p>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                href={result.url}
                className="text-indigo-300 hover:text-indigo-600"
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red font-bold">{error.message}</p>}
    </div>
  );
};
