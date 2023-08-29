
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav>
            <Link to="/">All</Link>
            <Link to="/?todos=active">Active</Link>
            <Link to="/?todos=completed">Completed</Link>
        </nav>
    )
}