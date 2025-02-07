import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import { searchGoogleBooks } from "../utils/API";
import Auth from "../utils/auth";

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchInput) return;
    
    try {
      const { items } = await searchGoogleBooks(searchInput);
      setSearchResults(items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (book) => {
    if (!Auth.loggedIn()) return;
    try {
      await saveBook({
        variables: { bookData: book },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((book) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <button onClick={() => handleSaveBook(book)}>Save Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;