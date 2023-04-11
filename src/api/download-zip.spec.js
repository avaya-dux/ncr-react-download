import { beforeEach, describe, expect, vitest, vi } from 'vitest';

import {
  downloadAndZip,
  downloadOne,
  getFilename,
  downloadAndZipWithCallback,
  downaloadZipLogger,
} from './download-zip';

import axios from 'axios';

downaloadZipLogger.disableAll();

vi.mock('axios');

const mockSuccess = () => {
  const str = 'hello world';
  const mockData = new Blob([str], { type: 'plain/text' });
  vi.mocked(axios.get).mockResolvedValue({
    data: mockData,
  });

  global.URL.createObjectURL = vi.fn(() => 'details');
};

describe('test success cases:', () => {
  beforeEach(() => {
    mockSuccess();
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });

  it('can download one file without exploding', () => {
    const url = new URL('https://picsum.photos/200/300');
    const file = downloadOne(url);
    expect(file).toBeTruthy();
  });

  it('can download and zip one file without exploding', () => {
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

  it('onSuccess is called when response is 200', async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const urls = [new URL('https://picsum.photos/200/300')];
    await downloadAndZipWithCallback(urls, onSuccess, onError);
    expect(onSuccess).toBeCalledTimes(1);
    expect(onError).toBeCalledTimes(0);
  });
});

describe('test failure cases', () => {
  it('onError is called when response is network error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('failed'));

    const onSuccess = vi.fn();
    const onError = vi.fn();
    const urls = [new URL('https://picsum.photos/200/300')];
    await expect(() =>
      downloadAndZipWithCallback(urls, onSuccess, onError)
    ).rejects.toThrowError();
    expect(onSuccess).toBeCalledTimes(0);
    expect(onError).toBeCalledTimes(1);
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
