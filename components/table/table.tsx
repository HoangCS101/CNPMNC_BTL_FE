import React, { useState } from "react";
import { columns, users, User } from "./data";
import { RenderCell } from "./render-cell";
import Modal from "../modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export const TableWrapper = () => {
  const [data] = useState<User[]>(users); // Sử dụng dữ liệu giả từ `data.ts`
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDetailsClick = (user: User) => {
    setSelectedUser(user);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    setSelectedUser(null);
  };

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
          {(item: User) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell
                    user={item}
                    columnKey={columnKey}
                    onDetailsClick={() => handleDetailsClick(item)}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={visible} onClose={closeHandler}>
        {selectedUser && (
          <div>
            <h2>Chi tiết sản phẩm</h2>
            <p><strong>Tên sản phẩm:</strong> {selectedUser.name}</p>
            <p><strong>Giá:</strong> {selectedUser.total}</p>
            <p><strong>Tình trạng:</strong> {selectedUser.status}</p>
            <p><strong>Điều kiện:</strong> {selectedUser.condition}</p>
            <p><strong>Số lượng:</strong> {selectedUser.count}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};
