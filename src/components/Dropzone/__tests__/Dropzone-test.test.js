import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Dropzone } from "../";
import { calculateFileSize, truncateText } from "../../../utils";

describe("Dropzone", () => {
  let smallImage;
  let largeImage;
  window.URL.createObjectURL = jest.fn();

  beforeEach(() => {
    smallImage = createFile("gremlin.png", 100, "image/png");
    largeImage = createFile("gremlin.png", 10000, "image/png");
  });

  afterEach(() => {
    cleanup();
    window.URL.createObjectURL.mockReset();
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

    setUpFileDrop(dropzoneInput, smallImage);

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText(smallImage.name));

    expect(acceptedFile).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders file size and calculates correct suffix", async () => {
    const { container, getByText } = render(<Dropzone showFileSize />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;

    setUpFileDrop(dropzoneInput, largeImage);

    fireEvent.drop(dropzoneInput);

    const acceptedFile = await waitForElement(() => getByText(smallImage.name));
    expect(acceptedFile).toBeInTheDocument();

    const fileSize = calculateFileSize(largeImage.size);
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
    setUpFileDrop(dropzoneInput, smallImage);

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText(smallImage.name));

    expect(acceptedFile).toBeInTheDocument();
    expect(container.querySelector("img")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders remove button", async () => {
    const { container, getByLabelText, getByText } = render(<Dropzone />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;

    setUpFileDrop(dropzoneInput, smallImage);

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText(smallImage.name));

    expect(acceptedFile).toBeInTheDocument();
    expect(getByLabelText("FormClose")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("truncates text for long file name", async () => {
    const { container, getByText } = render(<Dropzone />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;

    const longTitleFile = createFile(
      "very-long-image-title-that-should-be-truncated.png",
      100,
      "image/png"
    );

    const truncatedTitle = truncateText(longTitleFile.name);
    setUpFileDrop(dropzoneInput, longTitleFile);

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText(truncatedTitle));

    expect(acceptedFile).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("removes file when remove button is clicked", async () => {
    const { container, getByLabelText, getByText } = render(<Dropzone />);

    const dropzoneInput = getByText("Drag and drop", {
      exact: false
    }).previousSibling;

    setUpFileDrop(dropzoneInput, smallImage);

    fireEvent.drop(dropzoneInput);
    const acceptedFile = await waitForElement(() => getByText(smallImage.name));
    expect(acceptedFile).toBeInTheDocument();

    fireEvent.click(getByLabelText(`remove ${smallImage.name}`));
    expect(getByText("a file", { exact: false })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

function setUpFileDrop(dropzoneInput, file) {
  Object.defineProperty(dropzoneInput, "files", {
    value: [file]
  });
}

// This function is borrowed from react-dropzone tests
function createFile(name, size, type) {
  const file = new File([], name, { type });
  Object.defineProperty(file, "size", {
    get() {
      return size;
    }
  });
  return file;
}
