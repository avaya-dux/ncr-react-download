// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  downloadAndZip,
  downloadAndZipWithCallback,
  downloadOne,
} from 'src/api/download-zip';

import '@avaya/neo-react/avaya-neo-react.css';

import { Button } from '@avaya/neo-react';
import { useCallback, useState } from 'react';

import styles from './app.module.scss';

const total = 10;

export function App() {
  // make sure you have chrome extension cors enabled for audio download to work locally
  const download1 = () => {
    const url = new URL(
      'https://file-examples.com/storage/feb401d325641db2fa1dfe7/2017/11/file_example_WAV_1MG.wav'
    );
    downloadOne(url);
  };

  const download2 = () => {
    const urls = [
      new URL(
        'https://freewavesamples.com/files/Alesis-Fusion-Fretless-Bass-C3.wav'
      ),
      new URL(
        'https://file-examples.com/storage/feb401d325641db2fa1dfe7/2017/11/file_example_WAV_1MG.wav'
      ),
    ];
    downloadAndZip(urls);
  };
  const [counter, setCounter] = useState(0);

  const cb = useCallback(
    (status: string) => {
      console.log({ status });
      setCounter((counter) => counter + 1);
    },
    [setCounter]
  );
  const downloadMany = () => {
    setCounter(0);
    const urls = [];
    const url = new URL('https://picsum.photos/100/150');
    for (let i = 0; i < total; i++) {
      urls.push(url);
    }
    downloadAndZipWithCallback(urls, cb);
  };

  return (
    <div>
      <div className={styles.row}>
        <audio
          controls
          src="https://file-examples.com/storage/feb401d325641db2fa1dfe7/2017/11/file_example_WAV_1MG.wav"
        >
          Play a wav
        </audio>
      </div>

      <div className={styles.row}>
        <p className={styles.cors_on}>
          Toggle on Chrome CORS extension before running this
        </p>
        <Button name="download1" onClick={download1}>
          Download 1 wav
        </Button>
      </div>

      <div className={styles.row}>
        <p className={styles.cors_on}>
          Toggle on Chrome CORS extension before running this
        </p>
        <Button name="download2" onClick={download2}>
          Download 2 wavs into a Zip file
        </Button>
      </div>

      <div className={styles.row}>
        <p className={styles.cors_off}>
          Toggle off Chrome CORS extension before running this
        </p>
        <Button name="downloadMany" onClick={downloadMany}>
          Download many images into a Zip file
        </Button>

        <p>
          {counter} of {total} downloaded
        </p>
      </div>
    </div>
  );
}

export default App;
