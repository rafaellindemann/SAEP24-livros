import React, { useState } from 'react';

function BookCard({ book, fetchBooks }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({ ...book });

    const handleStatusChange = async (newStatus) => {
        await fetch(`http://localhost:3000/livros/${book.codigo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...book, status: newStatus })
        });
        fetchBooks();
    };

    const handleEditBook = async () => {
        await fetch(`http://localhost:3000/livros/${book.codigo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedBook)
        });
        fetchBooks();
        setIsEditing(false);
    };

    const handleDeleteBook = async () => {
        const confirmed = window.confirm("Tem certeza de que deseja deletar este livro?");
        if (confirmed) {
            await fetch(`http://localhost:3000/livros/${book.codigo}`, {
                method: 'DELETE',
            });
            fetchBooks();
        }
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

            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={handleDeleteBook}>Deletar</button>

            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Editar Livro</h3>
                        <label>
                            Título:
                            <input
                                type="text"
                                value={editedBook.titulo}
                                onChange={(e) => setEditedBook({ ...editedBook, titulo: e.target.value })}
                            />
                        </label>
                        <label>
                            Autor:
                            <input
                                type="text"
                                value={editedBook.autor}
                                onChange={(e) => setEditedBook({ ...editedBook, autor: e.target.value })}
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={handleEditBook}>Salvar</button>
                            <button onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookCard;


// import React, { useState } from 'react';

// function BookCard({ book, fetchBooks }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedBook, setEditedBook] = useState({ ...book });

//     const handleStatusChange = async (newStatus) => {
//         await fetch(`http://localhost:3000/livros/${book.codigo}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ ...book, status: newStatus })
//         });
//         fetchBooks();
//     };

//     const handleEditBook = async () => {
//         await fetch(`http://localhost:3000/livros/${book.codigo}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(editedBook)
//         });
//         fetchBooks();
//         setIsEditing(false);
//     };

//     return (
//         <div className="book-card">
//             <h3>{book.titulo}</h3>
//             <p>Autor: {book.autor}</p>
            
//             {book.status === 'disponivel' && (
//                 <>
//                     <button onClick={() => handleStatusChange('emprestado')}>Emprestar</button>
//                     <button onClick={() => handleStatusChange('indisponivel')}>Indisponível</button>
//                 </>
//             )}
//             {book.status === 'emprestado' && (
//                 <button onClick={() => handleStatusChange('disponivel')}>Devolver</button>
//             )}
//             {book.status === 'indisponivel' && (
//                 <button onClick={() => handleStatusChange('disponivel')}>Disponível</button>
//             )}

//             <button onClick={() => setIsEditing(true)}>Editar</button>
//             <button>Deletar</button>

//             {isEditing && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Editar Livro</h3>
//                         <label>
//                             Título:
//                             <input
//                                 type="text"
//                                 value={editedBook.titulo}
//                                 onChange={(e) => setEditedBook({ ...editedBook, titulo: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Autor:
//                             <input
//                                 type="text"
//                                 value={editedBook.autor}
//                                 onChange={(e) => setEditedBook({ ...editedBook, autor: e.target.value })}
//                             />
//                         </label>
//                         <div className="modal-buttons">
//                             <button onClick={handleEditBook}>Salvar</button>
//                             <button onClick={() => setIsEditing(false)}>Cancelar</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default BookCard;

