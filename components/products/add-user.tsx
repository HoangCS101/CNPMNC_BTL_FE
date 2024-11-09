import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import axios from "axios";

export const AddProduct = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State để lưu trữ thông tin sản phẩm và department dưới dạng đối tượng
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState({ id: 0, name: "" });  // Department dưới dạng đối tượng
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = async () => {
    const productData = {
      name,
      price,
      status,
      departmentName: department.name,  // Truyền department.name vào API
      quantity,
    };

    try {
      const response = await axios.post('http://192.168.231.44:8080/user/1/asset/post', productData);
      console.log('Product added:', response.data);
      // Đóng modal và reset các trường sau khi thêm sản phẩm thành công
      onOpenChange(false);
      setName("");
      setPrice("");
      setStatus("");
      setDepartment({ id: 0, name: "" });  // Reset department về mặc định
      setQuantity("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }

  };

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Add Product
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Product
              </ModalHeader>
              <ModalBody>
                {/* Input fields */}
                <Input 
                  label="Name product" 
                  variant="bordered" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input 
                  label="Price" 
                  variant="bordered" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input 
                  label="Status" 
                  variant="bordered" 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <Input 
                  label="Department" 
                  variant="bordered" 
                  value={department.name}  // Hiển thị department.name
                  onChange={(e) => setDepartment({ ...department, name: e.target.value })}  // Cập nhật department.name
                />
                <Input 
                  label="Quantity" 
                  variant="bordered" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAddProduct}>
                  Add Product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
