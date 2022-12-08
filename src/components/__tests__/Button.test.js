import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Button />);
});

it("renders its `children` prop as text", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toBeInTheDocument();
});

