import { ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import Navbar from '../component/Navbar/Navbar';
import Drawer from '../component/Drawer/Drawer';
import 'react-toastify/dist/ReactToastify.css';

import './Layout.css';
interface _layout {
    children: ReactNode;
}
const Layout = ({ children }: _layout) => {
    return (
        <div className="layout-container">
            <Navbar />
            <Drawer />
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
        </div>
    );
};

export default Layout;
