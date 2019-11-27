import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Dropzone } from "../";
import { calculateSize } from "../../../utils";

describe("Dropzone", () => {
  let smallImage;
  let largeImage;

  beforeEach(() => {
    smallImage = createFile("gremlin.png", 100, "image/png");
    largeImage = createFile("gremlin.png", 10000, "image/png");
  });

  afterEach(cleanup);

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
      value: [smallImage]
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
      value: [smallImage]
    });

    fireEvent.drop(dropzoneInput);

    const acceptedFile = await waitForElement(() => getByText("gremlin.png"));
    expect(acceptedFile).toBeInTheDocument();

    expect(getByText(`100.0 bytes`)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("calculates correct suffix for file size", async () => {
    const { container, getByText } = render(<Dropzone showSize />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;

    Object.defineProperty(dropzoneInput, "files", {
      value: [largeImage]
    });

    fireEvent.drop(dropzoneInput);

    const acceptedFile = await waitForElement(() => getByText("gremlin.png"));
    expect(acceptedFile).toBeInTheDocument();

    const fileSize = calculateSize(largeImage.size);
    expect(
      getByText(`${fileSize.value}.0 ${fileSize.suffix}`)
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("renders file preview", async () => {
    const { container, getByText } = render(<Dropzone showPreview />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;
    Object.defineProperty(dropzoneInput, "files", {
      value: [smallImage]
    });

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText("gremlin.png"));

    expect(acceptedFile).toBeInTheDocument();
    expect(container.querySelector("img")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders remove button", async () => {
    const { container, getByLabelText, getByText } = render(<Dropzone />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;

    Object.defineProperty(dropzoneInput, "files", {
      value: [smallImage]
    });

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText("gremlin.png"));

    expect(acceptedFile).toBeInTheDocument();
    expect(getByLabelText("FormClose")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

// This function borrowed from react-dropzone tests
function createFile(name, size, type) {
  const file = new File([], name, { type });
  Object.defineProperty(file, "size", {
    get() {
      return size;
    }
  });
  return file;
}
