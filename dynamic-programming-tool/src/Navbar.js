import { CNavbar, CNavItem, CNavLink, CNavbarToggler, CCollapse, CNavbarNav, CDropdown, CContainer,CNavbarBrand,
    CDropdownToggle, CDropdownItem, CDropdownMenu, CDropdownDivider, CButton} from '@coreui/react';
import {useState} from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import dpLogo from './Images/dp2.png';
function Navbar({placeholder}){
    const [visible, setVisible] = useState(false)

    return (
        <>
            <CNavbar expand="lg" colorScheme="light" className="bg-light">
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
                                <CNavLink href="/home" active>
                                    Home
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="/introduction">Introduction</CNavLink>
                            </CNavItem>
                            <CDropdown variant="nav-item" popper={false}>
                                <CDropdownToggle>Exercise List</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem href="/topdown">Top-down Approach</CDropdownItem>
                                    <CDropdownItem href="bottomup">Bottom-up Approach</CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem href="#">Final Test</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <CButton href="/" type="button" color="dark" variant="ghost">
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