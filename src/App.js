import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleRandomSearch = async () => {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&origin=*`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    const randomPageId = json.query.random[0].id;
    const randomEndpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&origin=*&pageids=${randomPageId}`;

    const randomResponse = await fetch(randomEndpoint);

    if (!randomResponse.ok) {
      throw Error(randomResponse.statusText);
    }

    const randomJson = await randomResponse.json();

    const randomSearchResult = randomJson.query.pages[randomPageId];

    setResults([randomSearchResult]);
    setSearchInfo({ totalhits: 1 });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=${search}`;

    const response = await fetch(endpoint);

    console.log(response);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  return (
    <div className="App">
      <header>
        <h1>Wiki Searcher</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-box"
            type="search"
            placeholder="Search Wikipedia"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
        <button className="button" onClick={handleRandomSearch}>
          Random Search
        </button>
        {searchInfo.totalhits ? (
          <p className="search-results">
            {" "}
            Search Results: {searchInfo.totalhits}
          </p>
        ) : (
          ""
        )}
      </header>
      {results.length > 0 ? (
        <div className="results">
          {results.map((result) => {
            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
            return (
              <div className="result" key={result.pageid}>
                <h3>{result.title}</h3>
                <div
                  className="preview"
                  dangerouslySetInnerHTML={{ __html: result.snippet }}
                />
                <a
                  className="button"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <>{search !== "" ? <p> No results found.</p> : ""}</>
      )}
    </div>
  );
}

export default App;
