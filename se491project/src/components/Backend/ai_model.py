import os
import s3fs
from tensorflow import keras
import numpy as np
import sys
import json
from dotenv import load_dotenv

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

################### ARRAYS ###########################

state_arr = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
                  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
                  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
                  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
                  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

skin_arr = ["Dark","Brown","Olive","Medium","Fair","Light"]

symptom_arr = ["sensitive skin allergist diagnosed", "sensitive skin self diagnosed", "contact dermatitis", "eczema atopic", "dry", 
                "acne pimples", "skin allergies", "rosacea", "discoloration hyperpigmentation", "fine lines wrinkles", "psoriasis", "celiacs", 
                "blackheads", "coconut", "textile dye mix", "gluten", "respiratory", "patchy rash", "tbd", "congestion", "ffa", "chapped", 
                "whiteheads", "rash", "balsam peru", "itching", "ppd", "alopecia", "ap93", "cocamidopropyl betaine", "metal", "ethylenediamine dihydrochloride", 
                "nickel", "balsam peru", "potassium dichromate", "glutaral", "licus planus", "lip inflammation", "lichen sclerosis", "dry lips", 
                "occasional rash outbreaks", "propolis", "cocamidopropyl betaine", "surgical site healing issues", "urticaria", "polysorbate 80", 
                "fragrance", "celiac", "perioral dermatitis", "scalp", "hives", "itchy", "red", "peeling", "itchy", "burning", "excema", "dermatitis herpetiformis", 
                "polyethylene glycol ", "oral lichen plans", "damaged pores extractions", "dermal hypersensitivity reaction"]

