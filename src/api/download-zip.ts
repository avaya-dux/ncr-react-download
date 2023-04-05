import * as BlueBirdPromise from 'bluebird';
import JsZip from 'jszip';
import FileSaver from 'file-saver';

const download = (url: URL) => {
  return fetch(url).then((resp) => resp.blob());
};

const downloadByGroup = (
  urls: URL[],
  files_per_group = 5,
  cb?: (status: string) => void
) => {
  return BlueBirdPromise.map(
    urls,
    async (url, index, arrayLength) => {
      if (cb) {
        cb(`downloading ${url}, ${index} in ${arrayLength}`);
      }
      return await download(url);
    },
    { concurrency: files_per_group }
  );
};

export const getFilename = (url: URL, i: number) => {
  const last = url.pathname.split('/').pop();
  if (last && last.indexOf('.') > -1) {
    return last;
  } else {
    return `file-${i}.jpeg`;
  }
};
const exportZip = (blobs: Blob[], urls: URL[]) => {
  const zip = JsZip();
  blobs.forEach((blob, i) => {
    const url = urls[i];
    const filename = getFilename(url, i);
    zip.file(filename, blob);
  });
  zip.generateAsync({ type: 'blob' }).then((zipFile) => {
    const currentDate = new Date().getTime();
    const fileName = `combined-${currentDate}.zip`;
    return FileSaver.saveAs(zipFile, fileName);
  });
};

export const downloadOne = (url: URL) => {
  return download(url).then((blob) =>
    FileSaver.saveAs(blob, getFilename(url, 0))
  );
};

export const downloadAndZip = (urls: URL[]) => {
  return downloadByGroup(urls, 5).then((value) => exportZip(value, urls));
};

export const downloadAndZipWithCallback = (
  urls: URL[],
  cb: (status: string) => void
) => {
  return downloadByGroup(urls, 5, cb).then((value) => exportZip(value, urls));
};
