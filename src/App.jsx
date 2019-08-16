import React from 'react';
import './index.css';
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Plasm as a Service
        </p>
        <Button href="/started" variant="primary" size="lg" className="App-link" block>
          Get Started!
        </Button>
      </header>
    </div>
  );
}

export default App;
