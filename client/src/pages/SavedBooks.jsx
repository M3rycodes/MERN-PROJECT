import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import {useMutation, useQuery} from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';


const SavedBooks = () => {

  const { loading, error, data} = useQuery(GET_ME);
  const [removeBookMutual] = useMutation(REMOVE_BOOK);

    // Conditional rendering to display loading message or saved books
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  
    if (error) {
      console.error(error);
      return <h2>Error fetching saved books!</h2>;
    }
  
    // Extract saved books from the query data
    const userData = data?.me || {};
    const savedBooks = userData?.savedBooks || [];
  
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
      try {
        // Execute the REMOVE_BOOK mutation, passing the book ID
        const { items } = await removeBookMutation({ variables: { bookId } });
  
        // Update the saved books array with the updated data
        const updatedSavedBooks = data?.removeBook.savedBooks || [];
        setUserData({ ...userData, savedBooks: updatedSavedBooks });
  
        // Remove book ID from localStorage
        removeBookId(bookId);
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <>
        <div fluid className="text-light bg-dark p-5">
          <Container>
            <h1>Viewing saved books!</h1>
          </Container>
        </div>
        <Container>
          <h2 className='pt-5'>
            {savedBooks.length
              ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
              : 'You have no saved books!'}
          </h2>
          <Row>
            {savedBooks.map((book) => {
              return (
                <Col md="4">
                  <Card key={book.bookId} border='dark'>
                    {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className='small'>Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                        Delete this Book!
                      </Button>
      </Card.Body>
        </Card>
         </Col>
              );
              })}
        </Row>
    </Container>  
  
    </>
         );
      };
  
  export default SavedBooks;