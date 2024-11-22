import './../../../css/index.css';
import Nav from '../../Shared/Nav'
import { Link } from '@inertiajs/react'

const BookListItem = ({book, bookIndex}) => {
    return (
        <div className="text-sm lg:flex-grow">
            <Link 
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" 
                href={"/books/book-read?id=" + bookIndex}
            >
               #{bookIndex} - <small>title:</small>{book.title}, <small>author:</small>{book.author}
            </Link>
        </div>
    )
}

export default function Index({ books }) {
    return (
        <div className="lg:container lg:mx-auto">
            <Nav></Nav>
            <div className="wrapper m-3">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                {books.map((book, bookIndex) => 
                   <BookListItem book={book} bookIndex={bookIndex} />)}
            </div>
            </div>
        </div>
    )
}