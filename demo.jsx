import React, { Component } from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers';

import { DropArea, FileMetaData } from './index';

const fileExtMap = [
  {
    ext: 'png',
    active: true,
    mime_type: 'image/png',
  },
  {
    ext: 'jpeg',
    active: true,
    mime_type: 'image/jpeg',
  },
  {
    ext: 'jpg',
    active: true,
    mime_type: 'image/jpeg',
  },
  {
    ext: 'pdf',
    active: false,
    mime_type: 'application/pdf',
  },
];

function getFiles(files) {
  return function getKey(key) {
    return files.map(f => f[key]);
  };
}

const allowedFiles = fileExtMap.filter(file => file.active === true);
const getFilesBy = getFiles(allowedFiles);
const allowedExtensions = getFilesBy('ext');
const allowedExtString = getFilesBy('ext').join(', ');
const allowedMimeTypesRaw = getFilesBy('mime_type');
const allowedMimeTypes = [...new Set(allowedMimeTypesRaw)].join(', ');

const uploader = new FineUploaderTraditional({
  options: {
    debug: false,
    autoUpload: true,
    multiple: true,
    acceptFiles: allowedMimeTypes,
    request: {
      inputName: 'file',
      params: {
        api_key: '577263568137534',
        upload_preset: 'nebv6f9x',
        timestamp: Date.now() / 1000,
      },
      endpoint: 'https://api.cloudinary.com/v1_1/simonnonnis/image/upload',
    },
  },
});

class FileUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submittedFiles: [],
      errorMessage: '',
    };

    this.onDropError = this.onDropError.bind(this);
    this.removeFiles = this.removeFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  componentDidMount() {
    uploader.on('submit', this.uploadFiles);
    uploader.on('statusChange', this.removeFiles);
  }

  componentWillUnmount() {
    uploader.off('submit', this.uploadFiles);
    uploader.off('statusChange', this.removeFiles);
  }

  onDropError() {
    let { errorMessage } = this.state;
    errorMessage = 'You are allow to upload just one file.';
    this.setState({ errorMessage });
  }

  removeFiles(id, oldStatus, newStatus) {
    const { submittedFiles } = this.state;
    const fileToRemove = submittedFiles.indexOf(id);

    switch (newStatus) {
      case 'canceled':
      case 'deleted':
        submittedFiles.splice(fileToRemove, 1);
        this.setState({ submittedFiles });
        return true;
      default:
        return true;
    }
  }

  uploadFiles(id, name) {
    const { submittedFiles } = this.state;
    const format = uploader.qq.getExtension(name);
    const match = allowedExtensions.includes(format);

    if (match) {
      submittedFiles.push(id);
      this.setState({
        submittedFiles,
        errorMessage: '',
      });
      return true;
    }

    return false;
  }

  render() {
    const { submittedFiles, errorMessage } = this.state;
    const acceptText = `We accept the following file types: ${allowedExtString}.`;

    return (
      <div>
        <DropArea
          acceptText={acceptText}
          uploader={uploader}
          onDropError={this.onDropError}
          errorMessage={errorMessage}
        />
        { submittedFiles.length > 0 ?
          <FileMetaData
            submittedFiles={submittedFiles}
            uploader={uploader}
          /> : null
        }
      </div>
    );
  }
}

export default FileUploader;
