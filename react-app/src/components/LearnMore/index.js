import './LearnMore.css';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

export default function LearnMore() {
    return (
        <>
            <h1 className="learnMoreText">Curious about this site? You've come to the right place!</h1>
            <h2 className="learnMoreText">Oh hello! I'm Amanda Morrow and this is my Habitica inspired website.</h2>
            {/* <img src='../../images/ResumePicture.jpg' alt='a woman with blonde curly hair wearing a headset smiling' /> */}
            <a href='https://github.com/amorrow616' target="_blank" rel="noreferrer">
                <AiFillGithub className='learnMoreLinks' />
            </a>
            <a href='https://www.linkedin.com/in/amanda-morrow-a66680257/' target="_blank" rel="noreferrer">
                <AiFillLinkedin className='learnMoreLinks' />
            </a>
        </>
    )
}
