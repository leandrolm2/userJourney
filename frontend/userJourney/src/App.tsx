import { useEffect, useState } from 'react';
import axios from 'axios';
import { JourneySummaryTable } from './components/TableModal';
import type { DataRow } from './interface/dataRow';
import './App.css';

function App() {
  const [data, setData] = useState<DataRow[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<{ data: Record<string, DataRow[]> }>('/api/journeys');
      const flatData = Object.entries(response.data.data).flatMap(([sessionId, events]) =>
        events.map(event => ({ ...event, sessionId }))
      );
      setData(flatData);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="app-container">
      <h1 className="app-title">User Journey</h1>
      <JourneySummaryTable data={data} onUploadComplete={fetchData} />
    </main>
  );
}


export default App;
