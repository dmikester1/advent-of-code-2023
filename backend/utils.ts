import fs from 'node:fs/promises';

export const containsNumbers = (str: string) => {
    return /\d/.test(str);
  };

export const isNumber = (value: any) => {
  return typeof value === 'number' && !Number.isNaN(value);
};

export const lineCount = (text: string) => {
  var nLines = 0;
  for (var i = 0, n = text.length; i < n; ++i) {
    if (text[i] === '\n') {
      ++nLines;
    }
  }
  return nLines;
};

export const lineCountFromFile = async (path: string) => {
  try {
    const data = await fs.readFile(path, {
      encoding: 'utf8',
    });
    const lines = lineCount(data);
    console.log({ lines });
    return { lines, chars: data.length };
  } catch (err) {
    console.log({ err });
    return { err };
  }
};
