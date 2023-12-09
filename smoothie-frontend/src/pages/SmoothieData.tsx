
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { AllIngredients } from '../components/AllIngredients';
import { AllIngredientTypes } from '../components/AllIngredientTypes';
import { AllSmoothies } from '../components/AllSmoothies';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export const SmoothieData = (props:any) => {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return(
        <>
<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ingredients" {...a11yProps(0)} />
          <Tab label="Ingredient Types" {...a11yProps(1)} />
          <Tab label="Smoothies" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* Content for Ingredients tab */}
        <AllIngredients></AllIngredients>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Content for Ingredient Types tab */}
        <AllIngredientTypes></AllIngredientTypes>

      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Content for Smoothies tab */}
        <AllSmoothies></AllSmoothies>

      </TabPanel>
    </Box>
        </>
    )
}
