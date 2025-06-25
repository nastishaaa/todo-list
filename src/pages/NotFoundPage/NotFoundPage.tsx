import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return(
        <div >
            <h1>Not found page</h1>
            <h2>Go back to <Link to="/">Home</Link></h2>
        </div>
    )
}