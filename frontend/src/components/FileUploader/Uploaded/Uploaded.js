import CheckIcon from '../CheckIcon/CheckIcon';
import './Uploaded.css';

const Uploaded = ({ imageURL }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(imageURL);
    alert('Copied to clipboard!');
  };

  return (
    <div id='file-uploaded'>
      <CheckIcon />
      <h1>Uploaded Successfully!</h1>
      <img src={imageURL} alt='' crossOrigin='anonymous' />
      <div className='image-url'>
        <div className='image-text-url'>{imageURL}</div>
        <button onClick={handleCopyLink}>Copy Link</button>
      </div>
    </div>
  );
};

export default Uploaded;
