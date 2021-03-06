import machine from "./machine";

describe("machine selectors", () => {
  it("can get all items", () => {
    const state = {
      machine: {
        items: [{ name: "maas.test" }]
      }
    };
    expect(machine.all(state)).toEqual([{ name: "maas.test" }]);
  });

  it("can get the loading state", () => {
    const state = {
      machine: {
        loading: true,
        items: []
      }
    };
    expect(machine.loading(state)).toEqual(true);
  });

  it("can get the loaded state", () => {
    const state = {
      machine: {
        loaded: true,
        items: []
      }
    };
    expect(machine.loaded(state)).toEqual(true);
  });

  it("can get a machine by id", () => {
    const state = {
      machine: {
        items: [
          { name: "maas.test", system_id: 808 },
          { name: "10.0.0.99", system_id: 909 }
        ]
      }
    };
    expect(machine.getBySystemId(state, 909)).toStrictEqual({
      name: "10.0.0.99",
      system_id: 909
    });
  });
});
