import './LearnMore.css';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

export default function LearnMore() {
    return (
        <>
            <h1 className="learnMoreText">Curious about who made this site? You've come to the right place!</h1>
            <h2 className="learnMoreText">Oh hello! I'm Amanda Morrow and this is my Habitica inspired website.</h2>
            {/* <img src='https://drive.google.com/file/d/1Zvr0JXAULPvtGt1EghiyC0u9FWXoLPc-/view?usp=drive_link' alt='a woman with blonde curly hair wearing a headset smiling' id='imageOfMe' /> */}
            <p className="learnMoreText">Below are a few links if you'd like to connect!</p>
            <a href='https://github.com/amorrow616' target="_blank" rel="noreferrer">
                <AiFillGithub className='learnMoreLinks' />
            </a>
            <a href='https://www.linkedin.com/in/amanda-morrow-a66680257/' target="_blank" rel="noreferrer">
                <AiFillLinkedin className='learnMoreLinks' />
            </a>
        </>
    )
}
