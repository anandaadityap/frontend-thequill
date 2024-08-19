import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const EditAvatar = ({ token }: { token: string }) => {
  const [image, setImage] = useState("");
  console.log(image);
  const [opened, { open, close }] = useDisclosure(false);

  const uploadImageToCloudinary = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      throw new Error("No file selected");
    }
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/image/upload-article`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await res.data;
    const url = data.secure_url;

    setImage(url);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/update`,
        { avatar_url: image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      location.reload();
    } catch (error: any) {
      throw new Error("Error");
    }
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Avatar"
      >
        <div className="w-full mb-5">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={uploadImageToCloudinary}
            />
            <div className="flex items-center justify-center border-2 border-gray-300 p-3">
              {image ? (
                <Image
                  width={1000}
                  height={1000}
                  src={image}
                  alt="Preview"
                  className="object-cover h-[350px] w-full"
                />
              ) : (
                <p className="text-gray-500">Choose an image Cover</p>
              )}
            </div>
          </div>
        </div>
        <Button onClick={handleUpdate}>save</Button>
      </Modal>

      <Button
        size="sm"
        w={75}
        className="w-[30%]"
        onClick={open}
      >
        Edit
      </Button>
    </div>
  );
};

export default EditAvatar;
