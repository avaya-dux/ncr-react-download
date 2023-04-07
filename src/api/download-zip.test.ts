import { axios } from 'src/cached-axios';
import { downloadAndZip, downloadOne, getFilename } from './download-zip';
import MockAdapter from 'axios-mock-adapter';

describe('download', () => {
  beforeEach(() => {
    const mock = new MockAdapter(axios);
    const str = 'hello world';
    const mockData = new Blob([str], { type: 'plain/text' });
    mock.onGet().reply(200, mockData);
    global.URL.createObjectURL = vitest.fn(() => 'details');
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });

  it('can download one file without exploding', () => {
    const url = new URL('https://picsum.photos/200/300');
    const file = downloadOne(url);
    expect(file).toBeTruthy();
  });

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
