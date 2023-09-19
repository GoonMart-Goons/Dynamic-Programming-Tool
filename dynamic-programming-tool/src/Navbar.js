import { CNavbar, CNavItem, CNavLink, CNavbarToggler, CCollapse, CNavbarNav, CDropdown, CContainer,CNavbarBrand,
    CDropdownToggle, CDropdownItem, CDropdownMenu, CDropdownDivider, CButton} from '@coreui/react';
import {useState} from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import dpLogo from './Images/dp2.png';
import { Link, useLocation } from "react-router-dom";
import "./Styles/TopDown.css";


function Navbar({placeholder}){
    const [visible, setVisible] = useState(false)
    const location = useLocation();
    const isActive = (paths) => paths.some((path) => location.pathname === path);

    return (
        <>
            <CNavbar className="nav" expand="lg" colorScheme="light" >
                <CContainer fluid>
                    <CNavbarBrand href="/home">
                        <img
                            src={dpLogo}
                            alt=""
                            width="175"
                            height="98"
                            className="d-inline-block align-top"
                        />
                        <h1>{placeholder}</h1>
                    </CNavbarBrand>

                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink className="navLink" href="/home" active={isActive(["/home"])}>
                                    Home
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="/introduction" active={isActive(["/introduction"])}>Introduction</CNavLink>
                            </CNavItem>
                            <CDropdown variant="nav-item" popper={false} active={isActive(["/topdown","/bottomup"])}>
                                <CDropdownToggle className="navLink" >Exercise List</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem href="/topdown" active={isActive(["/topdown"])}>Top-down Approach</CDropdownItem>
                                    <CDropdownItem href="bottomup" active={isActive(["/bottomup"])}>Bottom-up Approach</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem href="#" active={isActive(["/finaltest"])}>Final Test</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <CButton className="navLink" href="/" type="button" color="success" variant="ghost">
                                Sign Out
                            </CButton>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    )
}
export default Navbar;