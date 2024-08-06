import { Link, useLocation } from 'react-router-dom';
import './Drawer.css';
import { FaAngleLeft, FaCloudSunRain, FaFireAlt, FaHome } from 'react-icons/fa';
import {
    MdOutlineFiberNew,
    MdOutlineNewReleases,
    MdOutlineWatchLater,
} from 'react-icons/md';
import { IoSparklesOutline } from 'react-icons/io5';
import { GiIncomingRocket } from 'react-icons/gi';
import { useRef } from 'react';
import { useSetting } from '../../context/SettingContext';
const listItem = [
    {
        name: 'Home',
        icon: <FaHome size={22} />,
        link: '/',
    },
    {
        name: 'Recent Release',
        icon: <MdOutlineFiberNew size={22} />,
        link: '/recent-release',
    },
    {
        name: 'Top Airing',
        icon: <FaFireAlt size={22} />,
        link: '/top-airing',
    },
    {
        name: 'Popular',
        icon: <IoSparklesOutline size={22} />,
        link: '/popular',
    },
    {
        name: 'Seasonal Anime',
        icon: <FaCloudSunRain size={22} />,
        link: '/season',
    },
    {
        name: 'Upcoming',
        icon: <GiIncomingRocket size={22} />,
        link: '/upcoming-anime',
    },
    {
        name: 'New Season',
        icon: <MdOutlineNewReleases size={22} />,
        link: '/new-season',
    },
    {
        name: 'Requested List',
        icon: <MdOutlineWatchLater size={22} />,
        link: '/requested-list',
    },
];
const Drawer = () => {
    const sideBarBackGroundRef = useRef(null);
    const { setting, setSetting } = useSetting();
    const { pathname } = useLocation();
    const closeSidebar = () => {
        setSetting({
            ...setting,
            drawerOpen: !setting.drawerOpen,
        });
    };
    return (
        <div
            ref={sideBarBackGroundRef}
            style={{
                left: setting.drawerOpen ? '0' : '-280px',
                width: setting.drawerOpen ? '100%' : '0px',
            }}
            className="sidebar_container"
            onClick={closeSidebar}
        >
            <ul className="sidebar_menu">
                <li style={{ border: 'none' }} className="sidebar_menu_item">
                    <div className="icon">
                        <FaAngleLeft />
                    </div>
                    <p className="name">Close Menu</p>
                </li>

                {listItem.map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.link}
                            className={`sidebar_menu_item ${
                                pathname === item.link ? 'active' : ''
                            }`}
                        >
                            <div className="icon">{item.icon}</div>
                            <p className="name">{item.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Drawer;
