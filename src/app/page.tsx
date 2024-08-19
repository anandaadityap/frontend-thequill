"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import CardMisc from "@/components/card/card-misc";
import {
  Button,
  Flex,
  Grid,
  Group,
  Pagination,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import CardContent from "@/components/card/card-content";
import Category from "@/components/category";
import Navbar from "@/components/navbar";
import { useTokenStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { getAllContent } from "@/lib/action";
import { useDebouncedCallback } from "@mantine/hooks";
import { FiSearch } from "react-icons/fi";

export default function Home() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshToken } = useTokenStore();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getAllContent(searchQuery, currentPage, limit);
        setContentData(data.contents);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    refreshToken();
    fetchContent();
  }, [currentPage, searchQuery]);

  const handleSearch = useDebouncedCallback(() => {
    setCurrentPage(1);
    setSearchQuery(searchTerm);
  }, 1000);

  return (
    <div className="pb-60">
      <Navbar />
      <div className="px-5 py-3 md:px-10 md:py-5 ">
        <Grid grow>
          <Grid.Col span={9}>
            <Group className="mb-5">
              <TextInput
                leftSection={<FiSearch />}
                value={searchTerm}
                onChange={(event: any) =>
                  setSearchTerm(event.currentTarget.value)
                }
                onKeyDown={handleSearch}
                placeholder="Search posts"
              />
            </Group>
            <Category />

            <CardContent
              contentData={contentData}
              error={error}
              loading={loading}
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
          </Grid.Col>
          <Grid.Col
            span={3}
            className="hidden lg:block"
          >
            <Flex direction="column">
              <h1 className="text-lg font-semibold mb-5">Miscellaneous</h1>
              <CardMisc />
              <CardMisc />
              <CardMisc />
              <Link
                href="/"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                See another...
              </Link>
            </Flex>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
