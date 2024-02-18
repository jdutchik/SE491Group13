import pandas as pd
import numpy as np

def read_column():
    return 0

def find_unique_options(excel_file, column_name):
    # Read Excel file into a DataFrame
    df = pd.read_excel(excel_file)
    
    # Check if the specified column exists
    if column_name not in df.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    # Get unique options from the specified column
    values = df[column_name]
    cleaned_values = values.str.lower().str.replace('%20', ' ').str.split(',').explode()
    unique_options = cleaned_values.unique()
    
    no_others_option = np.array([x for x in unique_options if not str(x).lstrip().startswith('other')])
    
    # Display unique options
    print(f"Unique options in column '{column_name}':")
    print("Count: {}".format(len(no_others_option)))
    
    for option in no_others_option:
        print(option.strip())

# Example usage:
excel_file = "se491project\src\components\FAKE_AI_Model\Data\PATIENTS_Nov_3_2023_V4_sfm-data.xlsx"  # Replace with the path to your Excel file
column_name = "SkinConditions"       # Replace with the name of the column you want to search

find_unique_options(excel_file, column_name)