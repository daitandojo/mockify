'use client';

import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { containerStyle, inputField } from './styles';
import { useAppContext } from '../../../../app/contexts/AppContext';

export default function InputFields() {
  const { appState, setUserTopic, setUserLevel } = useAppContext();

  // Destructure userTopic and userLevel from appState
  const { userTopic, userLevel } = appState;

  return (
    <Box sx={containerStyle}>
      <Grid 
        container 
        spacing={3} 
        justifyContent="center" 
        alignItems="center" 
        sx={{ width: '95%' }
      }>
        {/* Topic Input Field */}
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Topic"
            value={userTopic}
            onChange={(e) => setUserTopic(e.target.value)}
            variant="outlined"
            sx={inputField}
          />
        </Grid>

        {/* Level Select Field */}
        <Grid item xs={4}>
          <FormControl fullWidth sx={inputField}>
            <InputLabel id="level-select-label">Level</InputLabel>
            <Select
              labelId="level-select-label"
              id="level-select"
              value={userLevel}
              label="Level"
              onChange={(e) => setUserLevel(e.target.value)}
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
    </Box>
  );
}
