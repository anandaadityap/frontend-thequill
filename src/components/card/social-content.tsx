import { Group, Text } from "@mantine/core";
import React from "react";
import { FaComment, FaHandsClapping } from "react-icons/fa6";

interface SocialContentProps {
  date: string;
}

const SocialContent = ({ date }: SocialContentProps) => {
  return (
    <Group>
      <Text size="sm">{date}</Text>
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
  );
};

export default SocialContent;