allergy_arr = ["Ingredient 9456", "Ingredient 100612", "Ingredient 100613", "Ingredient 100702", "Ingredient 100857", "Ingredient 102", 
               "Ingredient 10260", "Ingredient 103637", "Ingredient 104", "Ingredient 1043", "Ingredient 104630", "Ingredient 105017", 
               "Ingredient 10537", "Ingredient 10538", "Ingredient 10539", "Ingredient 10541", "Ingredient 10544", "Ingredient 10546", 
               "Ingredient 10552", "Ingredient 105611", "Ingredient 106344", "Ingredient 106518", "Ingredient 107036", "Ingredient 1107", 
               "Ingredient 111858", "Ingredient 112", "Ingredient 112022", "Ingredient 1126", "Ingredient 113", "Ingredient 1130", "Ingredient 1131", 
               "Ingredient 114559", "Ingredient 1149", "Ingredient 1153", "Ingredient 11661", "Ingredient 11662", "Ingredient 11686", "Ingredient 117", 
               "Ingredient 1177", "Ingredient 11790", "Ingredient 119", "Ingredient 11996", "Ingredient 121146", "Ingredient 121641", "Ingredient 121642", 
               "Ingredient 121652", "Ingredient 122055", "Ingredient 12344", "Ingredient 123717", "Ingredient 124", "Ingredient 124537", "Ingredient 124737", 
               "Ingredient 12522", "Ingredient 128", "Ingredient 128564", "Ingredient 128565", "Ingredient 129742", "Ingredient 129747", "Ingredient 13", 
               "Ingredient 130118", "Ingredient 13018", "Ingredient 130735", "Ingredient 131994", "Ingredient 131995", "Ingredient 131996", "Ingredient 131997", 
               "Ingredient 132762", "Ingredient 133", "Ingredient 133255", "Ingredient 133260", "Ingredient 133266", "Ingredient 133268", "Ingredient 133269", 
               "Ingredient 133270", "Ingredient 133271", "Ingredient 133272", "Ingredient 133273", "Ingredient 133274", "Ingredient 133275", "Ingredient 133628", 
               "Ingredient 133629", "Ingredient 133714", "Ingredient 134", "Ingredient 134256", "Ingredient 134795", "Ingredient 134800", "Ingredient 135153", 
               "Ingredient 136", "Ingredient 136640", "Ingredient 136703", "Ingredient 136704", "Ingredient 13691", "Ingredient 13708", "Ingredient 137787", 
               "Ingredient 137788", "Ingredient 137789", "Ingredient 137790", "Ingredient 137791", "Ingredient 137792", "Ingredient 137793", "Ingredient 137794", 
               "Ingredient 137795", "Ingredient 1385", "Ingredient 1387", "Ingredient 13881", "Ingredient 138878", "Ingredient 13891", "Ingredient 139001", 
               "Ingredient 139053", "Ingredient 139464", "Ingredient 1395", "Ingredient 139662", "Ingredient 14005", "Ingredient 140154", "Ingredient 1406", 
               "Ingredient 140625", "Ingredient 140626", "Ingredient 144962", "Ingredient 145", "Ingredient 1453", "Ingredient 1456", "Ingredient 1458", "Ingredient 1462", 
               "Ingredient 146546", "Ingredient 148043", "Ingredient 148092", "Ingredient 148307", "Ingredient 1487", "Ingredient 149", "Ingredient 1496", 
               "Ingredient 149879", "Ingredient 149880", "Ingredient 151038", "Ingredient 151451", "Ingredient 151554", "Ingredient 151557", "Ingredient 151559", 
               "Ingredient 151560", "Ingredient 152", "Ingredient 152543", "Ingredient 152913", "Ingredient 1530", "Ingredient 153025", "Ingredient 1532", 
               "Ingredient 155222", "Ingredient 1558", "Ingredient 1582", "Ingredient 1586", "Ingredient 1587", "Ingredient 1588", "Ingredient 1589", "Ingredient 159", 
               "Ingredient 1590", "Ingredient 1592", "Ingredient 1594", "Ingredient 1595", "Ingredient 1596", "Ingredient 1597", "Ingredient 1598", "Ingredient 1599", 
               "Ingredient 1600", "Ingredient 1601", "Ingredient 1602", "Ingredient 1603", "Ingredient 1604", "Ingredient 1605", "Ingredient 1606", "Ingredient 1607", 
               "Ingredient 1608", "Ingredient 1609", "Ingredient 1610", "Ingredient 1611", "Ingredient 1613", "Ingredient 1615", "Ingredient 1616", "Ingredient 1619", 
               "Ingredient 1625", "Ingredient 1628", "Ingredient 1632", "Ingredient 1635", "Ingredient 16391", "Ingredient 1646", "Ingredient 164687", "Ingredient 1658", 
               "Ingredient 166", "Ingredient 1665", "Ingredient 1668", "Ingredient 16760", "Ingredient 17049", "Ingredient 17187", "Ingredient 1735", "Ingredient 1802", 
               "Ingredient 1803", "Ingredient 1804", "Ingredient 1805", "Ingredient 1825", "Ingredient 1826", "Ingredient 1827", "Ingredient 1828", "Ingredient 183", 
               "Ingredient 1830", "Ingredient 184", "Ingredient 1842", "Ingredient 185", "Ingredient 186", "Ingredient 1866", "Ingredient 18699", "Ingredient 188", 
               "Ingredient 1886", "Ingredient 1893", "Ingredient 190", "Ingredient 1903", "Ingredient 192", "Ingredient 19235", "Ingredient 19236", "Ingredient 193", 
               "Ingredient 19352", "Ingredient 196", "Ingredient 1964", "Ingredient 1967", "Ingredient 1968", "Ingredient 1979", "Ingredient 1982", "Ingredient 1983", 
               "Ingredient 1986", "Ingredient 1987", "Ingredient 1988", "Ingredient 1989", "Ingredient 1990", "Ingredient 1993", "Ingredient 1994", "Ingredient 1995", 
               "Ingredient 1996", "Ingredient 1997", "Ingredient 1998", "Ingredient 1999", "Ingredient 2000", "Ingredient 2002", "Ingredient 2004", "Ingredient 2007", 
               "Ingredient 2008", "Ingredient 2009", "Ingredient 201", "Ingredient 2012", "Ingredient 2013", "Ingredient 2015", "Ingredient 2016", "Ingredient 2018", 
               "Ingredient 2020", "Ingredient 2023", "Ingredient 2028", "Ingredient 203", "Ingredient 2030", "Ingredient 2031", "Ingredient 2032", "Ingredient 2033", 
               "Ingredient 20359", "Ingredient 2038", "Ingredient 2039", "Ingredient 204", "Ingredient 2040", "Ingredient 2041", "Ingredient 2042", "Ingredient 2044", 
               "Ingredient 2046", "Ingredient 2047", "Ingredient 2048", "Ingredient 2049", "Ingredient 205", "Ingredient 2050", "Ingredient 2051", "Ingredient 2052", 
               "Ingredient 2053", "Ingredient 2054", "Ingredient 2055", "Ingredient 2058", "Ingredient 2059", "Ingredient 20759", "Ingredient 20806", "Ingredient 209", 
               "Ingredient 20937", "Ingredient 210", "Ingredient 2121", "Ingredient 213", "Ingredient 21339", "Ingredient 2134", "Ingredient 21340", "Ingredient 21341", 
               "Ingredient 21342", "Ingredient 214", "Ingredient 2142", "Ingredient 215", "Ingredient 217", "Ingredient 21888", "Ingredient 219", "Ingredient 2195", 
               "Ingredient 22030", "Ingredient 221", "Ingredient 222", "Ingredient 2234", "Ingredient 225", "Ingredient 226", "Ingredient 2269", "Ingredient 227", 
               "Ingredient 2270", "Ingredient 2272", "Ingredient 2275", "Ingredient 22755", "Ingredient 2278", "Ingredient 2282", "Ingredient 2283", "Ingredient 22833", 
               "Ingredient 2287", "Ingredient 2288", "Ingredient 229", "Ingredient 2290", "Ingredient 2292", "Ingredient 2293", "Ingredient 2294", "Ingredient 230", 
               "Ingredient 2300", "Ingredient 2304", "Ingredient 2306", "Ingredient 2307", "Ingredient 2308", "Ingredient 231", "Ingredient 2311", "Ingredient 2312", 
               "Ingredient 2313", "Ingredient 232", "Ingredient 23250", "Ingredient 233", "Ingredient 234", "Ingredient 23454", "Ingredient 2350", "Ingredient 2377", 
               "Ingredient 2383", "Ingredient 23944", "Ingredient 240", "Ingredient 24022", "Ingredient 24023", "Ingredient 24025", "Ingredient 24028", "Ingredient 24033", 
               "Ingredient 24035", "Ingredient 24037", "Ingredient 24039", "Ingredient 24041", "Ingredient 24042", "Ingredient 24044", "Ingredient 24045", "Ingredient 24048", 
               "Ingredient 24049", "Ingredient 24050", "Ingredient 24055", "Ingredient 24056", "Ingredient 24057", "Ingredient 24058", "Ingredient 24059", "Ingredient 24061", 
               "Ingredient 24064", "Ingredient 24065", "Ingredient 24067", "Ingredient 24071", "Ingredient 24073", "Ingredient 24074", "Ingredient 24075", "Ingredient 24080", 
               "Ingredient 24081", "Ingredient 24083", "Ingredient 24084", "Ingredient 246", "Ingredient 247", "Ingredient 24816", "Ingredient 2502", "Ingredient 25159", 
               "Ingredient 2528", "Ingredient 2536", "Ingredient 2565", "Ingredient 257", "Ingredient 26014", "Ingredient 26137", "Ingredient 263", "Ingredient 264", 
               "Ingredient 26803", "Ingredient 2684", "Ingredient 2689", "Ingredient 270", "Ingredient 2737", "Ingredient 2761", "Ingredient 2770", "Ingredient 2787", 
               "Ingredient 280", "Ingredient 2819", "Ingredient 282", "Ingredient 2821", "Ingredient 2853", "Ingredient 28559", "Ingredient 286", "Ingredient 28772", 
               "Ingredient 2908", "Ingredient 29231", "Ingredient 2945", "Ingredient 2950", "Ingredient 29502", "Ingredient 299", "Ingredient 3020", "Ingredient 30442", 
               "Ingredient 30482", "Ingredient 30670", "Ingredient 3092", "Ingredient 3125", "Ingredient 3126", "Ingredient 3127", "Ingredient 32120", "Ingredient 322", 
               "Ingredient 3222", "Ingredient 3225", "Ingredient 32513", "Ingredient 32693", "Ingredient 3279", "Ingredient 32880", "Ingredient 33172", "Ingredient 33173", 
               "Ingredient 33710", "Ingredient 3388", "Ingredient 340", "Ingredient 3405", "Ingredient 3450", "Ingredient 34813", "Ingredient 3497", "Ingredient 35361", 
               "Ingredient 35423", "Ingredient 3551", "Ingredient 3552", "Ingredient 3565", "Ingredient 3601", "Ingredient 3610", "Ingredient 37026", "Ingredient 3766", 
               "Ingredient 3768", "Ingredient 3784", "Ingredient 3793", "Ingredient 3799", "Ingredient 38080", "Ingredient 385", "Ingredient 3887", "Ingredient 39209", 
               "Ingredient 3929", "Ingredient 3962", "Ingredient 39777", "Ingredient 41508", "Ingredient 41609", "Ingredient 41610", "Ingredient 41612", "Ingredient 41621", 
               "Ingredient 41622", "Ingredient 41714", "Ingredient 41716", "Ingredient 41728", "Ingredient 41729", "Ingredient 418", "Ingredient 4185", "Ingredient 41987", 
               "Ingredient 41989", "Ingredient 42", "Ingredient 42006", "Ingredient 4205", "Ingredient 42184", "Ingredient 42185", "Ingredient 422", "Ingredient 4249", 
               "Ingredient 4271", "Ingredient 43193", "Ingredient 4364", "Ingredient 4367", "Ingredient 4414", "Ingredient 44462", "Ingredient 44465", "Ingredient 445", 
               "Ingredient 4454", "Ingredient 451", "Ingredient 4550", "Ingredient 459", "Ingredient 46081", "Ingredient 4613", "Ingredient 4615", "Ingredient 4616", 
               "Ingredient 4617", "Ingredient 4618", "Ingredient 4619", "Ingredient 4637", "Ingredient 4638", "Ingredient 4668", "Ingredient 469", "Ingredient 46995", 
               "Ingredient 4701", "Ingredient 4702", "Ingredient 47438", "Ingredient 4824", "Ingredient 4851", "Ingredient 4878", "Ingredient 4882", "Ingredient 4891", 
               "Ingredient 4909", "Ingredient 4928", "Ingredient 4929", "Ingredient 4936", "Ingredient 51508", "Ingredient 5198", "Ingredient 5225", "Ingredient 5236", 
               "Ingredient 5248", "Ingredient 5271", "Ingredient 5272", "Ingredient 52757", "Ingredient 5322", "Ingredient 5345", "Ingredient 5374", "Ingredient 5405", 
               "Ingredient 5430", "Ingredient 5431", "Ingredient 5437", "Ingredient 5443", "Ingredient 545", "Ingredient 5467", "Ingredient 5468", "Ingredient 54753", 
               "Ingredient 54806", "Ingredient 54973", "Ingredient 5500", "Ingredient 55159", "Ingredient 5538", "Ingredient 5560", "Ingredient 5696", "Ingredient 5823", 
               "Ingredient 5825", "Ingredient 5880", "Ingredient 5881", "Ingredient 5926", "Ingredient 5934", "Ingredient 598", "Ingredient 5986", "Ingredient 6", 
               "Ingredient 6011", "Ingredient 6020", "Ingredient 607", "Ingredient 608", "Ingredient 60902", "Ingredient 6096", "Ingredient 613", "Ingredient 614", 
               "Ingredient 6149", "Ingredient 615", "Ingredient 6150", "Ingredient 61707", "Ingredient 61708", "Ingredient 61913", "Ingredient 61986", "Ingredient 62", 
               "Ingredient 6229", "Ingredient 634", "Ingredient 6390", "Ingredient 6416", "Ingredient 6462", "Ingredient 6471", "Ingredient 6509", "Ingredient 65964", 
               "Ingredient 6638", "Ingredient 6657", "Ingredient 6659", "Ingredient 671", "Ingredient 6746", "Ingredient 676", "Ingredient 68", "Ingredient 680", 
               "Ingredient 68258", "Ingredient 68271", "Ingredient 6841", "Ingredient 686", "Ingredient 69227", "Ingredient 6927", "Ingredient 700", "Ingredient 7044", 
               "Ingredient 7047", "Ingredient 7076", "Ingredient 7086", "Ingredient 71", "Ingredient 715", "Ingredient 71869", "Ingredient 71870", "Ingredient 723", 
               "Ingredient 7338", "Ingredient 73771", "Ingredient 7431", "Ingredient 7454", "Ingredient 7477", "Ingredient 7500", "Ingredient 7529", "Ingredient 754", 
               "Ingredient 75701", "Ingredient 7578", "Ingredient 7581", "Ingredient 75912", "Ingredient 764", "Ingredient 76458", "Ingredient 7651", "Ingredient 7669", 
               "Ingredient 7737", "Ingredient 7783", "Ingredient 7812", "Ingredient 7813", "Ingredient 79", "Ingredient 7946", "Ingredient 799", "Ingredient 8", 
               "Ingredient 80", "Ingredient 800", "Ingredient 8033", "Ingredient 8139", "Ingredient 8140", "Ingredient 81708", "Ingredient 8172", "Ingredient 81750", 
               "Ingredient 81751", "Ingredient 82031", "Ingredient 8236", "Ingredient 828", "Ingredient 8376", "Ingredient 8379", "Ingredient 8386", "Ingredient 839", 
               "Ingredient 83935", "Ingredient 8427", "Ingredient 8469", "Ingredient 8512", "Ingredient 85249", "Ingredient 854", "Ingredient 8567", "Ingredient 859", 
               "Ingredient 8723", "Ingredient 8768", "Ingredient 8899", "Ingredient 9116", "Ingredient 9127", "Ingredient 91958", "Ingredient 9207", "Ingredient 9216", 
               "Ingredient 9274", "Ingredient 9275", "Ingredient 9276", "Ingredient 9277", "Ingredient 9289", "Ingredient 9296", "Ingredient 9297", "Ingredient 9298", 
               "Ingredient 9300", "Ingredient 9301", "Ingredient 9305", "Ingredient 9308", "Ingredient 9310", "Ingredient 9312", "Ingredient 9314", "Ingredient 9315", 
               "Ingredient 9318", "Ingredient 9321", "Ingredient 9322", "Ingredient 9324", "Ingredient 9325", "Ingredient 9327", "Ingredient 9329", "Ingredient 9335", 
               "Ingredient 9337", "Ingredient 9338", "Ingredient 93387", "Ingredient 9339", "Ingredient 9341", "Ingredient 9342", "Ingredient 9344", "Ingredient 93450", 
               "Ingredient 9346", "Ingredient 9348", "Ingredient 93499", "Ingredient 9351", "Ingredient 9355", "Ingredient 9357", "Ingredient 9358", "Ingredient 9361", 
               "Ingredient 9364", "Ingredient 9365", "Ingredient 9371", "Ingredient 9372", "Ingredient 93733", "Ingredient 9375", "Ingredient 9376", "Ingredient 9384", 
               "Ingredient 9388", "Ingredient 9389", "Ingredient 9391", "Ingredient 9392", "Ingredient 9393", "Ingredient 9400", "Ingredient 9404", "Ingredient 94128", 
               "Ingredient 9418", "Ingredient 9421", "Ingredient 9424", "Ingredient 9438", "Ingredient 94473", "Ingredient 9452", "Ingredient 9458", "Ingredient 9465", 
               "Ingredient 9466", "Ingredient 95426", "Ingredient 95438", "Ingredient 96100", "Ingredient 9646", "Ingredient 9667", "Ingredient 96771", "Ingredient 9685", 
               "Ingredient 97", "Ingredient 97196", "Ingredient 97569", "Ingredient 9804", "Ingredient 98288", "Ingredient 99100", "Ingredient 9926", "Ingredient 99356"]

