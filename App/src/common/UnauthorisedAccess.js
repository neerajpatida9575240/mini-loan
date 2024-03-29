import React from "react";
import { NavLink } from "react-router-dom";

const UnauthorizedAccess = () => {
  const storageToken = localStorage.getItem("token");
  return (
    <>
      {storageToken === null &&
        <main>
          <div className="container pt-5">
            <div className="row justify-content-md-center">
              <div className="col-md-auto text-center">
                <div className="Paymentcard">
                  <div className="pb-2 unautorized-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.143 2l5.857 5.858v8.284l-5.857 5.858h-8.286l-5.857-5.858v-8.284l5.857-5.858h8.286zm.828-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm.932 11.667c-.127.328-1.695 3.888-2.096 4.786-.42.941-1.239 1.881-2.751 1.881h-2.627c-1.592 0-2.43-.945-2.43-2.596v-7.208c0-.956 1.316-.908 1.316-.044v3.16c0 .26.478.259.478 0v-5.079c0-.982 1.472-.957 1.472 0v4.795c0 .264.443.252.443-.005v-5.628c0-.957 1.457-.984 1.457 0l.001 5.692c0 .254.459.261.459 0v-4.78c0-.905 1.596-.933 1.596 0v5.417c0 .331.327.384.45.131.118-.24.605-1.315.613-1.327.49-1.029 2.128-.404 1.619.805z" />
                    </svg>
                  </div>
                  <h1 className="m-2 unauthorized-text">
                    Unauthorized Access !
                  </h1>
                  <p className="text-center">
                    {storageToken === null && (
                      <NavLink
                        to="/login"
                        className="btn btn-primary btn-sm  unauthorized-btn"
                      >
                        Back to Login
                      </NavLink>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    </>
  );
};

export default UnauthorizedAccess;
