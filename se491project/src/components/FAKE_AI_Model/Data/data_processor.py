import pandas as pd
import numpy as np
import datetime

EXCEL_FILE = "se491project\src\components\FAKE_AI_Model\Data\PATIENTS_Nov_3_2023_V4_sfm-data.xlsx"

OUTPUT_TRAITS_CSV = "se491project\src\components\FAKE_AI_Model\Data\patients.csv"
OUPUT_ALLERGENS_CSV = "se491project\src\components\FAKE_AI_Model\Data\allergens.csv"

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

def calculate_age(birth_year):
    current_year = datetime.datetime.now().year
    age = current_year - birth_year
    return age
    
def clean_gender(dataframe, column_name):
    # Check if the specified column exists
    if column_name not in dataframe.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0

def clean_birthyear(dataframe, column_name):
    # Check if the specified column exists
    if column_name not in dataframe.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_city(column_name):
    # Check if the specified column exists
    if column_name not in TRAITS.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_state(column_name):
    # Check if the specified column exists
    if column_name not in TRAITS.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
def clean_country(column_name):
    # Check if the specified column exists
    if column_name not in TRAITS.columns:
        print(f"Column '{column_name}' not found in the Excel file.")
        return
    
    return 0
    
# fitz skin photo type
    
def clean_skin_tone(column_name):
    # Check if the specified column exists
    if column_name not in TRAITS.columns:
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

def output_csv(dataframe, type, filepath):
    try:
        # Write DataFrame to CSV
        dataframe.to_csv(filepath, index=False)
        
        print()
        print(f"CSV for {type} successfully created.")
        print()
        
    except Exception as e:
        print(f"An error occurred: {e}")

def get_model_targets(dataframe, output_dataframe):    
    try:
        output_dataframe = dataframe
        return True
        
    except Exception as e:
        print(f"An error occurred: {e}")
        return False    

def get_model_inputs(dataframe, output_dataframe):
    input_columns = [SFM, GENDER, BIRTHYEAR, SKINTONE]
    output = dataframe[input_columns]
    
    # Clean the excel
    try:
        print()
        print("Trying to Get Model Inputs from DataFrame")
        print()
        
        clean_gender(dataframe, GENDER)
        clean_birthyear(dataframe, BIRTHYEAR)
        
        #clean_city(CITY)
        #clean_state(STATE)
        #clean_country(COUNTRY)
        
        #clean_fitz
        #clean_skin_tone(SKINTONE)
        #clean_skin_conditions()
        
        print("SUCCESS!")
        print()
        
        output_dataframe = output
        
        return True
    
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
    
# Read Excel    
TRAITS, ALLERGENS = read_excel(EXCEL_FILE)

if (TRAITS.empty or ALLERGENS.empty):
    quit()

print(TRAITS.head())
print(TRAITS.shape)
print()
print(ALLERGENS.head())
print(ALLERGENS.shape)

# get model inputs
if (get_model_inputs(OUTPUT_TRAITS) is False):
    quit()
    
# get model targets
if (get_model_targets(OUTPUT_ALLERGENS) is False):
    quit()
    
print(OUTPUT_TRAITS.head())
print(OUTPUT_TRAITS.shape)
print()
print(OUTPUT_ALLERGENS.head())
print(OUTPUT_ALLERGENS.shape)
    
# export PATIENTS to csv
if (output_csv(OUTPUT_TRAITS, "traits", OUTPUT_TRAITS_CSV)):
    quit()
    
# export ALLERGENS to csv
if (output_csv(OUTPUT_ALLERGENS, "allergens", OUPUT_ALLERGENS_CSV)):
    quit()

print("Data Processing Completed :)")   
