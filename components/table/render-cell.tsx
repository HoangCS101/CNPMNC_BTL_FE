import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { users } from "./data";
import axios from "axios";

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey];

  const handleDelete = async (userId: number) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
    if (confirmed) {
      try {
        const response = await axios.delete(`http://10.128.104.97:8080/asset/${userId}`);
        console.log("Delete user response:", response.data);
        // Cập nhật lại giao diện người dùng ở đây nếu cần
      } catch (error) {
        console.error("Error deleting user:", error);
        // Thông báo lỗi cho người dùng nếu cần
      }
    }
  };

  switch (columnKey) {
    case "role":
      return (
        <div>
          <span>{cellValue}</span>
          <span>{user.team}</span>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
              ? "danger"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <button onClick={() => console.log("View user", user.id)}>
              <EyeIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Edit user" color="secondary">
            <button onClick={() => console.log("Edit user", user.id)}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Delete user" color="danger">
            <button onClick={() => handleDelete(user.id)}>
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>
        </div>
      );

    default:
      return cellValue;
  }
};

