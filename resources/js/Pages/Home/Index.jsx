export default function Index({ welcome, user }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{welcome}</h1>
            {user && <p>Hello, {user.name}!</p>}
        </div>
    )
}