############## S3FS GETTING MODEL ########################################

def get_s3fs():
  return s3fs.S3FileSystem(key=AWS_ACCESS_KEY_ID, secret=AWS_SECRET_ACCESS_KEY)

def s3_get_keras_model():
    s3fs = get_s3fs()

    # Fetch and save the zip file to the temporary directory
    s3fs.get(f"492bucket/model/model_test.h5", f"temp/model_test.h5")

    return keras.models.load_model(f"temp/model_test.h5")

############### FORMAT INPUTS #####################################

def format_gender(gender):
  X_gender = []

  if gender == "Female":
    X_gender = [1,0,0]

  elif gender == "Male":
    X_gender = [0,1,0]

  else:
    X_gender = [0,0,1]

  return X_gender

def format_arr(X_input, arr):
   X_ret = []
   index = arr.index(X_input)

   for i in range(len(arr)):

    if i is index:
      X_ret.append(1)

    else:
      X_ret.append(0)

   return X_ret

def format_symptoms(symp):
  indexes = []
  symp_split = symp.split(', ')

  for x in symp_split:
    if(x in symptom_arr):
      indexes.append(symptom_arr.index(x))

  X_symptoms = []

  for i in range(len(symptom_arr)):
    if i in indexes:
      X_symptoms.append(1)

    else:
      X_symptoms.append(0)

  return X_symptoms

