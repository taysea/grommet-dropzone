import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Dropzone } from "../";

describe("Dropzone", () => {
  afterEach(cleanup);

  test("renders basic dropzone", () => {
    const { container, debug } = render(<Dropzone />);
    debug();
    expect(container).toMatchSnapshot();
  });
});
