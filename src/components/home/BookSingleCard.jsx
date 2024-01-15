import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const BookSingleCard = ({ book }) => {
  const [showModel, setShowModel] = useState(false);

  const handleDeleteBook = () => {
    MySwal.fire({
      title: 'Are you sure you want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/books/${book._id}`)
          .then(() => {
            MySwal.fire({
              icon: 'success',
              title: 'Book Deleted Successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            // Add any additional logic or state updates if needed
          })
          .catch((error) => {
            console.log(error);
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occurred! Please check the console.',
            });
          });
      }
    });
  };

  return (
    <div key={book._id} className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-x1'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'> {book.publishYear} </h2>
      {/* <h4 className='my-2 text-gray-500'> {book._id} </h4> */}
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2x1' />
        <h2 className='my-1'> {book.title} </h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2x1' />
        <h2 className='my-1'> {book.author} </h2>
      </div>
      <div className='flex justify-start items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3x1 text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModel(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-2x1 text-green-800 hover:text-black' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2x1 text-yellow-600 hover:text-black' />
        </Link>
        {/* Use SweetAlert confirmation dialog on delete icon click */}
        <MdOutlineDelete
          className='text-2x1 text-red-600 hover:text-black cursor-pointer'
          onClick={handleDeleteBook}
        />
      </div>
      {showModel && <BookModal book={book} onClose={() => setShowModel(false)} />}
    </div>
  );
};

export default BookSingleCard;
