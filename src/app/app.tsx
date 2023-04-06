import {
  downloadAndZip,
  downloadAndZipWithCallback,
  downloadOne,
} from 'src/api/download-zip';

import '@avaya/neo-react/avaya-neo-react.css';

import { Button, Notification, PopupId, PopupPosition } from '@avaya/neo-react';
import { useCallback, useEffect, useState } from 'react';
import { removePopupManagerContainer, usePopup } from '@avaya/neo-react';
import styles from './app.module.scss';

const total = 100;
const playbackWav = 'https://freewavesamples.com/files/Bass-Drum-1.wav';

const guitarWav =
  'https://freewavesamples.com/files/Alesis-Fusion-Nylon-String-Guitar-C4.wav';
const baseWav =
  'https://freewavesamples.com/files/Alesis-Fusion-Fretless-Bass-C3.wav';

export function App() {
  const { notify, remove } = usePopup('interactive-toast');
  useEffect(() => {
    return () => {
      removePopupManagerContainer();
    };
  }, []);

  const [errors, setErrors] = useState<string[]>([]);

  const showSingleDownloadError = useCallback(
    (error: Error) => {
      let popupRef: { id: PopupId; position: PopupPosition } | undefined =
        undefined;

      const onClick = () => {
        if (popupRef) {
          const { id, position } = popupRef;
          remove(id, position);
        }
      };
      const message = error.toString() || 'download failed';
      const notification = (
        <Notification
          type="event"
          icon="error"
          header="Event"
          description={message}
          action={{ onClick }}
        />
      );
      console.log({ error: error.toString() });
      popupRef = notify({ node: notification, position: 'bottom' });
    },
    [notify]
  );

  useEffect(() => {
    let popupRef: { id: PopupId; position: PopupPosition } | undefined =
      undefined;

    const onClick = () => {
      if (popupRef) {
        const { id, position } = popupRef;
        remove(id, position);
      }
    };

    if (errors.length === 0) {
      return;
    }

    const messages = ['download failed', ...errors];
    const message = messages.join(', ');

    const notification = (
      <Notification
        type="event"
        icon="error"
        header="Event"
        description={message}
        action={{ onClick }}
      />
    );
    console.log({ message });
    popupRef = notify({ node: notification, position: 'bottom' });

    return () => {
      onClick();
    };
  }, [errors, notify, remove]);

  // make sure you have chrome extension cors enabled for audio download to work locally
  const download1 = () => {
    const url = new URL(playbackWav);
    downloadOne(url).catch((error) => showSingleDownloadError(error));
  };

  const download2 = () => {
    const urls = [new URL(baseWav), new URL(guitarWav)];
    downloadAndZip(urls).catch((error) => showSingleDownloadError(error));
  };
  const [counter, setCounter] = useState(0);

  const onSuccess = useCallback(
    (status: string) => {
      console.log({ status });
      setCounter((counter) => counter + 1);
    },
    [setCounter]
  );
  const downloadMany = () => {
    setErrors([]);
    setCounter(0);
    const urls = [];
    const url = new URL('https://picsum.photos/100/150');
    for (let i = 0; i < total; i++) {
      urls.push(url);
    }
    const onError = (error: string) => {
      setErrors((errors: string[]) => [error, ...errors]);
    };
    downloadAndZipWithCallback(urls, onSuccess, onError);
  };

  return (
    <div>
      <div className={styles.row}>
        <audio controls src={playbackWav}>
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
