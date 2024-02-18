import pandas as pd
import numpy as np

EXCEL_FILE = "se491project\src\components\FAKE_AI_Model\Data\PATIENTS_Nov_3_2023_V4_sfm-data.xlsx"
df = None

def clean_targets(column_name):
    # Check if the specified column exists
    if column_name not in df.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_gender(column_name):
    # Check if the specified column exists
    if column_name not in df.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_city(column_name):
    # Check if the specified column exists
    if column_name not in df.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_state(column_name):
    # Check if the specified column exists
    if column_name not in df.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_country(column_name):
    # Check if the specified column exists
    if column_name not in df.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
# fitz skin photo type
    
def clean_skin_tone(column_name, dataFrame):
    # Check if the specified column exists
    if column_name not in df.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
# need to figure out how to filter these    
def clean_skin_conditions(column_name):
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

def clean_excel(dataframe):
    clean_targets()
    clean_gender()
    clean_city()
    clean_state()
    clean_country()
    clean_skin_tone()
    clean_skin_conditions

def read_excel(excel_file):
    try:
        dataframe = pd.read_excel(EXCEL_FILE)
        
        if dataframe is not None:
            print()
            print("Excel file read successfully.")
            print()
            
            print(dataframe.head())
            
            return dataframe
        
        else:
            print("Failed to read Excel file.")
            
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
df = read_excel(EXCEL_FILE)