import './Switch.css';
interface SwitchType {
    list: {
        id: number;
        name: string;
    }[];
    active: string | number;
    setActive: (state: number) => void;
}
const Switch = ({ list, active, setActive }: SwitchType) => {

    
    return (
        <div className="switch-container">
            {list?.map((item: { id: number; name: string }) => (
                <button key={item.name} className={`switch-btn ${active === item.id? 'switch-active':''}`} onClick={()=>setActive(item.id)}>
                    {item?.name}
                </button>
            ))}
        </div>
    );
};

export default Switch;
