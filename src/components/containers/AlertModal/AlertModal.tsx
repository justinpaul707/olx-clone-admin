import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

const AlertModal = (props: any) => {
  const navigate = useNavigate();

  return (
      <div className="form-wrap">
        <Row className="gy-4">
          <Col lg={12}>
            <div className="modal-warning-text-wrap">
              <div className="warning-img-wrap">
                <img src="/images/delete-warning.svg" alt="warning-icon" />
              </div>
              <h5 className="modal-warning-title">Are you sure ?</h5>
              <small className="sub-text">Do you really want to Logout.</small>
            </div>
          </Col>

          <Col lg={12}>
            <div className="submit-btn-wrap centered">
              <Button
                color={"danger"}
                outline
                className="sm"
                onClick={() => props?.setIsOpenLogout(false)}
              >
                Cancel
              </Button>
            <Button color={"primary"} className="sm"ew>
                Logout
              </Button>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default AlertModal;