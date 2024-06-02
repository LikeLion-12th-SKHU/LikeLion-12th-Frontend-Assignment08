import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./utils/reset";
import TodoDetails from "./components/todoDetail";
import CreateTodo from "./components/createTodo";
import MainTodo from "./pages/mainTodo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route
          path='/'
          element={<MainTodo />}
        />{" "}
        <Route
          path='/note/create'
          element={<CreateTodo />}
        />{" "}
        <Route
          path='/note/:id'
          element={<TodoDetails />}
        />{" "}
      </Routes>{" "}
    </BrowserRouter>{" "}
  </React.StrictMode>
);
