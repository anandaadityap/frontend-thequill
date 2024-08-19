import { Avatar, Group, Text } from "@mantine/core";

interface AvatarProfileProps {
  avatar: string;
  name: string;
  email?: string;
}

const AvatarProfile = ({ avatar, name, email }: AvatarProfileProps) => {
  return (
    <Group>
      <Avatar
        src={avatar}
        radius="xl"
      />
      <div>
        <Text
          size="sm"
          fw={500}
        >
          {name}
        </Text>

        <Text
          c="dimmed"
          size="xs"
        >
          {email}
        </Text>
      </div>
    </Group>
  );
};

export default AvatarProfile;
