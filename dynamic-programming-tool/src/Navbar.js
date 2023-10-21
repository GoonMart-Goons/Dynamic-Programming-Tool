import { CNavbar, CNavItem, CNavLink, CNavbarToggler, CCollapse, CNavbarNav, CDropdown, CContainer,CNavbarBrand,
    CDropdownToggle, CDropdownItem, CDropdownMenu, CDropdownDivider, CButton} from '@coreui/react';
import {useState} from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import dpLogo from './Images/dp2.png';
import { Link, useLocation } from "react-router-dom";
import "./Styles/TopDown.css";
import {app, auth} from "./Database/firebase";


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
                    <div className="headerTitles">
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
                                <CNavLink className="navLink" href="/questionsh"  active={isActive(["/questionsh"])}>QUESTIONS</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="/topdowntest"  active={isActive(["/topdowntest"])}>GRAPHING TOOL</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="/"  active={isActive(["/"])}>PROGRESS</CNavLink>
                            </CNavItem>
                            {/* <CNavItem>
                                <CNavLink className="navLink" href="/topdown"  active={isActive(["/topdown"])}>TOP-DOWN APPROACH</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className="navLink" href="/bottomup"  active={isActive(["/bottomup"])}>BOTTOM-UP APPROACH</CNavLink>
                            </CNavItem> 
                            <CNavItem>
                                <CNavLink className="navLink" href="#"  active={isActive(["/finaltest"])}>FINAL TEST</CNavLink>
                            </CNavItem> */}

                            <CButton className="navLink" onClick={() => auth.signOut()} href="/" type="button" color="success" variant="ghost">
                                SIGN OUT
                            </CButton>
                        </CNavbarNav>
                    </CCollapse>
                    </div>
                </CContainer>
            </CNavbar>
        </>
    )
}
export default Navbar;