"use client";
import { Card, Text, Group, Flex, Avatar } from "@mantine/core";
import Link from "next/link";
import AvatarProfile from "../avatar-profile";
import TitleContent from "./title-content";

const CardMisc = () => {
  return (
    <Link href="/content">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="mb-2"
      >
        <Flex
          direction="column"
          gap="sm"
        >
          <AvatarProfile
            avatar="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            name="Ananda Aditya Putra"
          />

          <TitleContent
            titleSize="xl"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam harum provident consectetur sequi doloremque autem placeat quos, accusantium aspernatur voluptatibus eaque enim ea repellendus nulla, ipsum fugit nesciunt totam commodi!"
          />
        </Flex>
      </Card>
    </Link>
  );
};

export default CardMisc;
