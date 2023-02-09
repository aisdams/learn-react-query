import { Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import React from "react";
import { useMutation } from "react-query";

const addNewPost = async ({ title, body }) => {
  try {
    const { data } = await axios.post(`users/340189/posts`, {
      title,
      body,
    });
  } catch (error) {
    throw Error(error.response.statusText);
  }
};

const AddNewPost = () => {
  const { isLoading, data, mutateAsync } = useMutation("addNewPost", addNewPost);

  return (
    <div>
      <Formik initialValues={{ title: "", body: "" }} onSubmit={() => {}}>
        <Form>
          <Stack my="4">
            <Heading fontSize="2xl" textAlign="center">
              Add New Post
            </Heading>
            <InputControl name="title" label="Title" />
            <TextareaControl name="body" label="Content" />
            <SubmitButton>Add Post</SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNewPost;
