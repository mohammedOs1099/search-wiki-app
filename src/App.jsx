import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import axios from "axios";
import DOMPurify from "dompurify";
import Input from "./Components/Input/Input";
import Loding from "./Components/Loding/Loding";
import ErrorMassage from "./Components/ErrorMassage/ErrorMassage";
import TableCompnent from "./Components/TableCompnent/TableCompnent";

function App() {
  const [term, setTerm] = useState("");
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState({});
  const handelChange = (value) => {
    setTerm(value);
  };
  useEffect(() => {
    const search = async () => {
      setLoding(true);
      const source = axios.CancelToken.source();
      try {
        const respons = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            srsearch: term,
            format: "json",
            origin: "*"
          },
          cancelToken: source.token
        });

        setResult(respons.data);
      } catch (error) {
        if (!axios.isCancel()) {
          setError(`${error} !! Failed to fetch results. Please try again. `);
        }
      } finally {
        setLoding(false);
      }
      return () => source.cancel("Operation canceled due to new request.");
    };
    if (term) {
      const debounce = setTimeout(() => search(), 500);

      return () => clearTimeout(debounce);
    } else {
      setResult([])
    }
  }, [term]);

  const display = () => {
    const list = result?.query?.search;

    if (!list || list.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="text-center text-danger">
            No results found.
          </td>
        </tr>
      );
    }

    return list?.map((ele, index) => (
      <tr key={ele.pageid}>
        <td className="">{index + 1}-</td>
        <td className=" text-nowrap text-center  ">
          <a
            href={`https://en.wikipedia.org/?curid=${ele.pageid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-bold  text-info"
          >
            {ele?.title}
          </a>
        </td>

        <td
          className=" "
          dangerouslySetInnerHTML={{
            __html:DOMPurify.sanitize(ele?.snippet)}
          }
        />
      </tr>
    ));
  };

  return (
    <>
      <Container fluid="sm" className="">
        <Row>
          <h1 className=" text-center m-3 text-info text-decoration-underline  ">
            Wiki Search
          </h1>
          <Col>
            <Input term={term} handelChange={handelChange} />
          </Col>
        </Row>
        <Row className=" m-3 ">
          <Col>
            {loding ? (
              <Loding />
            ) : error ? (
              <ErrorMassage error={error} />
            ) : (
              
                <TableCompnent showData={display} />
              
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
