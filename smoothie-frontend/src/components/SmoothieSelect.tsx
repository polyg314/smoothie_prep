import { Grid, Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { Ingredient, Smoothie } from '../models/mainModels';
import { calculatePurchases, calculateTotalIngredients, objectCopy } from '../utils/miscFunctions';
import NumberInput from './NumberInput';
import PushPinIcon from '@mui/icons-material/PushPin';


export const SmoothieSelect = (props:any) => {



    const calculateSmoothieCostRange = (smoothie, allIngredients) => {

        var minCost = 0;
        var maxCost = 0; 

        for(let i = 0; i < smoothie.ingredients.length; i++){
            var ingOptions = allIngredients.filter(obj => obj.ingredient_type === smoothie.ingredients[i]["ingredient_name"]).sort((a, b) => b.cost_p_100g - a.cost_p_100g);
            // console.log(smoothie.ingredients[i]["ingredient_name"])
            // console.log(ingOptions)
            // console.log(smoothie)
            maxCost = maxCost + ingOptions[0]["cost_p_100g"]* smoothie.ingredients[i]["ingredient_weight"]/100
            minCost = minCost + ingOptions[ingOptions.length - 1]["cost_p_100g"]* smoothie.ingredients[i]["ingredient_weight"]/100
        }

        return(
            <Typography variant="body2" color="text.secondary" style={{textAlign: "left", color: "black",  position: "absolute", bottom: 10}}>
                ${minCost.toFixed(2)} - ${maxCost.toFixed(2)}
            </Typography>
        )

    }





    const calculateExactSmoothieCost = (smoothie, allIngredients, selectedSmoothies) => {
        var mainIngredientTotals = calculateTotalIngredients(selectedSmoothies)
        const neededPurchases = calculatePurchases(mainIngredientTotals, allIngredients);
        var ingCostDict = {}
        var mainIngs = Object.keys(mainIngredientTotals)
        for(let i = 0; i < mainIngs.length; i++){
            var ingPurchases = neededPurchases.filter(obj => obj["ingredient_type"] === mainIngs[i])
            let totalCost = 0;
            let totalWeight = 0;
            console.log("ING PURCHASES")
            console.log(ingPurchases)
            console.log(neededPurchases)
            ingPurchases.forEach(ingredient => {
                totalCost += ingredient["item_cost"] * ingredient["count"];
                totalWeight += ingredient["weight_g"] * ingredient["count"];
            });

            ingCostDict[mainIngs[i]] = (totalCost / totalWeight) * 100
        }
        console.log("CDDD")
        console.log(ingCostDict)
        var cost = 0
        for(let j = 0; j < smoothie.ingredients.length; j++){
            console.log(smoothie.ingredients[j])
            cost = cost + (ingCostDict[smoothie.ingredients[j]["ingredient_name"]]*(smoothie.ingredients[j]["ingredient_weight"]/100))
        }

        
        return(
            <Typography variant="body2" color="text.secondary" style={{textAlign: "left", color: "black",  position: "absolute", bottom: 10}}>
                ${cost.toFixed(2)}
            </Typography>
        )
    }


    const handleAddClick = (smoothie) => {
        console.log(smoothie)
        var selectedCopy = objectCopy(props.selectedSmoothies)
        var newSmoothies = selectedCopy.filter(smo => smo.smoothie_id !== smoothie.smoothie_id)
        console.log(newSmoothies)
        newSmoothies.push({...smoothie, count: 1})
        console.log(newSmoothies)
        props.handleSetSelectedSmoothies(newSmoothies)
        // console.log(`Adding ${smoothieName}`);
        // Add logic to handle the addition of the smoothie
    };

    const handleSelectedCountChange = (smoothie_id, v) => {
        console.log(smoothie_id)
        console.log(v)
        var selectedCopy = objectCopy(props.selectedSmoothies)
        if(v === 0){
            var newSmoothies = selectedCopy.filter(smo => smo.smoothie_id !== smoothie_id)
            props.handleSetSelectedSmoothies(newSmoothies)
        }else{
            const updatedArray = selectedCopy.map(item => {
                if (item.smoothie_id === smoothie_id) {
                    return { ...item, count:v};
                }
                return item;
            });
            props.handleSetSelectedSmoothies(updatedArray)
        }
    }


    return(
        <>
        <h3>SELECT SMOOTHIES</h3>
        <Grid container spacing={2} style={{padding: "20px 10px"}}>
            {props.selectedSmoothies.map((smoothie: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={smoothie.smoothie_id} style={{ display: 'flex' }}>
                    <Card style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', paddingBottom: 28}}>
                    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                            <PushPinIcon color="action" />
                        </Box>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom style={{textAlign: "left", maxWidth: "calc(100% - 80px)"}}>
                                {smoothie.smoothie_name}
                            </Typography>
                            {smoothie.ingredients.map((ingredient: Ingredient, idx: number) => (
                                <Typography variant="body2" color="text.secondary" key={idx}
                                    style={{textAlign: "left"}}
                                >
                                    {ingredient.ingredient_display + " " + ingredient.ingredient_name}
                                </Typography>
                            ))}
                            {calculateExactSmoothieCost(smoothie, props.allIngredients, props.selectedSmoothies)}
                        </CardContent>
                        <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                            <NumberInput value={smoothie.count} smoothie_id={smoothie.smoothie_id} handleSelectedCountChange={handleSelectedCountChange}></NumberInput>
                        </Box>
                    </Card>
                </Grid>
            ))}
            {props.allSmoothies.filter(item1 => !props.selectedSmoothies.some(item2 => item2.smoothie_id === item1.smoothie_id)).map((smoothie: Smoothie, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={smoothie.smoothie_id} style={{ display: 'flex' }}>
                    <Card style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', paddingBottom: 28 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom style={{textAlign: "left", maxWidth: "calc(100% - 80px)"}}>
                                {smoothie.smoothie_name}
                            </Typography>
                            {smoothie.ingredients.map((ingredient: Ingredient, idx: number) => (
                                <Typography variant="body2" color="text.secondary" key={idx}
                                    style={{textAlign: "left"}}
                                >
                                    {ingredient.ingredient_display + " " + ingredient.ingredient_name}
                                </Typography>
                            ))}
                            {calculateSmoothieCostRange(smoothie, props.allIngredients)}
                        </CardContent>
                        <Box sx={{ position: 'absolute',top: 16, right: 16 }}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => handleAddClick(smoothie)}
                            >
                                Add
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}