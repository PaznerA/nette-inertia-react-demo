import { useForm } from '@inertiajs/react'

export default function AddBookForm({ url }) {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    function submit(e) {
        e.preventDefault()
        post(url, {replace: false})
    }

    return (
    <form onSubmit={submit}>
        <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} />
        {errors.email && <div>{errors.email}</div>}
        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
        {errors.password && <div>{errors.password}</div>}
        <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} /> Remember Me
        <button type="submit" disabled={processing}>Login</button>
    </form>
    )
}