/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Group,
  Text,
  Avatar,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { GiScrollQuill } from "react-icons/gi";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import Icon from "./icon";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useTokenStore } from "@/lib/store";
import { useEffect } from "react";

const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  const { token, name, email, avatar, removeToken, refreshToken } =
    useTokenStore();

  useEffect(() => {
    refreshToken();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`,
        {
          withCredentials: true,
        }
      );
    } catch (error: any) {
      return { message: error.response.data };
    }
    removeToken();
    router.push("/");
  };

  return (
    <nav className="px-5 py-3 md:px-10 md:py-5 flex items-center justify-between ">
      <Group>
        <div className="hidden md:flex">
          <Icon />
        </div>
      </Group>

      {!token ? (
        <Group>
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Register
          </Link>
        </Group>
      ) : (
        <Group>
          <div className="hidden md:block text-right">
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

          <Menu>
            <Menu.Target>
              <Avatar
                src={avatar}
                radius="xl"
                className="cursor-pointer"
              />
            </Menu.Target>

            <Menu.Dropdown
              w={200}
              className="shadow-xl"
            >
              <Menu.Label>Application</Menu.Label>
              <Link href="/profile">
                <Menu.Item leftSection={<FaUser />}>Profile</Menu.Item>
              </Link>
              <Link href="/content/create">
                <Menu.Item leftSection={<GiScrollQuill />}>
                  New Content
                </Menu.Item>
              </Link>
              {colorScheme === "dark" ? (
                <Menu.Item
                  leftSection={<MdLightMode />}
                  onClick={toggleColorScheme}
                >
                  Light
                </Menu.Item>
              ) : (
                <Menu.Item
                  leftSection={<MdNightlight />}
                  onClick={toggleColorScheme}
                >
                  Dark
                </Menu.Item>
              )}
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={<RiLogoutBoxFill />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      )}
    </nav>
  );
};

export default Navbar;
