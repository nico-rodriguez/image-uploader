import { config } from '../config';
import logo from './logo.svg';
import './Uploader.css';

const Uploader = ({ handleInputFile }) => {
  const allowedFileExtensions = config.allowedMimeTypes
    .map((mime) => mime.split('/')[1])
    .join(', ');

  return (
    <div id='file-uploader'>
      <h1>Upload your image</h1>
      <p>File should be {allowedFileExtensions}</p>
      <div className='dropzone'>
        <img src={logo} alt='' />
        <p>Drag & Drop your image here</p>
      </div>
      <span>Or</span>
      <label htmlFor='file-click-input'>Choose a file</label>
      <input
        id='file-click-input'
        type='file'
        accept={config.allowedMimeTypes.join(',')}
        onInput={handleInputFile}
      />
    </div>
  );
};

export default Uploader;
