import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Windows from "./Windows";

const mockStore = configureStore();

describe("Windows", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      config: {
        loading: false,
        loaded: true,
        items: []
      },
      general: {}
    };
  });

  it("displays a spinner if config is loading", () => {
    const state = { ...initialState };
    state.config.loading = true;
    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <Windows />
      </Provider>
    );

    expect(wrapper.find("Loader").exists()).toBe(true);
  });

  it("displays the Windows form if config is loaded", () => {
    const state = { ...initialState };
    state.config.loaded = true;
    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <Windows />
      </Provider>
    );

    expect(wrapper.find("WindowsForm").exists()).toBe(true);
  });

  it("dispatches action to fetch config if not already loaded", () => {
    const state = { ...initialState };
    state.config.loaded = false;
    const store = mockStore(state);

    mount(
      <Provider store={store}>
        <Windows />
      </Provider>
    );

    const fetchActions = store
      .getActions()
      .filter(action => action.type.startsWith("FETCH"));

    expect(fetchActions).toEqual([
      {
        type: "FETCH_CONFIG",
        meta: {
          model: "config",
          method: "list"
        }
      }
    ]);
  });
});
