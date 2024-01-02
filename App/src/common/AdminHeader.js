import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function App() {
  const navigate = useNavigate();
  const [openNavColorSecond, setOpenNavColorSecond] = useState(false);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    // Redirect to the login page or any other page you prefer
    navigate("/login");
  };

  return (
    <>
      <MDBNavbar expand="lg" dark bgColor="dark">
        <MDBContainer fluid>
          <MDBNavbarBrand href="">Dashboard</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNavColorSecond(!openNavColorSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColorSecond} navbar id="navbarColor02">
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink href="/all_loans/1">Loan List</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/loan/">Apply Loan</MDBNavbarLink>
              </MDBNavbarItem>
              
            </MDBNavbarNav>
            <MDBNavbarLink
                className="nav-logout me-2"
                onClick={handleLogout}
                href="#"
              >
                Logout
              </MDBNavbarLink>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
