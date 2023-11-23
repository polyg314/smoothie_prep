import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SmoothieSelect } from '../components/SmoothieSelect';
import { useEffect, useState } from 'react';
import { readExcelFile } from '../utils/excelFunctions';
import * as XLSX from 'xlsx';
import { Ingredient, Smoothie } from '../models/mainModels';


const steps = ['Select Smoothies', 'Order Ingredients', 'Save Directions'];


export const NewSmoothieOrder = (props:any) => {


    const [allSmoothies, setAllSmoothies] = useState([])
    const [selectedSmoothies, setSelectedSmoothies] = useState([])
    const [allIngredients, setAllIngredients] = useState([])

    const handleSetSelectedSmoothies = (newSmoothies:any) => {
        setSelectedSmoothies(newSmoothies)
        console.log(newSmoothies)
    }



    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
      [k: number]: boolean;
    }>({});




    function reformatSmoothies(smoothies:any) {
        return smoothies.map((smoothie, index) => {
            const ingredients = [];
            let i = 1;
    
            while(smoothie[`ing_${i}`]) {
                ingredients.push({
                    ingredient_name: smoothie[`ing_${i}`],
                    ingredient_weight: smoothie[`ing_${i}_weight`],
                    ingredient_display: smoothie[`ing_${i}_disp`]
                });
                i++;
            }
    
            return {
                smoothie_id: index, 
                smoothie_name: smoothie.smoothie_name,
                ingredients: ingredients
            };
        });
    }


    useEffect(() => {
        // Until backend set up, just use temp XLSX DB 
        fetch('/smoothie_sheets.xlsx')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            const smoothieOptions = readExcelFile(arrayBuffer, 'smoothies')
            const ingredientOptions = readExcelFile(arrayBuffer, 'ingredients')            
            // Reformat to mimic what will look like in DB 
            const reformattedSmoothies = reformatSmoothies(smoothieOptions)
            setAllSmoothies(reformattedSmoothies)
            setAllIngredients(ingredientOptions)
        })
        .catch(error => console.error('Error reading the Ingredient / Smoothie Excel file:', error));


    },[])


  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStep = (step: number) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
               <Box display="flex" flexDirection="column" minHeight="calc(100vh - 236px)">
                {steps[activeStep] === "Select Smoothies" && 
                    <>
                        <SmoothieSelect
                            allSmoothies={allSmoothies}
                            selectedSmoothies={selectedSmoothies}
                            handleSetSelectedSmoothies={handleSetSelectedSmoothies}
                        ></SmoothieSelect>
                    </>
                }   

                {steps[activeStep] === "Order Ingredients" && 
                    <>
                    Order Ingredients
                    </>
                }   

                {steps[activeStep] === "Save Directions" && 
                    <>
                    Save Directions
                    </>
                }   
              
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Complete Step'}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    );
}