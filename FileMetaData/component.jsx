/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Filename from 'react-fine-uploader/filename';
import Filesize from 'react-fine-uploader/filesize';
import ProgressBar from 'react-fine-uploader/progress-bar';
import Status from 'react-fine-uploader/status';
import CancelButton from 'react-fine-uploader/cancel-button';
import DeleteButton from 'react-fine-uploader/delete-button';

// Styles
import styles from './styles.scss';

function FileMetaData({ submittedFiles, uploader }) {
  return (
    <div className={styles.parent} >
      <ul className={styles.fileList}>
        {submittedFiles.map(id => (
          <li key={id} className={styles.fileListItem}>
            <div className={styles.metaData}>
              <div className={styles.fileName}><Filename id={id} uploader={uploader} /></div>
              <div className={styles.fileSize}><Filesize id={id} uploader={uploader} /></div>
            </div>
            <div className={styles.controls}>
              <div className={styles.progressBar}>
                <ProgressBar
                  id={id}
                  uploader={uploader}
                  hideBeforeStart={false}
                  hideOnComplete={false}
                  className={styles.inner}
                />
              </div>
              <Status id={id} uploader={uploader} className={styles.status} />
              <CancelButton id={id} uploader={uploader} className={styles.controlButton}>
                &#x2715;
              </CancelButton>
              <DeleteButton id={id} uploader={uploader} className={styles.controlButton}>
                &#x2715;
              </DeleteButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

FileMetaData.propTypes = {
  submittedFiles: PropTypes.array.isRequired,
  uploader: PropTypes.instanceOf(FineUploaderTraditional).isRequired,
};

export default FileMetaData;
