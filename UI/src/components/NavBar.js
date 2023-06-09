import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa';
import {Icon} from '@iconify/react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {auth} from '../config/firebaseConfig';
import {logout} from '../firebaseFunctions/firebaseFunctions';
import {Menu, Dropdown} from 'antd';
import {SettingOutlined} from '@ant-design/icons';

import './NavBar.css';
import Logo from '../assets/images/Logo.png';
import MainSearchBar from './MainSearchBar';
function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState(null);
  const [userIsSet, setUserIsSet] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setClick(!click);
  }
  function closeMenu() {
    setClick(false);
  }
  function displayButton() {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
    window.addEventListener('resize', displayButton);
  }

  useEffect(() => {
    async function getAuth() {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user);
          setUserIsSet(true);
        } else {
          setUser(null);
          setUserIsSet(true);
        }
      });
    }
    getAuth()
      .then(r => console.log(r))
      .catch(e => console.log(e));
  }, [userIsSet]);

  const settingsMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/account-settings" onClick={closeMenu}>
          Account Settings
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/messages" onClick={closeMenu}>
          Messages
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile" onClick={closeMenu}>
          Profile
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="navbar-container container">
        {userIsSet && user ? (
          <Link to="/home" className="navbar-logo">
            <img src={Logo} className="logo" />
          </Link>
        ) : (
          <Link to="/" className="navbar-logo">
            <img src={Logo} className="logo" />
          </Link>
        )}
        <MainSearchBar />
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <>
            {userIsSet && user ? (
              <li>
                <span
                  className={'nav-links'}
                  onClick={async () => {
                    await logout();
                    setUser(null);
                    setUserIsSet(false);
                    navigate('/');
                  }}>
                  Sign Out
                </span>
              </li>
            ) : (
              <li>
                <Link to="/sign-in" className="nav-links">
                  Sign In
                </Link>
              </li>
            )}
          </>
          <li>
            <Link to="/rent" className="nav-links">
              Rent
            </Link>
          </li>
          <li>
            <Link to="/sell" className="nav-links">
              Sell
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-links">
              <ShoppingCartOutlined size={60} />
            </Link>
          </li>
          <>
            {userIsSet && user ? (
              <>
                <li>
                  <Dropdown
                    overlay={settingsMenu}
                    placement="bottomRight"
                    arrow>
                    <span className="nav-links">
                      <SettingOutlined />
                    </span>
                  </Dropdown>
                </li>
              </>
            ) : null}
          </>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
