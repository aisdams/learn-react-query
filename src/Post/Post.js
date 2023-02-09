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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const fetchPost = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v1/posts/${id}`
    );
    return data;
  } catch (error) {
    throw Error("Unable to fetch Post");
  }
};

const Post = () => {
  const {id} = useParams();
  // const pageId = parseInt(id);
  const toast = useToast();
  const { data, isLoading } = useQuery(["post", id], () => fetchPost(id), {
    onError: (error) => {
      toast({ status: "error", title: error.message });
    },
  });
  console.log(data);

  return (
    <Container maxW="1300px" mt="4">
      {isLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
          <Stack
            p="4"
            boxShadow="md"
            borderRadius="xl"
            border="1px solid #ccc"
            mb="4"
            key={data.data.id}>
            <Flex justify="space-between">
              <Text>UserId: {data.data.user_id}</Text>
              <Text>PostId: {data.data.id}</Text>
            </Flex>
            <Heading fontSize="2xl">{data.data.title}</Heading>
            <Text>{data.data.body}</Text>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Post;
