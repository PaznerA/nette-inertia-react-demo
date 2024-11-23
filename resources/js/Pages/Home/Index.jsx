import './../../../css/index.css';
import Nav from './../../Shared/Nav'

export default function Index({ welcome, user }) {
    return (
        <div className="lg:container lg:mx-auto">
            <Nav></Nav>
            <div className="wrapper m-3">
                <h1 className="text-2xl font-bold mb-4 text-white">{welcome}</h1>
                {user && <p className=" text-white">Hello, {user.name}!</p>}
            </div>
        </div>
    )
}