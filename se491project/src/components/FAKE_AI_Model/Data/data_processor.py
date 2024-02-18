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

DF = None
OUTPUT_DF = None

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
    

def clean_excel():
    global OUTPUT_DF
    
    wanted_columns = [SFM, GENDER, BIRTHYEAR, SKINTONE]
    OUTPUT_DF = DF[wanted_columns]
    
    # Clean the excel
    try:
        print()
        print("Trying to Clean Excel")
        print()
        
        clean_targets(SFM)
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
        
        return True
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

def read_excel(excel_file):
    try:
        dataframe = pd.read_excel(EXCEL_FILE)
        
        if dataframe is not None:
            print()
            print("Excel file read successfully.")
            print()
            
            return dataframe
        
        else:
            print("Failed to read Excel file.")
            
    except Exception as e:
        print(f"An unexpected error occurred: {e}")       
    
DF = read_excel(EXCEL_FILE)

print(DF.head())
print(DF.columns)

if (clean_excel()):
    print(OUTPUT_DF.head())
    
    output_csv(OUTPUT_DF)
    
else:
    print()
    print("Something went wrong")
    print()
    
    quit()
    
    
