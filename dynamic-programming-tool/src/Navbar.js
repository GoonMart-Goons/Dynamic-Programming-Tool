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
            <CNavbar className="nav" expand="lg" colorScheme="dark" >
                <CContainer fluid>
                    <CNavbarBrand className="navLogo" href="/home">
                        <img
                            src={dpLogo}
                            alt=""
                            width="199.5"
                            height="111.72"
                            className="d-inline-block align-top"
                        />
                        <h1>{placeholder}</h1>
                    </CNavbarBrand>

                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse  className="navbar-collapse" visible={visible} fluid>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink className="navLink" href="/home" active={isActive(["/home"])}>
                                    HOME
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="/introduction"  active={isActive(["/introduction"])}>INTRODUCTION</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="/topdown"  active={isActive(["/topdown"])}>TOP-DOWN APPROACH</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="/bottomup"  active={isActive(["/bottomup"])}>BOTTOM-UP APPROACH</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="#"  active={isActive(["/finaltest"])}>FINAL TEST</CNavLink>
                            </CNavItem>

                            <CButton className="navLink" href="/" type="button" color="success" variant="ghost">
                                SIGN UP
                            </CButton>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    )
}
export default Navbar;