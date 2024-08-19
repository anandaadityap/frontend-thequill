"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import AvatarProfile from "@/components/avatar-profile";
import BackButton from "@/components/back-button";
import CardContentProfile from "@/components/card/card-content-profile";
import Navbar from "@/components/navbar";
import { getAllContentByUser, getUserById } from "@/lib/action";
import { useTokenStore } from "@/lib/store";
import { Flex, Group, Pagination, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Profile = () => {
  const [data, setData] = useState<any>(null);
  const { token, refreshToken, name, email } = useTokenStore();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    refreshToken();
    fetchData();
    fetchContent();
  }, [currentPage, searchQuery]);

  const fetchData = async () => {
    const data = await getUserById(token);
    setData(data);
  };
  const fetchContent = useDebouncedCallback(async () => {
    try {
      const data = await getAllContentByUser(
        searchQuery,
        currentPage,
        limit,
        token
      );
      setContentData(data.contents);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, 500);
  const handleSearch = useDebouncedCallback(() => {
    setCurrentPage(1);
    setSearchQuery(searchTerm);
  }, 500);

  return (
    <div>
      <Navbar />
      <div className="px-5 py-3 md:px-10 md:py-5">
        <BackButton href="/" />
        <Flex
          className="mb-10"
          direction="column"
        >
          <Group className="mb-5">
            <AvatarProfile
              avatar=""
              name={name}
              email={email}
            />
            <Link
              href="/profile/edit"
              className="text-blue-500 hover:text-blue-700 font-semibold text-sm"
            >
              Edit
            </Link>
          </Group>

          <div>
            <h1 className="font-bold ">Biodata</h1>
            <p>{data?.biodata}</p>
          </div>
        </Flex>

        <Group className="mb-5">
          <TextInput
            leftSection={<FiSearch />}
            value={searchTerm}
            onChange={(event: any) => setSearchTerm(event.currentTarget.value)}
            onKeyDown={handleSearch}
            placeholder="Search posts"
          />
        </Group>

        <CardContentProfile
          contentData={contentData}
          loading={loading}
          error={error}
        />
        <Group mt="lg">
          <Pagination
            siblings={1}
            boundaries={1}
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
          />
        </Group>
      </div>
    </div>
  );
};

export default Profile;
