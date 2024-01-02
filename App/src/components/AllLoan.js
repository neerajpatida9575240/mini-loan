import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LoanList, changestatus } from "../service";
import AdminHeader from "../common/AdminHeader";
import RepayLoan from "./RepayLoan";

const AllLoan = () => {
  const [pager, setpager] = useState({});
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  let { page } = useParams();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const _LoanList = () => {
    var result = LoanList(page, email, role);
    result.then((response) => {
      setpager(response.pager);
      setData(response.LoanList);
      setLoader(false);
    });
  };

  useEffect(() => {
    setLoader(true);
    _LoanList(page, email, role);
  }, [page]);

  const _changeStatus = async (e, Id) => {
    setLoader(true);
    if (e.target.value === "Pay") {
      navigate(`/repay/id=${Id}`);
    } else {
      changestatus(e.target.value, Id).then((data) => {
        if (data.success) {
          _LoanList(page, email, role);
          setLoader(false);
        } else {
          setLoader(false);
        }
      });
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = `${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObject
      .getDate()
      .toString()
      .padStart(2, "0")}-${dateObject.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
    <AdminHeader />
      {loader ? (
        <>
          <div className="loader-setting">
            <div
              className="spinner-border d-flex align-items-center justify-content-center"
              role="status"
            ></div>
          </div>
        </>
      ) : (
        <>
          <main>
            <div className="d-block mx-auto w-100 pt-5 mt-5 table-box">
              <div className="row  submission-rowwrap">
                <div className="col-md-12">
                  <div className="card dashboard-box addagent-datatable submissions-tabs-view">
                    <h2 className="h3-wrapheading ps-2 mb-4 py-2  text-start">
                      Loan
                    </h2>
                    <div className="col-sm-12">
                      <div className="viewagent-datatable table-responsive">
                        <table className="table" id="table-width">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Loan Amount</th>
                              <th scope="col">Weekly Payment</th>
                              <th scope="col">Loan Applied Date</th>
                              <th scope="col">Status</th>
                              <th scope="col" width="10%">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.length !== 0 &&
                              data?.map((items, index) => (
                                <>
                                  <tr key={index}>
                                    <td>{items.policyname}</td>
                                    <td>{items.email}</td>
                                    <td>{items.loan_amount}</td>
                                    <td>{items.weekly_payment}</td>
                                    <td>{formatDate(items.createdDate)}</td>
                                    <td>{items.loan_approved}</td>

                                    <td>
                                      <div
                                        className="border-0 d-flex"
                                        style={{ width: "150px" }}
                                      >
                                        <select
                                          onChange={(e) =>
                                            _changeStatus(e, items._id)
                                          }
                                        >
                                          <option value="">Select</option>
                                          {role === "admin" && (
                                            <>
                                              <option value="Approved">
                                                Approve
                                              </option>
                                              <option value="Denied">
                                                Denied
                                              </option>
                                            </>
                                          )}
                                          {items.loan_approved ===
                                            "Approved" && (
                                            <>
                                              <option value="Pay">
                                                Pay Now
                                              </option>
                                            </>
                                          )}
                                        </select>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="card-footer pb-0 pt-3 pagination-cards">
                        {pager.pages && pager.pages.length && (
                          <ul className="pagination">
                            <li
                              className={`page-item first-item ${
                                pager.currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <Link to={`/all_loans/1`} className="page-link">
                                First
                              </Link>
                            </li>
                            <li
                              className={`page-item previous-item ${
                                pager.currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <Link
                                to={`/all_loans/${pager.currentPage - 1}`}
                                className="page-link"
                              >
                                Previous
                              </Link>
                            </li>
                            {pager.pages.map((page, index) => (
                              <li
                                key={index}
                                className={`page-item number-item ${
                                  pager.currentPage === page ? "active" : ""
                                }`}
                              >
                                <Link
                                  to={`/all_loans/${page}`}
                                  className="page-link"
                                >
                                  {page}
                                </Link>
                              </li>
                            ))}
                            <li
                              className={`page-item next-item ${
                                pager.currentPage === pager.totalPages
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              <Link
                                to={`/all_loans/${pager.currentPage + 1}`}
                                className="page-link"
                              >
                                Next
                              </Link>
                            </li>
                            <li
                              className={`page-item last-item ${
                                pager.currentPage === pager.totalPages
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              <Link
                                to={`/all_loans/${pager.totalPages}`}
                                className="page-link"
                              >
                                Last
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default AllLoan;
