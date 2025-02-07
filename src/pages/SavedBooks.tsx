import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({ variables: { bookId } });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  const savedBooks = data?.me?.savedBooks || [];

  return (
    <div>
      <h2>Saved Books</h2>
      {savedBooks.map((book) => (
        <div key={book.bookId}>
          <h3>{book.title}</h3>
          <button onClick={() => handleDeleteBook(book.bookId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SavedBooks;