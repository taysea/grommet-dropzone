import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Dropzone } from "../";

describe("Dropzone", () => {
  afterEach(cleanup);

  const file1 = new File([""], "gremlin.png", {
    type: "image/png"
  });

  test("renders basic dropzone", () => {
    const { container } = render(<Dropzone />);
    expect(container).toMatchSnapshot();
  });

  test("renders correct starting text for single file", () => {
    const { container, getByText } = render(<Dropzone />);
    const dropText = getByText("a file", { exact: false });
    expect(dropText).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders correct starting text for multiple files", () => {
    const { container, getByText } = render(<Dropzone multiple />);
    const dropText = getByText("files", { exact: false });
    expect(dropText).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("accept single file by default", async () => {
    const { container, getByText } = render(<Dropzone />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;
    Object.defineProperty(dropzoneInput, "files", {
      value: [file1]
    });

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText("gremlin.png"));

    expect(acceptedFile).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders file size", async () => {
    const { container, getByText } = render(<Dropzone showSize />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;
    Object.defineProperty(dropzoneInput, "files", {
      value: [file1]
    });

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText("gremlin.png"));

    expect(acceptedFile).toBeInTheDocument();
    // Mocked file has no size
    expect(getByText("0.0 bytes")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders file preview", async () => {
    const { container, getByText } = render(<Dropzone showPreview />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;
    Object.defineProperty(dropzoneInput, "files", {
      value: [file1]
    });

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText("gremlin.png"));

    expect(acceptedFile).toBeInTheDocument();
    expect(container.querySelector("img")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
