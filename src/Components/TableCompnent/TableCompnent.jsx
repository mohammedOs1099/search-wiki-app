import { Table } from "react-bootstrap";

export default function TableCompnent({ showData }) {
  return (
    <>
      <Table
        hover
        variant="dark"
        size="string"
        striped={"string"}
        rules=""
        className=" table   "
      >
        <thead className=" thead   ">
          <tr className=" tr text-center ">
            <th className=" text-start">#</th>
            <th>Title</th>
            <th className="  ">Description</th>
          </tr>
        </thead>
        <tbody>{showData()}</tbody>
      </Table>
    </>
  );
}
