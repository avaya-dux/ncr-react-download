import { downloadAndZip, downloadOne, getFilename } from './download-zip';

describe('downloadOne', () => {
  it('can download one file without exploding', () => {
    const url = new URL('https://picsum.photos/200/300');
    const file = downloadOne(url);
    expect(file).toBeTruthy();
  });
});

describe('downloadAndZip', () => {
  it('can download one file without exploding', () => {
    const urls = [new URL('https://picsum.photos/200/300')];
    const zipFile = downloadAndZip(urls);
    expect(zipFile).toBeTruthy();
  });
  it('can download two files without exploding', () => {
    const urls = [
      new URL('https://picsum.photos/200/300'),
      new URL('https://picsum.photos/200'),
    ];
    const zipFile = downloadAndZip(urls);
    expect(zipFile).toBeTruthy();
  });
});

describe('getFilename', () => {
  it('return default filename', () => {
    const url = new URL('https://picsum.photos/200/300');
    expect(getFilename(url, 1)).toEqual('file-1.jpeg');
  });
  it('return actual filename', () => {
    const url = new URL('https://picsum.photos/200/300/test.wav');
    expect(getFilename(url, 1)).toEqual('test.wav');
  });
});
