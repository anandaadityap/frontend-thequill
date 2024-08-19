/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BackButton from "@/components/back-button";
import EditSection from "@/components/edit-section";
import Navbar from "@/components/navbar";
import { getUserById } from "@/lib/action";
import { useTokenStore } from "@/lib/store";
import { Avatar, Card, Flex } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

import EditAvatar from "@/components/edit-avatar";

const EditProfile = () => {
  const [data, setData] = useState<any>(null);
  const { token, refreshToken, avatar } = useTokenStore();
  useEffect(() => {
    refreshToken();
    fetchData();
  }, []);

  const fetchData = useDebouncedCallback(async () => {
    const data = await getUserById(token);
    setData(data);
  }, 500);

  return (
    <div>
      <Navbar />
      <div className="px-5 md:px-10 lg:max-w-screen-md max-w-screen-lg lg:p-0 mx-auto">
        <BackButton href="/profile" />

        <Card
          shadow="xs"
          padding="lg"
          radius="md"
          className="mb-5 flex flex-col gap-5"
          withBorder
        >
          <Flex
            justify="space-between"
            align="center"
          >
            <Avatar
              src={avatar}
              radius="xl"
            />
            <EditAvatar token={token} />
          </Flex>
          <EditSection
            section="role"
            value={data?.role}
          />
          <EditSection
            section="username"
            value={data?.username}
            withEdit
          />
          <EditSection
            section="email"
            value={data?.email}
            withEdit
          />
          <EditSection
            section="biodata"
            value={data?.biodata}
            withEdit
          />
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
