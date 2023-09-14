import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { BiChevronsDown } from "react-icons/bi";
import { FcCopyright } from "react-icons/fc";
import './HomePage.css';

export default function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data)
            }
        } else {
            setErrors(['Confirm Password field must be the same as the Password field']);
        }
    };

    return (
        <>
            <div className="homePageTopWrapper">
                <div className="homePageLeft">
                    <img src='https://habitica.com/static/img/home-main@3x.23eeafe4.png' alt="three pixilated characters, one dressed in white, one in green sitting on a large fox, and the third dressed in blue with a wizard hat and a sword" id="homePageTopImg" />
                    <h2 id="homePageLeftTitle">Motivate yourself to achieve your goals.</h2>
                    <p className="homePageP">It's time to have fun when you get things done! Join over 4 million Patternicans and improve your life one task at a time.</p>
                </div>
                <div className="homePageRight">
                    <h3 className="homePageHeadings">Sign Up For Free</h3>
                    <p className="homePageP">Username must be 1 to 20 characters, containing only letters a to z, numbers 0 to 9, hyphens, or underscores, and cannot include and inappropriate terms.</p>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <label id="signupInputs">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Username'
                                required
                            />
                        </label>
                        <label id="signupInputs">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                required
                            />
                        </label>
                        <label id="signupInputs">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                required
                            />
                        </label>
                        <label id="signupInputs">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                        </label>
                        <button type="submit" id="signupSubmitHome">Sign Up</button>
                    </form>
                </div>
            </div >
            <BiChevronsDown className="downArrows" />
            <div id="gamifyBlurb">
                <h2 className="homePageBigHeadings">Gamify Your Life</h2>
                <p className="homePageP">Patternica is a free habit-building and productivity app that treats your real life like a game. With in-game rewards and punishments to motivate you and a strong social network to inspire you, Patternica can help you achieve your goals to become healthy, hard-working, and happy.</p>
            </div>
            <div id="middlePageColumns">
                <div className="middleColumnOne">
                    <img src="https://habitica.com/static/img/track-habits@3x.7293d5cc.png" alt="a visual example of the dailies, todos, and habits you can create on the site" className="centerHomePageImages" />
                    <h3 className="middlePageHeadings">Track Your Habits and Goals</h3>
                    <p className="middlePageP">Stay accountable by tracking and managing your Habits, Daily goals, and To Do list with Patternica's easy-to-use mobile apps and web interface.</p>
                </div>
                <div className="middleColumnTwo">
                    <img src="https://habitica.com/static/img/earn-rewards@3x.acaba17e.png" alt="gems, coins, and weapons floating around a character dressed in purple with a wizard hat riding a purple griffin with a gray wolf standing next to them" className="centerHomePageImages" />
                    <h3 className="middlePageHeadings">Earn Rewards for Your Goals</h3>
                    <p className="middlePageP">Check off tasks to level up your Avatar and unlock in-game features such as battle armor, mysterious pets, magic skills, and even quests!</p>
                </div>
                <div className="middleColumnThree">
                    <img src="https://habitica.com/static/img/battle-monsters@3x.7cd8d3e0.png" alt="a big brown water monster with 4 pixilated characters wearing armor and wielding weapons standing in front of it" className="centerHomePageImages" />
                    <h3 className="middlePageHeadings">Battle Monsters with Friends</h3>
                    <p className="middlePageP">Fight monsters with other Patternicans! Use the Gold that you earn to buy in-game or custom rewards, like watching an episode of your favorite TV show.</p>
                </div>
            </div>
            <BiChevronsDown className="downArrows" />
            <h2 className="homePageHeadings">Players Use Patternica to Improve</h2>
            <div id="middlePageColumns">
                <div className="middleColumnOne">
                    <img src="https://habitica.com/static/img/health-fitness@3x.9676cd74.png" alt="a person dressed in pink sitting on a yoga mat in front of a candle with windows in the background" className="centerHomePageImages2" />
                    <h3 className="middlePageHeadings">Health and Fittness</h3>
                    <p className="middlePageP">Never motivated to floss? Can't seem to get to the gym? Patternica finally makes it fun to get healthy.</p>
                </div>
                <div className="middleColumnTwo">
                    <img src="https://habitica.com/static/img/school-work@3x.d6eb1650.png" alt="a person dressed in blue sitting at a desk with a computer on it, a blue rug over on the floor, and a window with a bookshelf right below it to the right of the desk" className="centerHomePageImages2" />
                    <h3 className="middlePageHeadings">School and Work</h3>
                    <p className="middlePageP">Whether you're preparing a report for your teacher or your boss, it's easy to keep track of your progress as you tackle your toughest tasks.</p>
                </div>
                <div className="middleColumnThree">
                    <img src="https://habitica.com/static/img/much-more@3x.e3ed259a.png" alt="a person dressed in purple laying on the floor with a book opened in front of them, discarded gear (helmet, sword, etc.) scattered on the floor around them" className="centerHomePageImages2" />
                    <h3 className="middlePageHeadings">And much, much more!</h3>
                    <p className="middlePageP">Our fully customizable task list means that you can shape Patternica to fit your personal goals. Work on creative projects, emphasize self-care, or pursue a different dream -- it's all up to you.</p>
                </div>
            </div>
            <BiChevronsDown className="downArrows" />
            <div id="homePageBottom">
                <h2 className="homePageHeadings">Join over 4 million people having fun while accomplishing their goals!</h2>
                <NavLink exact to="/signup" id="bottomLinkToSignup">Join Patternica Today</NavLink>
            </div>
            <p className="homePageP"><FcCopyright />2023 Patternica. No rights reserved.</p>
        </>
    )
}
