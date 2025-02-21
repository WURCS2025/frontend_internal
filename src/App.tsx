// 

import React from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import './App.css';


const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="grid-container">
        <section className="usa-section">
          <UploadForm />
        </section>
      </main>
    </div>
  );
};

export default App;
