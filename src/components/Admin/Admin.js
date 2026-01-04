import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Profile from '../Profile/Profile';
import { doLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isShowTabProfile, setIsShowTabProfile] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector(state => state.user.account);
    const image = useSelector(state => state.user.account?.image)

    useEffect(() => {
        if (image) {
            setPreviewImage(image);
        }
    }, [image])



    const handleProfile = () => setIsShowTabProfile(true)

    const handleLogOut = async () => {
        let rs = await logout(account.email, account.refresh_token)
        if (rs && rs.EC === 0) {
            //clear data redux
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(rs.EM);
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)} >
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => handleProfile()}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                        </NavDropdown>
                        <div className='img-preview'>
                            {previewImage ?
                                <img src={`data:image/jpeg;base64,${previewImage}`} />
                                :
                                <span></span>
                            }
                        </div>
                        {isShowTabProfile && (
                            <Profile
                                show={isShowTabProfile}
                                setShow={setIsShowTabProfile}
                            />
                        )}
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>

        </div>
    )
}

export default Admin;