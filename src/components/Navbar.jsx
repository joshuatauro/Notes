import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className='w-full py-5  border-b-4 border-b-dark-cta  text-primary'>
            <div className="w-11/12 mx-auto flex justify-between">
                <Link to="/" className='font-semibold text-3xl'>NoteSIT</Link>
                <ul className="flex items-center gap-7">
                <li key={"ok"}>
                    <Link to={"/study"}>{"DD"}</Link>
                </li>
                <button className='bg-dark-cta px-7 font-medium  py-2 rounded-md'>Login</button>
                </ul>
            </div>
        </nav>
    )

}

export default Navbar;