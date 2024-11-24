import './../../../css/index.css';
import Nav from '../../Shared/Nav'
import AddBookForm from './AddBookForm';
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { useState } from 'react'


const BookForm = ({url}) => {
    const createBookApi = url
    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: ""
    })

    const handleInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setBook({ ...book, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(book)

        router.post(createBookApi, book, {
            onFinish: () => {
                console.log('Form submitted successfully!');
                setBook({title: "",author: "",isbn: ""})
            },
            onError: () => {
                console.error('Form submission failed!'); 
            }
        })

    }
    return (
        <div className="text-sm lg:flex-grow">
            <div className='book-form pt-4'>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-items-start w-1/4 mb-2">
                        <label for="name" className="w-1/3 form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={book.title} onChange={handleInput} />
                    </div>
                    <div className="flex flex-row justify-items-start w-1/4 mb-2">
                        <label for="email" className="w-1/3 form-label">Author</label>
                        <input type="text" className="form-control" id="author" name="author" value={book.author} onChange={handleInput} />
                    </div>
                    <div className="flex flex-row justify-items-start w-1/4 mb-3">
                        <label for="pwd" className="w-1/3 form-label">isbn</label>
                        <input type="text" className="form-control" id="isbn" name="isbn" value={book.isbn} onChange={handleInput} />
                    </div>
                    <button type="submit" className="bg-slate-50 p-1 submit-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default function AddOrEdit({ book, addBookLink }) {
    return (
        <div className="lg:container lg:mx-auto">
            <Nav></Nav>
            <div className="wrapper mt-2">

                <div className="mt-2 bg-lime-300 p-2 pl-5">
                    <h3>Add/edit book:</h3>
                    <div className="w-full block items-center">
                        <BookForm url={addBookLink}/>
                    </div> 
                </div>

            </div>
        </div>
    )
}