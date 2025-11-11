import { ApolloProvider } from "@apollo/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router";

import client from "./apollo";
import Header from "./components/header";
import Category from "./routes/category";
import Home from "./routes/home";
import NotFound from "./routes/notFound";
import Post from "./routes/post";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Header
            navigation={[
              { label: "Home", path: "/" },
              { label: "Categories", path: "/categories" },
            ]}
          />
          <Routes>
            <Route index element={<Home />} />
            <Route path="categories" element={<Category />} />

            <Route path="post">
              <Route index element={<Post />} />
              <Route path=":id" element={<Post />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </ApolloProvider>
  );
};

export default App;
