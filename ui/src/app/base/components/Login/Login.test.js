import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";

import { Login } from "./Login";

const mockStore = configureStore();

describe("Login", () => {
  let state;

  beforeEach(() => {
    state = {
      config: {
        items: []
      },
      status: {}
    };
  });

  it("can render api login", () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("FormikForm").exists()).toBe(true);
  });

  it("can render external login", () => {
    state.status.externalAuthURL = "http://login.example.com";
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(".login__external").exists()).toBe(true);
  });

  it("can render external login", () => {
    state.status.externalAuthURL = "http://login.example.com";
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(".login__external").exists()).toBe(true);
  });

  it("can login via the api", () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    act(() =>
      wrapper
        .find("Formik")
        .props()
        .onSubmit({
          username: "koala",
          password: "gumtree"
        })
    );
    expect(
      store.getActions().find(action => action.type === "LOGIN")
    ).toStrictEqual({
      type: "LOGIN",
      payload: {
        username: "koala",
        password: "gumtree"
      }
    });
  });
});
