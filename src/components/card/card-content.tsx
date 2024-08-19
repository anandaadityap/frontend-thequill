"use client";
import { Card, Image, Group, Flex } from "@mantine/core";
import Link from "next/link";
import AvatarProfile from "../avatar-profile";
import TitleContent from "./title-content";
import SocialContent from "./social-content";
import { getAllContent } from "@/lib/action";
import { useEffect, useState } from "react";
import { ResponseGetContent } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const CardContent = ({ contentData, error, loading }: any) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      {contentData.map((content: ResponseGetContent) => (
        <Link
          href={`/content/${content.id}`}
          key={content.id}
        >
          <Card
            shadow="xs"
            padding="lg"
            radius="md"
            className="mb-5"
            withBorder
          >
            <Flex gap="md">
              <Flex
                className="w-[75%]"
                direction="column"
                justify="space-between"
              >
                <div>
                  <AvatarProfile
                    avatar={content.user.avatar_url}
                    name={content.user.username}
                  />
                  <TitleContent
                    titleSize="3xl"
                    title={content.title}
                    subject={content.subject}
                  />
                </div>
                <SocialContent date={formatDate(content.created_at)} />
              </Flex>
              <div className="w-[25%] flex justify-center items-center">
                <div className="h-52 w-full">
                  <Image
                    src={content.image_banner}
                    alt="image"
                    height={50}
                    width={50}
                    className="object-cover h-full w-full "
                  />
                </div>
              </div>
            </Flex>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default CardContent;
