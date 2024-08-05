import './Footer.css';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-social-icons">
                <Link to={'/'} className="nav-logo footer-logo">
                    <p>Anime</p>
                    <p>Tech</p>
                </Link>

                <div className="footer-social-container">
                    <div className="nav_contact-text_contaniner">
                        <p>JOIN</p>
                        <p>NOW</p>
                    </div>
                    <a
                        href="https://github.com/Tech2cool"
                        target="_blank"
                        style={{ backgroundColor: 'rgb(61 141 235)' }}
                        className="nav_circle_icon_contaniner"
                    >
                        <FaGithub cursor={'pointer'} size={25} />
                    </a>
                    <a
                        href="https://discord.gg/9FvzsfhUrj"
                        target="_blank"
                        style={{ backgroundColor: '#7289da' }}
                        className="nav_circle_icon_contaniner"
                    >
                        <FaDiscord cursor={'pointer'} size={25} />
                    </a>
                    <a
                        href="https://x.com/"
                        target="_blank"
                        style={{ backgroundColor: 'rgb(61 141 235)' }}
                        className="nav_circle_icon_contaniner"
                    >
                        <FaTwitter cursor={'pointer'} size={25} />
                    </a>
                </div>
            </div>
            <p></p>
            <ul className="ul-terms">
                <Link to={`https://github.com/Tech2cool`}>
                    <li>Contact</li>
                </Link>
                <Link to={`https://github.com/Tech2cool`}>
                    <li>AnimeTech App</li>
                </Link>
            </ul>
            <p className="footer-para">
                AnimeTech does not store any files on our server, we only linked
                to the media which is hosted on 3rd party services. This just
                side project, based on anilist API and / web scraping.
            </p>
        </div>
    );
};

export default Footer;
