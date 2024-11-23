import './../../../css/index.css';
import Nav from '../../Shared/Nav'
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { useState } from 'react'

const BookListItem = ({book, bookIndex}) => {
    return (
        <div className="text-sm lg:flex-grow">
            <Link 
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-950 hover:text-blue-500 mr-4" 
                href={"/books/book-read?id=" + bookIndex}
            >
               #{bookIndex} - <small>title:</small>{book.title}, <small>author:</small>{book.author}
            </Link>
        </div>
    )
}

const BookForm = () => {
    const createBookApi = "http://localhost:3000/user" //todo: rework
    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setBook({ ...book, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(book)
        try {
            // setIsLoading(true);
            const response = await fetch(createBookApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setBook({title: "",author: "",isbn: ""})
                // navigate('/show-user');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            // setError(error.message);
        } finally{
            // setIsLoading(false);
        }
    }
    return (
        <div className="text-sm lg:flex-grow">
            <div className='book-form pt-4'>
                <div className='heading'>
                {/* {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                    <p>Book Form</p> */}
                </div>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={book.title} onChange={handelInput} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="email" className="form-label">Author</label>
                        <input type="email" className="form-control" id="author" name="author" value={book.author} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="pwd" className="form-label">isbn</label>
                        <input type="text" className="form-control" id="isbn" name="isbn" value={book.isbn} onChange={handelInput} />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default function Index({ books }) {
    return (
        <div className="lg:container lg:mx-auto">
            <Nav></Nav>
            <div className="wrapper mt-2">

                <div className="bg-lime-200 p-2 pl-5">
                    <h3>Book list:</h3>
                    <div className="w-full block items-center">
                        {books.map((book, bookIndex) => 
                        <BookListItem key={bookIndex} book={book} bookIndex={bookIndex} />)}
                    </div>
                </div>

                <div className="mt-2 bg-lime-300 p-2 pl-5">
                    <h3>Add book:</h3>
                    <div className="w-full block items-center">
                        <BookForm />
                    </div> 
                </div>

            </div>
        </div>
    )
}