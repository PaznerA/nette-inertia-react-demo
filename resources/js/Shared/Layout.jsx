export default function Layout({ component }) {
    return (
        <div class="lg:container lg:mx-auto">
            <nav></nav>
            {{component}}
        </div>
    )
}