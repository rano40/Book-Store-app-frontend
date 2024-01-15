import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import axios from 'axios';

const BooksTable = ({ books }) => {
  const handleDeleteBook = (bookId) => {
    Swal.fire({
      title: 'Are you sure you want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/books/${bookId}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Book Deleted Successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            // If needed, update the state or perform any additional logic
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occurred! Please check the console.',
            });
          });
      }
    });
  };

  return (
    <table className="w-full border-separate border-shaping-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
            <td className="border border-slate-700 rounded-md text-center">{book.title}</td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.author}</td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.publishYear}</td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`books/details/${book._id}`}>
                  <BsInfoCircle className="text-2x1 text-green-800" />
                </Link>
                <Link to={`books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2x1 text-yellow-600" />
                </Link>
                {/* Use SweetAlert confirmation dialog on delete icon click */}
                <BsTrash
                  className="text-2x1 text-red-600 cursor-pointer"
                  onClick={() => handleDeleteBook(book._id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
