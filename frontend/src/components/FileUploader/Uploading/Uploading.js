import './Uploading.css';

const Uploading = ({ percentCompleted }) => {
  return (
    <div id='file-loading'>
      <h1>Uploading...</h1>
      <div className='progress-bar'>
        <div
          className='progress'
          style={{ width: `${percentCompleted}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Uploading;
