/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Navbar from "@/components/navbar";
import { useTokenStore } from "@/lib/store";
import { Button } from "@mantine/core";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateContent = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [article, setArticle] = useState("");
  const reactQuillRef = useRef<ReactQuill>(null);
  const { token, refreshToken } = useTokenStore();
  const router = useRouter();
  console.log(token);

  useEffect(() => {
    refreshToken();
  }, []);

  const uploadImageArticleToCloudinary = async (
    file: File
  ): Promise<string> => {
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

    return url;
  };

  const uploadImageBannerToCloudinary = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      throw new Error("No file selected");
    }
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/image/upload-banner`,
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

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await uploadImageArticleToCloudinary(file);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
      }
    };
  }, []);

  const handlePost = async () => {
    try {
      const content = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content`,
        {
          title: title,
          subject: subject,
          article: article,
          image_banner: image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Article saved!");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-5 md:px-10 lg:max-w-screen-md max-w-screen-lg lg:p-0 mx-auto">
        <h1 className="text-4xl font-bold mb-5">Create New Content</h1>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="text-4xl focus:outline-none p-3 border-2 font-bold"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="text-2xl focus:outline-none p-3 border-2"
            placeholder="Subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="w-full">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={uploadImageBannerToCloudinary}
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
          <ReactQuill
            ref={reactQuillRef}
            theme="snow"
            placeholder="Start writing..."
            modules={{
              toolbar: {
                container: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image"],
                  ["code-block"],
                  [{ align: [] }],
                  ["clean"],
                ],
                handlers: {
                  image: imageHandler,
                },
              },
              clipboard: {
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
              "code-block",
            ]}
            value={article}
            onChange={setArticle}
          />
        </div>
        <Button
          onClick={handlePost}
          className="mt-5"
        >
          Post Content
        </Button>
      </div>
    </div>
  );
};

export default CreateContent;
