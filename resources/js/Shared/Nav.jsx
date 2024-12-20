import { Link } from '@inertiajs/react'

const NavButton = ({active, title, href, onSetActive}) => {
    const defaultLinkClass = "block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
    return (
        <div className="text-sm lg:flex-grow">
            <Link 
                className={active ? defaultLinkClass + "nav-item nav-link active" : defaultLinkClass + "nav-item nav-link"} 
                href={href}
                onClick={onSetActive} >
                {title}
            </Link>
        </div>
    )
}

export default class Nav extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1, // keep the active index in state
      buttons: [
    {
        title: "Team",
        key: 3
    },
    {
        title: "Discord",
        key: 4
    },
    {
        title: "Gallery",
        key: 5
    },
    {
        title: "Download",
        key: 6
    }
]
  }
}

handleChangeActive(newActiveIndex) {
    this.setState({activeIndex: newActiveIndex});
}

render() {
        const {activeIndex} = this.state;
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6" id="navbarMain">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"> 
                <NavButton href="/home" onSetActive="" active={false} title="Home" key="0" />
                <NavButton href="/books/index" onSetActive="" active={false} title="BOOKS list" key="1" />
                <NavButton href="/books/create" onSetActive="" active={false} title="BOOKS create(err)" key="2" />
                {this.state.buttons.map((button, buttonIndex) => 
                    /* todo: determine which nav button is active depending on the activeIndex state */
                    <NavButton href={"/home/greet?name=" + button.title} onSetActive={ () => this.handleChangeActive(buttonIndex)} active={buttonIndex === activeIndex } title={button.title} key={button.key} />)}
            </div>
            <div></div>
        </nav>
    )
}
}