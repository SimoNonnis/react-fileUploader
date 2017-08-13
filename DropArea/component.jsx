import React from 'react';
import PropTypes from 'prop-types';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Dropzone from 'react-fine-uploader/dropzone';
import FileInput from 'react-fine-uploader/file-input';

// Svg
import UploadIcon from './UploadIcon/component';

// Styles
import styles from './styles.scss';

function DropArea({ acceptText, uploader, onDropError, errorMessage }) {
  const { acceptFiles, multiple } = uploader.options;

  return (
    <div>
      <Dropzone
        dropActiveClassName={styles.dropActive}
        uploader={uploader}
        accept={acceptFiles}
        multiple={multiple}
        onDropError={onDropError}
      >
        <FileInput
          className={styles.parent}
          uploader={uploader}
          accept={acceptFiles}
          multiple={multiple}
        >
          <div className={styles.child}>
            <span className={styles.iconContainer}>
              <UploadIcon />
            </span>
            <p className={styles.paragraph} >Drag and drop files to upload</p>
            <button className={styles.button} >Select from your computer</button>
          </div>
        </FileInput>
      </Dropzone>
      {!!errorMessage && <p><strong>{errorMessage}</strong></p>}
      <p>{acceptText}</p>
    </div>
  );
}

DropArea.propTypes = {
  acceptText: PropTypes.string.isRequired,
  uploader: PropTypes.instanceOf(FineUploaderTraditional).isRequired,
  onDropError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default DropArea;
