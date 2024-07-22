import { CSSProperties, FC } from 'react';

interface ToggleSwitchProps {
  list: string[];
  active: string;
  setActive: (item: string) => void;
  containerStyle?: CSSProperties;
  ItemStyle?: CSSProperties;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  list = [],
  active,
  setActive,
  containerStyle,
  ItemStyle,
}) => {
  const onChangeActive = (item: string) => {
    setActive(item);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        backgroundColor: "gray",
        borderRadius: 4,
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      {list.map((item) => (
        <div
          key={item}
          style={{
            backgroundColor: active === item ? "var(--clr-accent)" : "gray",
            // padding: 4,
            paddingTop:2,
            paddingBottom:2,
            paddingLeft:5,
            paddingRight:5,
            fontSize: 17,
            textTransform: "uppercase",
            color: "var(--clr-text)",
            fontWeight: "600",
            fontFamily: "var(--font-Roboto)",
            transition: "all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
            cursor: "pointer",
            ...ItemStyle,
          }}
          onClick={() => onChangeActive(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default ToggleSwitch;
