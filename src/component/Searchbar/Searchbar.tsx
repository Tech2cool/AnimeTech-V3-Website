import { BiSearch } from 'react-icons/bi';
import './Searchbar.css';
import { IoMdOptions } from 'react-icons/io';
import { useSetting } from '../../context/SettingContext';
import { ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

const Searchbar = () => {
    const { setting, setSetting } = useSetting();

    const debouceQuery =  useDebounce(setting.query, 1000)
    const navigate = useNavigate();
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSetting({
            ...setting,
            query: e.target.value,
        });
    };
    useEffect(()=>{
        if(!setting.query) return
        navigate(`/search/${setting.query}`);

    },[debouceQuery,navigate])
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search anime...."
                value={setting.query}
                onChange={onChangeInput}
                className="search-input"
            />

            <div className="search-icn">
                <BiSearch size={24} />
            </div>
            <p className="search-filter">filter</p>
            <div className="search-icn filter-icon">
                <IoMdOptions cursor={'pointer'} />
            </div>
        </div>
    );
};

export default Searchbar;
