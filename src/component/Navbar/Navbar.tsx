import { BiMenu } from 'react-icons/bi';
import './Navbar.css';
import Searchbar from '../Searchbar/Searchbar';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useSetting } from '../../context/SettingContext';
import { FaDiscord, FaGithub, FaRandom, FaTwitter } from 'react-icons/fa';
import { PiListHeartBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const { setting, setSetting } = useSetting();
    const setActiveLang = (item: string) => {
        setSetting((prev) => ({
            ...prev,
            language: item,
        }));
    };

    const closeSidebar = () => {
        setSetting({
            ...setting,
            drawerOpen: !setting.drawerOpen,
        });
    };

    return (
        <nav className={`nav-container`}>
            <ul className="nav_contact_container">
                <li className="nav-icon" onClick={closeSidebar}>
                    <BiMenu size={30} />
                </li>
                <li>
                    <Link to={'/'} className="nav-logo">
                        <p>Anime</p>
                        <p>Tech</p>
                    </Link>
                </li>
            </ul>

            <Searchbar />

            <ul className="nav_contact_container">
                <li className="nav_contact-text_contaniner">
                    <p>JOIN</p>
                    <p>NOW</p>
                </li>
                <li>
                    <a
                        href="https://github.com/Tech2cool"
                        target="_blank"
                        style={{ backgroundColor: 'rgb(61 141 235)' }}
                        className="nav_circle_icon_contaniner"
                    >
                        <FaGithub cursor={'pointer'} size={25} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://discord.gg/9FvzsfhUrj"
                        target="_blank"
                        style={{ backgroundColor: '#7289da' }}
                        className="nav_circle_icon_contaniner"
                    >
                        <FaDiscord cursor={'pointer'} size={25} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://x.com/"
                        target="_blank"
                        style={{ backgroundColor: 'rgb(61 141 235)' }}
                        className="nav_circle_icon_contaniner"
                    >
                        <FaTwitter cursor={'pointer'} size={25} />
                    </a>
                </li>
            </ul>

            <ul className="nav-btns-container">
                {/* //Random Anime Btn */}
                <li>
                    <Link to={`/random`} className="nav-random">
                        <FaRandom
                            cursor={'pointer'}
                            size={25}
                            color="var(--clr-accent)"
                        />
                        <p>Random</p>
                    </Link>
                </li>

                {/* //MyList btn */}
                <li>
                    <Link to={`/my-list`} className="nav-random">
                        <PiListHeartBold
                            cursor={'pointer'}
                            size={28}
                            color="var(--clr-accent)"
                        />
                        <p>My List</p>
                    </Link>
                </li>

                {/* //Language btn */}
                <li className="nav-language">
                    <ToggleSwitch
                        list={['en', 'jp']}
                        active={setting.language}
                        setActive={setActiveLang}
                        ItemStyle={{
                            padding: '3px 6px',
                            fontSize: 16,
                        }}
                    />
                    <p>Anime Name</p>
                </li>
            </ul>

            <div className="devider"></div>
            {/* //ad's text */}
            <div className="nav-ad-texts">
                <p className="nav-no-ads-text">
                    Powered by Anilist and Third party APIs
                </p>
                <p style={{ color: 'gray', textAlign: 'right', fontSize: 12 }}>
                    unofficial project
                </p>
            </div>
        </nav>
    );
};

export default Navbar;