def format_inputs(inputs):
  X = []
  gender = inputs['gender']
  dob = inputs['dob']
  symptoms = inputs['symptoms']
  state = inputs['state']
  skin_tone = inputs['skin_tone']
  split = dob.split('-')

  X_year = [int(split[0])]
  X_gender = format_gender(gender)
  X_state = format_arr(state, state_arr)
  X_skin = format_arr(skin_tone, skin_arr)
  X_symptoms = format_symptoms(symptoms)

  X = X_year + X_gender + X_skin + X_symptoms

  return X

############## OUTPUT FORMAT ##############################

def format_outputs(predictions, threshold):
  all_ret = []
  temp_arr = np.array(predictions)
  temp = np.where(temp_arr > threshold) 
  index = temp[1][:]

  for x in index:
    all_ret.append(allergy_arr[x])

  string_ret = ', '.join(all_ret)

  return string_ret

################## MODEL FUNCTION ############################
def main_model_funtion(json_input):
  # format inputs
  mi = format_inputs(json_input)

  # reshaped
  reshaped = np.array(mi).reshape(1,72)

  # get model
  loaded_model = s3_get_keras_model()

  # prediction
  prediction = loaded_model.predict(reshaped)
  print(prediction)

  # format outputs
  output = format_outputs(prediction, .5)
  
  # return output
  return output

test = {
  "gender" : "Male",
  "dob" : "2024-02-13",
  "skin_tone" : "Dark",
  "symptoms" : "Dry Lips",
  "state" : "IA"
}

if __name__ == "__main__":
    # Extract command line arguments
    param1 = sys.argv[1]
    
    # parse param
    json_ready = param1.split(";")
    
    # check size
    if (len(json_ready) != 6):
      print(f'NOT GOOD len: {len(json_ready)} | {json_ready}')
      exit(0)
    
    # get input
    input = {
      "gender" : json_ready[0],
      "dob" : json_ready[1],
      "skin_tone" : json_ready[2],
      "symptoms" : json_ready[3],
      "state" : json_ready[4]
    }
    
    # Call your Python function with the parameters
    result = main_model_funtion(input)
    print({result})