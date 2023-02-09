import { ChakraProvider, Heading } from "@chakra-ui/react";
import React from "react";
import {
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import Post from "./Post/Post";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/post/:id" exact element={<Post />}></Route>
          </Routes>
          <Routes>
            <Route path="/:id" element={<Home />}></Route>
          </Routes>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
