import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import {
  Container,
  Stack,
  Flex,
  Text,
  Heading,
  Spinner,
  Grid,
  useToast,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddNewPost from "./components/AddNewPost";

const fetchPosts = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v1/users/340189/posts?page=${id}`
    );
    return data;
  } catch (error) {
    throw Error("Unable to fetch Posts");
  }
};

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const pageId = parseInt(id);
  const toast = useToast();
  const { data, isLoading } = useQuery(
    ["posts", pageId],
    () => fetchPosts(pageId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
    }
  );
  console.log(data);

  return (
    <Container maxW="1300px" mt="4">
      {isLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
          <AddNewPost />
          <Flex justify="space-between" mb="4">
            <Button
              colorScheme="red"
              onClick={() => {
                if (data.meta.pagination.links.previous !== null) {
                  navigate(`/${pageId - 1}`);
                }
              }}
              disabled={!data.meta.pagination.links.previous !== null}>
              Prev
            </Button>

            <Text>Current Page : {pageId}</Text>

            <Button
              colorScheme="green"
              onClick={() => {
                navigate(`/${pageId + 1}`);
              }}>
              Next
            </Button>
          </Flex>
          {data.data.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              <Stack
                p="4"
                boxShadow="md"
                borderRadius="xl"
                border="1px solid #ccc"
                mb="4">
                <Flex justify="space-between">
                  <Text>UserId: {post.user_id}</Text>
                  <Text>PostId: {post.id}</Text>
                </Flex>
                <Heading fontSize="2xl">{post.title}</Heading>
                <Text>{post.body}</Text>
              </Stack>
            </Link>
          ))}
        </>
      )}
    </Container>
  );
};

export default Home;
