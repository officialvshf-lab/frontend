import '../../assets/css/header.css';
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";


export const Header = () => {



    const closeMenu = () => {
        const d = document.querySelector('.mobile-menu');
        d.style.display='none'
    }

    const openMenu = () => {
        const d = document.querySelector('.mobile-menu');
        d.style.display='flex'
    }




    return<>


        <nav>
                
            {/* <img src={one} alt="" className='nav-img' /> */}
            <div className="inside-nav">

            <NavLink to="/" className="logo-nav">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
            </NavLink>

                <div className="menu-links">
                    <NavLink to="/" className='mm'>
                        <p>Home</p>
                    </NavLink>
                    <NavLink to="/about" className='mm'>
                        <p>About Us</p>
                    </NavLink>
                    <NavLink to="/registration" className='mm'>
                        <p>Registration</p>
                    </NavLink>
                    {/* <NavLink to="/product" className='mm'>
                        <p>Product Range</p>
                    </NavLink> */}


                    {/* <NavLink to="/gallery" className='mm'>
                        <p>Gallery</p>
                    </NavLink> */}
                    <NavLink to="/contact" className='mm'>
                        <p>Contact Us</p>
                    </NavLink>
                </div>


                <div className="mobile-menu mpl">


                        <IoMdCloseCircle className='close' onClick={closeMenu}/>


                    <div className="menu-links mm">
                    <NavLink onClick={closeMenu} to="/" className='mm'>
                        <p>Home</p>
                    </NavLink>
                    <NavLink onClick={closeMenu} to="/about" className='mm'>
                        <p>About Us</p>
                    </NavLink>
                    <NavLink onClick={closeMenu} to="/product" className='mm'>
                        <p>Product Range</p>
                    </NavLink>
                    {/* <NavLink to="/product" className='mm'>
                        <p>Product Range</p>
                    </NavLink> */}


                    {/* <NavLink onClick={closeMenu} to="/gallery" className='mm'>
                        <p>Gallery</p>
                    </NavLink> */}
                    <NavLink onClick={closeMenu} to="/contact" className='mm'>
                        <p>Contact Us</p>
                    </NavLink>
                </div>
                </div>

                <RxHamburgerMenu className='ham-menu' onClick={openMenu} />



            </div>
        </nav>


    </>

}