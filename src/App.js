import { useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

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
    setShowBookmarks(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=50&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
    setShowBookmarks(false);
  };

  const handleSaveBookmark = async (result) => {
    try {
      const response = await axios.post("http://localhost:3000/bookmarks", {
        pageid: result.pageid,
        title: result.title,
        url: `https://en.wikipedia.org/?curid=${result.pageid}`,
      });

      if (response.status === 201) {
        alert("Bookmark saved!");
      }
    } catch (error) {
      console.error("There was an error saving the bookmark!", error);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bookmarks");
      setBookmarks(response.data);
      setShowBookmarks(true);
    } catch (error) {
      console.error("There was an error fetching the bookmarks!", error);
    }
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

        <div className="button-row">
          <button className="button" onClick={handleRandomSearch}>
            Random Search
          </button>
          <button className="button" onClick={fetchBookmarks}>
            View Bookmarks
          </button>
        </div>

        {searchInfo.totalhits ? (
          <p className="search-results">
            Search Results: {searchInfo.totalhits}
          </p>
        ) : (
          ""
        )}
      </header>

      {!showBookmarks && results.length > 0 ? (
        <div className="results">
          {results.map((result, index) => {
            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
            return (
              <div className="result" key={`${result.pageid}-${index}`}>
                <h3>{result.title}</h3>
                <div
                  className="preview"
                  dangerouslySetInnerHTML={{ __html: result.snippet }}
                />
                <div className="result-buttons">
                  <a
                    className="button read-more-button"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                  <button
                    className="button save-bookmark-button"
                    onClick={() => handleSaveBookmark(result)}
                  >
                    Save Bookmark
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Show bookmarks when showBookmarks is true */}
      {showBookmarks && bookmarks.length > 0 ? (
        <div className="bookmarks">
          <h2>Saved Bookmarks</h2>
          {bookmarks.map((bookmark, index) => (
            <div className="result" key={`${bookmark.pageid}-${index}`}>
              <h3>{bookmark.title}</h3>
              <a
                className="button"
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;