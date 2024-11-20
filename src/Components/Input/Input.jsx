import { Form } from "react-bootstrap";

export default function Input({ term, handelChange }) {
  return (
    <>
      <Form>
        <Form.Group className="m-3  " controlId="formBasicEmail">
          <Form.Control
            value={term}
            onChange={(e) => {
              handelChange(e.target.value);
            }}
            className=" border border-info focus-ring-success  rounded-4  "
            type="search"
            placeholder="Search wiki"
          />
        </Form.Group>
      </Form>
    </>
  );
}
