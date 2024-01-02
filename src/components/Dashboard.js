import React from "react";
import { Card, CardImg, CardTitle, CardText, Row, Col } from "reactstrap";
import loan_img from "../asset/Image/loan_img.jpg";
import repay_img from "../asset/Image/repay_img.jpg";
import { Link } from "react-router-dom";
import AdminHeader from "../common/AdminHeader";

const MainPage = (props) => {
  return (
    <main>
      <div id="main" className="pb-0">
        <div className="main-wrap">
          <div className="container pt-4 pb-5">
            <Row>
              <AdminHeader />
              <Col sm="12">
                <div className="text-center pt-4 pb-4">
                  <h1>Welcome to Mini Loan App</h1>
                </div>
              </Col>
              <Col sm="12" md={{ size: 5, offset: 1 }}>
                <CardImg
                  top
                  width="100%"
                  height="62%"
                  src={loan_img}
                  alt="Card image cap"
                />
                <Card body>
                  <CardTitle className="h3">Apply for loan</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Link to={`/loan/`} className="btn btn-success btn-lg">
                    Apply Now
                  </Link>
                </Card>
              </Col>
              <Col sm="12" md="5">
                <CardImg
                  top
                  width="100%"
                  height="62%"
                  src={repay_img}
                  alt="Card image cap"
                />
                <Card body>
                  <CardTitle className="h3">Repay existing loan</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Link to={`/all_loans/1`} className="btn btn-success btn-lg">
                    Repay
                  </Link>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
