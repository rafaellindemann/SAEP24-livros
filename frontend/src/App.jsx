import React, { useEffect, useState } from 'react';
import BookCard from './components/BookCard';


function App() {
    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const filterBooksByStatus = (status) => books.filter(book => book.status === status);

    function handleAddBook(){
      // Lógica para abrir modal de novo livro
  };

  function handleAddStudent(){
      // Lógica para abrir modal de novo estudante
  };

    // Função para buscar todos os livros
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/livros');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="App">
            <header>
              <h1>Biblioteca Escolar</h1>
              <div>
                  <button onClick={handleAddBook}>Novo Livro</button>
                  <button onClick={handleAddStudent}>Novo Estudante</button>
              </div>
            </header>

            <div className="dashboard">
              <div className='coluna-dashboard'>
                  <h2>Disponíveis</h2>
                  {filterBooksByStatus('disponivel').map(book => (
                      <BookCard key={book.codigo} book={book} fetchBooks={fetchBooks} />
                  ))}
              </div>
              <div className='coluna-dashboard'>
                  <h2>Emprestados</h2>
                  {filterBooksByStatus('emprestado').map(book => (
                      <BookCard key={book.codigo} book={book} fetchBooks={fetchBooks} />
                  ))}
              </div>
              <div className='coluna-dashboard'>
                  <h2>Indisponíveis</h2>
                  {filterBooksByStatus('indisponivel').map(book => (
                      <BookCard key={book.codigo} book={book} fetchBooks={fetchBooks} />
                  ))}
              </div>
            </div>            
        </div>
    );
}

export default App;
