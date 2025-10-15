// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './App.css';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [conditions, setConditions] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    setConditions('');
    setPrecautions('');
    setDisclaimer('');
    setShowHistory(false);

    try {
      const response = await axios.post('http://localhost:5050/api/check-symptoms', { symptoms });
      const text = response.data.result;

      const disclaimerMatch = text.match(/^.*?This is for informational purposes only.*?\n+/);
      const conditionsMatch = text.match(/Possible Conditions[\s\S]*?(?=Precautions)/i);
      const precautionsMatch = text.match(/Precautions[\s\S]*$/i);

      setDisclaimer(disclaimerMatch ? disclaimerMatch[0].trim() : '');
      setConditions(conditionsMatch ? conditionsMatch[0].trim() : '');
      setPrecautions(precautionsMatch ? precautionsMatch[0].trim() : '');
    } catch {
      setDisclaimer('⚠️ Error: Unable to fetch response. Please try again later.');
    }

    setIsLoading(false);
  };

  const renderMarkdown = (text) => {
    const rawHtml = marked(text || '');
    return { __html: DOMPurify.sanitize(rawHtml) };
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/history');
      setHistory(response.data);
      setShowHistory(true);

      // Clear previous output
      setDisclaimer('');
      setConditions('');
      setPrecautions('');
      setSymptoms('');
    } catch (error) {
      console.error('Failed to fetch history');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🩺 Symptom Checker</h1>
        <p className="subtitle">Enter your symptoms below to get possible conditions and precautions.</p>
        <form onSubmit={handleSubmit} className="form-container">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., fever, cold, sore throat"
            rows="5"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Check Symptoms'}
          </button>
        </form>

        <button className="history-toggle" onClick={fetchHistory}>
          View Recent Queries
        </button>

        {disclaimer && <div className="disclaimer-box fade-in"><pre>{disclaimer}</pre></div>}
        {conditions && <div className="result-box fade-in"><h2>🧠 Possible Conditions</h2><div dangerouslySetInnerHTML={renderMarkdown(conditions)} /></div>}
        {precautions && <div className="result-box fade-in"><h2>🛡️ Steps to Be Taken</h2><div dangerouslySetInnerHTML={renderMarkdown(precautions)} /></div>}
        {showHistory && (
          <div className="result-box fade-in">
            <h2>📜 Recent Queries</h2>
            <ul>
              {history.map((entry, i) => (
                <li key={i}>
                  <strong>Symptoms:</strong> {entry.symptoms}<br />
                  <strong>Checked:</strong> {new Date(entry.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
