import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GetLoanDetail, PayLoan } from "../service";
import AdminHeader from "../common/AdminHeader";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { NumericFormat } from "react-number-format";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllLoan = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [payment, setPayment] = useState(0);
  const navigate = useNavigate();
  let notication = "";

  let { id } = useParams();

  const toggle = () => {
    setModal(!modal);
  };

  const notify = (val, status) => {
    status
      ? toast.update(val, {
          render: "Saved Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          onClose: () => navigate("/all_loans/1"),
        })
      : toast.update(val, {
          render: `Amount will be greate than weekly payment amount ${data.weekly_payment}`,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
  };

  const _GetLoan = () => {
    var result = GetLoanDetail(id);
    result.then((response) => {
      setData(response.data);
      setLoader(false);
      const weeklyPayment = response.data.weekly_payment;
      setPayment(parseFloat(weeklyPayment).toFixed(2));
    });
  };

  const handlePayment = () => {
    notication = toast.loading("Please wait...");
    if (payment === undefined || payment === 0) {
      setPayment(data.weekly_payment);
    }
    if (
      parseFloat(payment).toFixed(2) >=
      parseFloat(data.weekly_payment).toFixed(2)
    ) {
      const Date = data.dueDate;
      PayLoan(id, payment, Date).then((data) => {
        if (data.success) {
          notify(notication, true);
        }
      });
    } else {
      notify(notication, false);
    }
  };

  useEffect(() => {
    setLoader(true);
    _GetLoan(id);
  }, [id]);

  const formatDate = (dateString, daysToAdd) => {
    const dateObject = new Date(dateString);

    // Add the specified number of days to the date
    dateObject.setDate(dateObject.getDate() + daysToAdd);

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
            <AdminHeader />
            <div className="d-block mx-auto w-100 pt-5 mt-5 table-box">
              <div className="row  submission-rowwrap">
                <div className="col-md-12">
                  <div className="card dashboard-box addagent-datatable submissions-tabs-view">
                    <h2 className="h3-wrapheading ps-2 mb-4 py-2  text-start">
                      Payment
                    </h2>
                    <div className="col-sm-12">
                      <div className="viewagent-datatable table-responsive">
                        <table className="table" id="table-width">
                          <thead>
                            <tr>
                              <th scope="col">Policy Name</th>
                              <th scope="col">Loan Amount</th>
                              <th scope="col">Balance Amount</th>
                              <th scope="col">Weekly Payment</th>
                              <th scope="col">Weekly Payment Date</th>
                              <th scope="col" width="10%">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data && data?.length !== 0 && (
                              <>
                                <tr>
                                  <td>{data.policyname}</td>
                                  <td>{data.loan_amount}</td>
                                  <td>{data.balance_amount}</td>
                                  <td> {data.weekly_payment} </td>
                                  <td>{formatDate(data.dueDate, 0)}</td>
                                  <td>
                                    <button onClick={toggle}>Pay</button>
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Loan Amount to be Paid</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="weeklyPayment">Weekly Payment:</label>
                {data && data.loan_term === 1 ? (
                  <input
                    className="form-control default-input"
                    type="text"
                    id="loan_amount"
                    name="loan_amount"
                    defaultValue={parseFloat(data.weekly_payment).toFixed(2)}
                    readOnly // Make the input read-only if data.loan_term is 1
                  />
                ) : (
                  <NumericFormat
                    inputMode="numeric"
                    autoComplete="off"
                    className="form-control default-input"
                    type="text"
                    id="loan_amount"
                    name="loan_amount"
                    defaultValue={
                      data ? parseFloat(data.weekly_payment).toFixed(2) : 0
                    }
                    onChange={(e) => setPayment(e.target.value)}
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-primary btn-lg"
                onClick={handlePayment}
              >
                Pay
              </button>
            </ModalFooter>
          </Modal>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default AllLoan;
