
import { Link, useSearchParams } from 'react-router-dom';


export default function Navbar() {
    const [searchParams] = useSearchParams();
    let todoFilter = searchParams.get("todos");
    return (
        <nav>
            <Link className={`${todoFilter === null && "active"}`} to="/">All</Link>
            <Link className={`${todoFilter === "active" && "active"}`} to="/?todos=active">Active</Link>
            <Link className={`${todoFilter === "completed" && "active"}`} to="/?todos=completed">Completed</Link>
        </nav>
    )
}