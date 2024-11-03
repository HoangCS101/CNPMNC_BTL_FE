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

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // State để lưu trữ thông tin sản phẩm
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = async () => {
    const productData = {
      name,
      price,
      status,
      condition,
      quantity,
    };

    try {
      const response = await axios.post('http://10.128.104.97:8080/user/1/asset/post', productData);
      console.log('Product added:', response.data);
      // Bạn có thể thêm logic xử lý sau khi thành công ở đây
      onOpenChange(false); // Đóng modal sau khi gửi
      // Reset các trường nhập liệu
      setName("");
      setPrice("");
      setStatus("");
      setCondition("");
      setQuantity("");
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
                Add Products
              </ModalHeader>
              <ModalBody>
                <Input 
                  label="Name product" 
                  variant="bordered" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input 
                  label="price" 
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
                  label="Condition" 
                  variant="bordered" 
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
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
                  Add Products
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
