
import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import axios from "axios";

interface Props {
  user: { [key: string]: any }; // Cập nhật kiểu dữ liệu cho user
  columnKey: string | React.Key;
  onDetailsClick: () => void;
}



export const RenderCell = ({ user, columnKey, onDetailsClick  }: Props) => {
  // Tách chuỗi columnKey nếu có dấu '.'
  const cellValue = user[columnKey as keyof UserType];

  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split("."); // Tách đường dẫn thành mảng
    let value = obj;
    keys.forEach((key) => {
      if (value) {
        value = value[key];
      }
    });
    return value;
  };

  const cellValue = getNestedValue(user, String(columnKey)); // Lấy giá trị của cellValue

  const handleDelete = async (userId: number) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa hàng này không?");
    if (confirmed) {
      try {
        const response = await axios.delete(`http://192.168.231.44:8080/asset/${userId}`);
        console.log("Delete user response:", response.data);
        // Cập nhật lại giao diện người dùng ở đây nếu cần
        window.location.reload();
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
            cellValue === "Còn hàng"
              ? "success"
              : cellValue === "Hết hàng"
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
          <div>
            <Tooltip content="Details">
              <button onClick={onDetailsClick}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log("Edit user", user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => console.log("Delete user", user.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );

    default:
      return <>{cellValue}</>;
  }
};
