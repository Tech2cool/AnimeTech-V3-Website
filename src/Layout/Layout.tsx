import React, { ReactNode} from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import Navbar from '../component/Navbar/Navbar';
import Drawer from '../component/Drawer/Drawer';
import './Layout.css';
import Footer from '../component/Footer/Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <Drawer />
            <div className="layout-container">
                {children}
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
                <Footer />
            </div>
            
        </>
    );
};

export default Layout;
