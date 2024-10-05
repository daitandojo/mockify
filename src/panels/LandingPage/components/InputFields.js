import { useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { inputField } from '../styles';
import { useExamContext } from '../../../app/contexts/ExamContext';

export default function InputFields() {
  const {
    topic,
    setTopic,
    level,
    setLevel
  } = useExamContext();

  // Ensure the default value is set using useEffect to prevent infinite re-renders
  useEffect(() => {
    if (!level) {
      setLevel("Undergraduate");
    }
  }, [level, setLevel]);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={8} md={6}>
        <TextField
          fullWidth
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          variant="outlined"
          sx={inputField}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={6}>
        <FormControl fullWidth sx={inputField}>
          <InputLabel id="level-select-label">Level</InputLabel>
          <Select
            labelId="level-select-label"
            id="level-select"
            value={level}
            label="Level"
            onChange={(e) => setLevel(e.target.value)}
          >
            <MenuItem value="Primary School">Primary School</MenuItem>
            <MenuItem value="Secondary School">Secondary School</MenuItem>
            <MenuItem value="Undergraduate">Undergraduate</MenuItem>
            <MenuItem value="Masters">Masters</MenuItem>
            <MenuItem value="PhD Level">PhD Level</MenuItem>
            <MenuItem value="Postgraduate PhD">Postgraduate PhD</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
