/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Navbar from "@/components/navbar";
import { getContentById } from "@/lib/action";
import { useTokenStore } from "@/lib/store";
import { ResponseGetContent } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Avatar, Group, Text } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaComment, FaHandsClapping } from "react-icons/fa6";

const Content = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any>(null);
  const { refreshToken, token } = useTokenStore();

  useEffect(() => {
    refreshToken();
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getContentById(params.id, token);
    setData(data);
  };

  return (
    <div className="pb-40">
      <Navbar />
      <div className="px-5 md:px-10 lg:max-w-screen-md max-w-screen-lg lg:p-0 mx-auto">
        <h1 className="text-5xl font-bold text mb-2">{data?.title}</h1>
        <h1 className="text-3xl  text mb-5">{data?.subject}</h1>

        <Image
          width={1000}
          height={1000}
          src={data?.image_banner}
          alt="Image Banner"
          className="object-cover h-[350px] w-full mb-5"
        />
        <Group className="mb-2">
          <Avatar
            src={data?.user?.avatar_url}
            radius="xl"
          />
          <div>
            <Text
              size="sm"
              fw={500}
            >
              {data?.user?.username}
            </Text>
          </div>
        </Group>

        <Group className="mb-5">
          <Text size="sm">{formatDate(data?.created_at)}</Text>
          <Group gap="xs">
            <FaHandsClapping className="cursor-pointer text-black/30 hover:text-black" />
            <Text
              c="dimmed"
              size="sm"
            >
              1.2k
            </Text>
          </Group>
          <Group gap="xs">
            <FaComment className="cursor-pointer hover:text-black/70" />
            <Text
              c="dimmed"
              size="sm"
            >
              500
            </Text>
          </Group>
        </Group>

        <div
          className="text-xl text-justify"
          dangerouslySetInnerHTML={{ __html: data?.article }}
        />
      </div>
    </div>
  );
};

export default Content;
