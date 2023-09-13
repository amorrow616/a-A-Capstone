import { NavLink } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import './HomePage.css';

export default function HomePage() {
    return (
        <>
            <div className="homePageTopWrapper">
                <div className="homePageLeft">
                    <img src='https://habitica.com/static/img/home-main@3x.23eeafe4.png' id="homePageTopImg" />
                    <h2 id="homePageLeftTitle">Motivate yourself to achieve your goals.</h2>
                    <p className="homePageP">It's time to have fun when you get things done! Join over 4 million Patternicans and improve your life one task at a time.</p>
                </div>
                <div className="homePageRight">
                    <h3>Sign Up For Free</h3>
                    <p className="homePageP">Username must be 1 to 20 characters, containing only letters a to z, numbers 0 to 9, hyphens, or underscores, and cannot include and inappropriate terms.</p>
                    <SignupFormPage />
                </div>
            </div>
            <h2>Gamify Your Life</h2>
            <p className="homePageP">Patternica is a free habit-building and productivity app that treats your real life like a game. With in-game rewards and punishments to motivate you and a strong social network to inspire you, Patternica can help you achieve your goals to become healthy, hard-working, and happy.</p>
            <h3>Track Your Habits and Goals</h3>
            <p className="homePageP">Stay accountable by tracking and managing your Habits, Daily goals, and To Do list with Patternica's easy-to-use mobile apps and web interface.</p>
            <h3>Earn Rewards for Your Goals</h3>
            <p className="homePageP">Check off tasks to level up your Avatar and unlock in-game features such as battle armor, mysterious pets, magic skills, and even quests!</p>
            <h3>Battle Monsters with Friends</h3>
            <p className="homePageP">Fight monsters with other Patternicans! Use the Gold that you earn to buy in-game or custom rewards, like watching an episode of your favorite TV show.</p>
            <h2>Players Use Patternica to Improve</h2>
            <h3>Health and Fittness</h3>
            <p className="homePageP">Never motivated to floss? Can't seem to get to the gym? Patternica finally makes it fun to get healthy.</p>
            <h3>School and Work</h3>
            <p className="homePageP">Whether you're preparing a report for your teacher or your boss, it's easy to keep track of your progress as you tackle your toughest tasks.</p>
            <h3>And much, much more!</h3>
            <p className="homePageP">Our fully customizable task list means that you can shape Patternica to fit your personal goals. Work on creative projects, emphasize self-care, or pursue a different dream -- it's all up to you.</p>
            <h2>Join over 4 million people having fun while accomplishing their goals!</h2>
            <NavLink exact to="/signup" id="loginButton">Join Patternica Today</NavLink>
        </>
    )
}
