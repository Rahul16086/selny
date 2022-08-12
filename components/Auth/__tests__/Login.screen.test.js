import { render, fireEvent } from "@testing-library/react-native";
import Login from "../Login";
import React from "react";
import { Provider } from "react-redux";
import store from "../../../store/redux/store";
import { Alert } from "react-native";

describe("Login screen", () => {
  it("should have login button", () => {
    const page = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    page.getByTestId("loginButton");
  });

  it("Check for text - Login", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(getAllByText("Login").length).toBe(1);
  });

  it("Shows error on invalid email", () => {
    jest.spyOn(Alert, "alert");

    const { getByTestId } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.press(getByTestId("loginButton"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error logging in",
      "Email is invalid"
    );
  });
});
