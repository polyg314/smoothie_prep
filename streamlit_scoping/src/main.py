import streamlit as st

import pandas as pd
import os

current_directory = os.getcwd()



# Load the Excel file, specify the sheet by its index (1 for the second sheet)
ingredients_df = pd.read_excel(current_directory + '/src/smoothie_sheets.xlsx', sheet_name=0)
smoothies_df = pd.read_excel(current_directory + '/src/smoothie_sheets.xlsx', sheet_name=1)

# Convert the DataFrame to a JSON array
ingredients_data = ingredients_df.to_json(orient='records')
smoothie_data = smoothies_df.to_json(orient='records')


def main():
    st.title("Smoothie Meal Prep")
    st.subheader("Scoping out meal prep app for smoothies")

    st.header("1. Choose your smoothies")
    st.write(smoothies_df)
    st.header("2. Review and purchase on Amazon")
    st.write(ingredients_df)
    st.header("3. Download recipe sheet")



if __name__ == "__main__":
    main()
