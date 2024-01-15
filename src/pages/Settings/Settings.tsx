// import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import { useGlobalState } from '../../context/globalContext'
import './Settings.scss'
import { Box, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'

const OPTIONS = ['CH', 'ES', 'FR', 'GB']

const Settings = () => {
  const { selectedNationalities, setSelectedNationalities } = useGlobalState()

  const handleChange = (event: SelectChangeEvent<typeof selectedNationalities>) => {
    const { target: { value }} = event;
    setSelectedNationalities(typeof value === 'string' ? value.split(',') : value)
  };

  return (
    <div className='settings'>
      <PageHeader title='Settings' />

      <div style={{ padding: 25 }}>
        <div>Select nationalities to load</div>
        <Select
          multiple
          value={selectedNationalities}
          displayEmpty
          onChange={handleChange}
          input={<OutlinedInput style={{ minWidth: 250 }} />}
          renderValue={(selected) => {
            if (selected?.length === 0) return <em>Select nationalities</em>;

            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip 
                    style={{ background: '#818cf8', color: '#fff' }} 
                    key={value} 
                    label={value} 
                  />
                ))}
              </Box>
              )
          }}
        >
          <MenuItem style={{ display: 'none' }} disabled value=''>
          </MenuItem>

          {OPTIONS?.map((nationality) => (
            <MenuItem
              key={nationality}
              value={nationality}
            >
              {nationality}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default Settings