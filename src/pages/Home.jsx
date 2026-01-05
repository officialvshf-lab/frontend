import { NavLink } from "react-router-dom"
import a from '../assets/images/a.mp4'
import { GoArrowRight } from "react-icons/go";
import '../assets/css/style.css'
import ik from '../assets/images/ik.jpeg'

export const Home = () => {
    return<>
        <div className="first-section">
            <div className="inside-first-section">

 <video autoPlay muted loop playsInline className="bg-video">
      <source src={a} type="video/mp4" />
    </video>
                <h1>1 करोड़ सनातनी  <br/> 
                <span>
                    को जोड़ने की मुहीम
                </span>
                </h1>

                {/* <p>Pure, natural spa essentials <br/> crafted for moments of calm.</p> */}

                <NavLink to="/registration">
                    <button className="main-btn">
                        <p>Register Now  <GoArrowRight className="right-arrow" /></p>
                    </button>
                </NavLink>

            </div>
        </div>


        {/* <div className="second-section">
            <img src={ik} alt="" />
        </div> */}

    </>
}