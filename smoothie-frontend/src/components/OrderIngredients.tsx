import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Tooltip } from '@mui/material';
import { calculatePurchases, calculateTotalIngredients } from '../utils/miscFunctions';


export const OrderIngredients = (props: any) => {



    function extractHref(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        return doc.querySelector("a")?.href;
    }








    const returnNameLink = (params) => {

        return (
            <a href={params.value.href} target="_blank">
                {params.value.ingredient_name}
            </a>
        )
    }


    const returnAmazonLink = (params) => {

        return (
            <Tooltip title={params.value.ingredient_name}>
                <a href={params.value.href} target="_blank">
                    <ShoppingCartIcon></ShoppingCartIcon>
                </a>
            </Tooltip>
        )
    }


    var getColumns = () => {
        var columns: GridColDef[] = [
            // { field: 'id', hide: true, editable: false } as GridColDef,,
            {
                field: 'ingredient_name',
                headerName: 'Ingredient',
                editable: false,
                flex: 0.3, 
                minWidth: 400,
                renderCell: returnNameLink
            },
            {
                field: 'count',
                headerName: 'Quantity Needed',
                width: 200,
                editable: false,
            },
            {
                field: 'item_cost',
                headerName: 'Item Cost',
                width: 200,
                editable: false,
            },
            {
                field: 'total_cost',
                headerName: 'Total Cost',
                width: 200,
                editable: false,
            },
            {
                field: 'amazon_link',
                headerName: 'Amazon Fresh Link',
                width: 200,
                editable: false,
                renderCell: returnAmazonLink
            },

        ]

        return columns
    }
    var getRows = () => {
        var rows = []
        var mainIngredientTotals = calculateTotalIngredients(props.selectedSmoothies)

        const neededPurchases = calculatePurchases(mainIngredientTotals, props.allIngredients);
        console.log("NEEDED")
        console.log(neededPurchases)
        for (let i = 0; i < neededPurchases.length; i++) {
            var href = extractHref(neededPurchases[i]["amazon_link"])
            var currentRow = {}
            currentRow["id"] = i;
            currentRow["ingredient_name"] = { ingredient_name: neededPurchases[i]["ingredient_name"], href: href }
            currentRow["ingredient_type"] = neededPurchases[i]["ingredient_type"]
            currentRow["item_cost"] = neededPurchases[i]["item_cost"].toFixed(2)
            currentRow["total_cost"] = (neededPurchases[i]["item_cost"] * neededPurchases[i]["count"]).toFixed(2)
            currentRow["count"] = neededPurchases[i]["count"]
            currentRow["amazon_link"] = { ingredient_name: neededPurchases[i]["ingredient_name"], href: href }
            rows.push(currentRow)
        }
        return rows
    }


    return (
        <div style={{ height: "calc(100vh - 300px)", width: '100%' }}>
            <h3>ORDER INGREDIENTS</h3>
            <DataGrid
                rows={getRows()}
                columns={getColumns()}
            // pageSize={100}
            />
        </div>
    )
}