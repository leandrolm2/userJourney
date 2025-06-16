import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useState, useMemo } from 'react';
import type { DataRow } from '../interface/dataRow';
import './TableModal.css';
import { UploadModal } from './UploadModal';
import axios from 'axios';

interface JourneySummaryTableProps {
  data: DataRow[];
  onUploadComplete: () => void;
}

const PAGE_SIZE = 5;

export const JourneySummaryTable: React.FC<JourneySummaryTableProps> = ({ data, onUploadComplete })  => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadOpen, setUploadOpen] = useState(false);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.put('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });
      alert('Upload successful!');
      onUploadComplete();
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }
  };

  const sessions = useMemo(() => {
    const grouped: Record<string, DataRow[]> = {};
    for (const item of data) {
      if (!grouped[item.sessionId]) grouped[item.sessionId] = [];
      grouped[item.sessionId].push(item);
    }

    return Object.entries(grouped).map(([sessionId, events]) => ({
      sessionId,
      journeyPath: events.map(e => e.utm_source_normalized).filter(Boolean),
      touchpoints: events.length,
    }));
  }, [data]);

  const totalPages = Math.ceil(sessions.length / PAGE_SIZE);
  const paginated = sessions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="journey-summary-container">
      <div className="table-header">
        <h2>Jornadas por Sessão</h2>
        <button onClick={() => setUploadOpen(true)} className="button green">
          Upload XLSX
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table className="journey-table">
          <TableHead>
            <TableRow>
              <TableCell>Sessão</TableCell>
              <TableCell>Jornada</TableCell>
              <TableCell>Touchpoints</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map(({ sessionId, journeyPath, touchpoints }) => (
              <TableRow key={sessionId}>
                <TableCell>{sessionId}</TableCell>
                <TableCell>
                  <div className="journey-labels">
                    {journeyPath.map((label, index) => (
                      <div className="journey-label-wrapper" key={index}>
                        <span className={`journey-label ${label.toLowerCase()}`}>{label}</span>
                        {index < journeyPath.length - 1 && (
                          <span className="journey-separator">{'>'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{touchpoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UploadModal
        open={isUploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
          Próxima
        </button>
      </div>
    </div>
  );
};
