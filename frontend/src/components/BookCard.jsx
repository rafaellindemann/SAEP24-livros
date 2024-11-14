import React from 'react';

function BookCard({ book, fetchBooks }) {
    const handleStatusChange = async (newStatus) => {
        await fetch(`http://localhost:3000/livros/${book.codigo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...book, status: newStatus })
        });
        fetchBooks();
    };

    return (
        <div className="book-card">
            <h3>{book.titulo}</h3>
            <p>Autor: {book.autor}</p>
            {book.status === 'disponivel' && (
                <>
                    <button onClick={() => handleStatusChange('emprestado')}>Emprestar</button>
                    <button onClick={() => handleStatusChange('indisponivel')}>Indisponível</button>
                </>
            )}
            {book.status === 'emprestado' && (
                <button onClick={() => handleStatusChange('disponivel')}>Devolver</button>
            )}
            {book.status === 'indisponivel' && (
                <button onClick={() => handleStatusChange('disponivel')}>Disponível</button>
            )}
            <button>Editar</button>
            <button>Deletar</button>
        </div>
    );
}

export default BookCard;
