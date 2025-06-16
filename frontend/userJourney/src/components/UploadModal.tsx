// components/UploadModal.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ open, onClose, onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      onClose(); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload de Arquivo</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
          <Typography variant="body1" gutterBottom>
            Selecione um arquivo .xlsx para enviar.
          </Typography>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};
