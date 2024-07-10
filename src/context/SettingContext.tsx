import { createContext, ReactNode, useContext, useState } from "react";

interface Settings {
    query: string;
    drawerOpen: boolean;
    scrollX: number | null;
    scrollY: number | null;
    language: string;
    provider:string;
}

interface ChildrenProps {
    children: ReactNode;
}

interface SettingContextType {
    setting: Settings;
    setSetting: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingContext = createContext<SettingContextType>({} as SettingContextType);

export const SettingContextProvider = ({ children }: ChildrenProps) => {
    const [setting, setSetting] = useState<Settings>({
        query: '',
        drawerOpen: false,
        scrollX: null,
        scrollY: null,
        language: "en",
        provider: "gogo",
    });

    return (
        <SettingContext.Provider value={{ setting, setSetting }}>
            {children}
        </SettingContext.Provider>
    );
};

export const useSetting = (): SettingContextType => {
    return useContext(SettingContext);
};
