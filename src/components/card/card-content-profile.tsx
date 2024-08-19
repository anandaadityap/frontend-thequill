"use client";
import { Card, Image, Group, Flex, Button } from "@mantine/core";
import Link from "next/link";
import AvatarProfile from "../avatar-profile";
import TitleContent from "./title-content";
import { ResponseGetContent } from "@/lib/types";
import axios from "axios";
import { useTokenStore } from "@/lib/store";

const CardContentProfile = ({ contentData, error, loading }: any) => {
  const { token } = useTokenStore();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const deleteContent = async (contentId: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content/${contentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      location.reload();
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      {contentData.map((content: ResponseGetContent) => (
        <Card
          shadow="xs"
          padding="lg"
          radius="md"
          className="mb-5"
          withBorder
          key={content.id}
        >
          <Flex gap="md">
            <Flex
              className="w-[75%]"
              direction="column"
              justify="space-between"
            >
              <Flex
                justify="space-between"
                direction="column"
                className="h-full"
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
                <Group>
                  <Link href={`content/edit/${content.id}`}>
                    <Button
                      size="sm"
                      w={100}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    w={100}
                    color="red"
                    onClick={() => deleteContent(content.id)}
                  >
                    Delete
                  </Button>
                  <Link href={`/content/${content.id}`}>
                    <Button
                      size="sm"
                      w={100}
                      color="gray"
                    >
                      Detail
                    </Button>
                  </Link>
                </Group>
              </Flex>
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
      ))}
    </>
  );
};

export default CardContentProfile;
