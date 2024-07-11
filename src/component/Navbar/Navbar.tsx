import { BiMenu } from 'react-icons/bi';
import './Navbar.css';
import Searchbar from '../Searchbar/Searchbar';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useSetting } from '../../context/SettingContext';
import { FaDiscord, FaGithub, FaRandom, FaTwitter } from 'react-icons/fa';
import { PiListHeartBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Navbar = () => {
    const { setting, setSetting } = useSetting();
    const [navPosition, setNavPosition] = useState<string>('absolute')
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
        <div className={`nav-container`}>
            <div className="nav-icon" onClick={closeSidebar}>
                <BiMenu size={30} />
            </div>
            <div className="nav-logo">
                <p>Anime</p>
                <p>Tech</p>
            </div>
            <Searchbar />

            <div className="nav_contact_container">
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

            <div className="nav-btns-container">
                {/* //Random Anime Btn */}
                <Link to={`/random`} className="nav-random">
                    <FaRandom
                        cursor={'pointer'}
                        size={25}
                        color="var(--clr-accent)"
                    />
                    <p>Random</p>
                </Link>

                {/* //MyList btn */}
                <Link to={`/my-list`} className="nav-random">
                    <PiListHeartBold
                        cursor={'pointer'}
                        size={28}
                        color="var(--clr-accent)"
                    />
                    <p>My List</p>
                </Link>

                {/* //Language btn */}
                <div className="nav-language">
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
                </div>
            </div>
            <div className="devider"></div>
            {/* //ad's text */}
            <div className="nav-ad-texts">
                <p className="nav-no-ads-text">
                    Powered by Gogo / Hi-anime / Anilist
                </p>
                <p style={{ color: 'gray', textAlign: 'right', fontSize: 12 }}>
                    unofficial project
                </p>
            </div>
        </div>
    );
};

export default Navbar;
