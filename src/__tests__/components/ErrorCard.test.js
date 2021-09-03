import React from "react";
import { mount } from "enzyme";

import ErrorCard from "../../components/ErrorCard/ErrorCard";

describe("ErrorCard", () => {
  let wrapper;
  const errorDetails = { error: "DummyErrorText", buttonText: "OK" };

  beforeEach(() => {
    wrapper = mount(
      <ErrorCard
        error={errorDetails.error}
        buttonText={errorDetails.buttonText}
      />
    );
  });

  it("should render error text", () => {
    const errorDiv = wrapper.find("div");
    expect(errorDiv.text()).toEqual(errorDetails.error);
  });

  it("should render Button", () => {
    const button = wrapper.find("Button");
    expect(button.text()).toEqual(errorDetails.buttonText);
  });
});
