const SIZE = {
  B: "bytes",
  KB: "KB",
  MB: "MB",
  GB: "GB"
};

export const calculateSize = size => {
  let adjustedSize = size;
  let count = 0;
  let suffix;

  while (adjustedSize > 1000) {
    adjustedSize = adjustedSize / 1000;
    count = count + 1;
  }
  if (count === 0) {
    suffix = SIZE.B;
  } else if (count === 1) {
    suffix = SIZE.KB;
  } else if (count === 2) {
    suffix = SIZE.MB;
  } else {
    suffix = SIZE.GB;
  }

  const calculatedSize = {
    value: adjustedSize,
    suffix: suffix
  };
  return calculatedSize;
};
