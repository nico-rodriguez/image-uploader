import { FileUploader } from './components/FileUploader/FileUploader';
import { Footer } from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <FileUploader />
      </div>
      <Footer />
    </div>
  );
}

export default App;
