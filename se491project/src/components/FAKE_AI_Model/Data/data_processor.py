import pandas as pd
import numpy as np
import datetime

EXCEL_FILE = "se491project\src\components\FAKE_AI_Model\Data\PATIENTS_Nov_3_2023_V4_sfm-data.xlsx"
OUTPUT_CSV = "se491project\src\components\FAKE_AI_Model\Data\patients_to_csv.csv"

SFM = "SFM Id"
GENDER = "Gender"
BIRTHYEAR = "BirthYear"

CITY = "City"
STATE = "State"
COUNTRY = "Country"

#fitz
SKINTONE = "SkinTone"
SKINCONDITIONS = "SkinConditions"

TRAITS = None
ALLERGENS = None

OUTPUT_TRAITS = None
OUTPUT_ALLERGENS = None

def clean_targets(column_name):
    # Check if the specified column exists
    if column_name not in DF.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_gender(column_name):
    # Check if the specified column exists
    if column_name not in DF.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0

def calculate_age(birth_year):
    current_year = datetime.datetime.now().year
    age = current_year - birth_year
    return age

def clean_birthyear(column_name):
    # Check if the specified column exists
    if column_name not in DF.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_city(column_name):
    # Check if the specified column exists
    if column_name not in DF.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_state(column_name):
    # Check if the specified column exists
    if column_name not in DF.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_country(column_name):
    # Check if the specified column exists
    if column_name not in DF.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
# fitz skin photo type
    
def clean_skin_tone(column_name):
    # Check if the specified column exists
    if column_name not in DF.columns:
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

def output_csv(dataframe):
    try:
        # Write DataFrame to CSV
        dataframe.to_csv(OUTPUT_CSV, index=False)
        
        print()
        print("CSV file successfully created.")
        print()
        
    except Exception as e:
        print(f"An error occurred: {e}")
    

def get_model_inputs():
    input_columns = [SFM, GENDER, BIRTHYEAR, SKINTONE]
    output = TRAITS[input_columns]
    
    # Clean the excel
    try:
        print()
        print("Trying to Clean Excel")
        print()
        
        clean_gender(GENDER)
        clean_birthyear(BIRTHYEAR)
        
        clean_city(CITY)
        clean_state(STATE)
        clean_country(COUNTRY)
        
        #clean_fitz
        clean_skin_tone(SKINTONE)
        #clean_skin_conditions()
        
        print()
        print("Cleaned Excel")
        print()
        
        return output
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

def read_excel(excel_file):
    try:
        dataframe = pd.read_excel(EXCEL_FILE, sheet_name=None)
        
        if dataframe is None:
            print()
            print("Excel file FAILED to read.")
            print()
            
            return None
        
        traits_data = dataframe['Level2_AI_Patient Traits']
        
        if traits_data is None:
            print()
            print("Traits Data sheet does not exist.")
            print()
            
            return None
        
        allergens_data = dataframe['Level1_Patient Allergens']
        
        if allergens_data is None:
            print()
            print("Allergens Data sheet does not exist.")
            print()
            
            return None
        
        print()
        print("Excel File Read Successfully.")
        print()
        
        return traits_data, allergens_data
        
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None       

# MAIN ################################################################
    
TRAITS, ALLERGENS = read_excel(EXCEL_FILE)

if (TRAITS.empty or ALLERGENS.empty):
    quit()

print(TRAITS.head())
print(ALLERGENS.head())

if (get_model_inputs() is False):
    quit()
    
if (get_model_targets() is False):
    quit()
    
