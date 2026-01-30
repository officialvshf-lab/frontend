import '../../assets/css/footer.css'
import logo from '../../assets/images/logo.png'
import { ImLocation2 } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
// import f from '../../assets/images/f.png'
import { NavLink } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa6";
import {IoMail} from "react-icons/io5";



export const Footer = () => {

    const phoneNumber = "9315529789"; // Replace with your WhatsApp number (with country code, no + or spaces)
  const message = "Hi! I want to know more about your services.";


    return<>

        <footer>


            <img src={""} className='ff' alt="" />

            <div className="inside-footer">

                <div className="footer-widget">
                    <img className='footer-logo' src={logo} alt="" />
                </div>
                <div className="footer-widget">
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
                    {/* <NavLink to="/gallery" className='mm'>
                        <p>Gallery</p>
                    </NavLink> */}
                    <NavLink to="/contact" className='mm'>
                        <p>Contact Us</p>
                    </NavLink>
                </div>
                </div>
                <div className="footer-widget f3">
                    <div className="footer-widget-card">
                        <ImLocation2 className='footer-icon'/>
                           
                        <p>जनपद बुलंदशहर तहसील स्याना, <br/>पोस्ट बुगरासी  <br/>ग्राम रवानी कटीरी</p>
                    </div>
                    <div className="footer-widget-card">
                        <FaPhone className='footer-icon'/>
                        <p>9910307602 / 9315529789</p>
                    </div>
                    <div className="footer-widget-card">
                        <IoMail className='footer-icon'/>
                        <p>officialvshf@gmail.com</p>
                    </div>
                    <div className="footer-widget-card">
                        <NavLink to={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}>
                        <FaWhatsapp className='footer-icon'/>
                        </NavLink>


                        <NavLink to="https://www.instagram.com/vishwasanatanhindufoundation/">
                        <FaInstagram className='footer-icon'/>
                        </NavLink>

                        
                        {/* <NavLink to="">
                        <FaFacebook className='footer-icon'/>

                        </NavLink>

                        <NavLink to="" className="footer-icon">
                            <FaLinkedin />
                        </NavLink> */}

                    </div>
                </div>

            </div>
        </footer>


    </>

}