import React from "react";
import { Container, Row } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import "../styles/Admin-nav.css";
import { Link, NavLink } from "react-router-dom";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "Add-Product",
    path: "/dashboard/add-product",
  },
  {
    display: "All-Product",
    path: "/dashboard/all-products",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <header className="Admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>
                  <Link className="text-decoration-none text-white" to="/home">
                    Furnizone
                  </Link>
                </h2>
              </div>
              <div className="search__box ">
                <input type="text" placeholder="Search...." className="form-control" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line fs-5 text-white"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line fs-5 text-white"></i>
                </span>
                <img src={currentUser.photoURL} alt={currentUser.name} />
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* Admin Menu */}
      <section className="admin-menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "admin__menu-active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
