import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { columns } from "./data"; // Chỉ import columns
import { RenderCell } from "./render-cell";
import axios from "axios";
const fakeData = [
  {
    "id": 1,
    "name": "asset1",
    "quantity": 10,
    "price": 10,
    "status": "INACTIVE",
    "department": {
        "id": 1,
        "name": "department1"
    }
}
];
export const TableWrapper = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.231.44:8080/asset');
        setData(response.data.data); // Giả sử response.data là mảng dữ liệu
        console.log(response.data); //
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // setData(fakeData);
  }, []);
  

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {RenderCell({ user: item, columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};