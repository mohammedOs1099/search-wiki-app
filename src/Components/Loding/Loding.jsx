import { Spinner } from "react-bootstrap";
export default function Loding() {
    return (
      <>
        <div className=" text-center text-info   ">
          <Spinner animation="border" variant="info" />
          <p >Loading results...</p>
        </div>
      </>
    );
}
