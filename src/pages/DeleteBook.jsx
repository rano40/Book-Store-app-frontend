import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Move the confirmationMessage outside the function
  const confirmationMessage = 'Are you sure you want to delete this book?';

  const handleDeleteBook = () => {
    Swal.fire({
      title: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`http://localhost:5000/books/${id}`)
          .then(() => {
            setLoading(false);
            // Use SweetAlert for success
            Swal.fire({
              icon: 'success',
              title: 'Book Deleted Successfully!',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate('/');
            });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            // Use SweetAlert for error
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
    <div className='py-5 px-2'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>{confirmationMessage}</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
