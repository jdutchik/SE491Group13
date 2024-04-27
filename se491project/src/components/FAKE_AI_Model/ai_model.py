import s3fs
from tensorflow import keras
import numpy as np

# Set AWS credentials
AWS_ACCESS_KEY = 'AKIAQ3EGRKHNVFFYSONF'
AWS_SECRET_KEY = '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'

def get_s3fs():
  return s3fs.S3FileSystem(key=AWS_ACCESS_KEY, secret=AWS_SECRET_KEY)

def s3_get_keras_model():
    s3fs = get_s3fs()

    # Fetch and save the zip file to the temporary directory
    s3fs.get(f"492bucket/model/model_Final.h5", f"temp/model_Final.h5")

    return keras.models.load_model(f"temp/model_Final.h5")

input_data = np.array([[1946,    1,    0,    0,    0,    0,    0,    0,    0,    0,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    1,    0,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    1,
          1,    1,    0,    1,    0,    1,    0,    0,    0,    0,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    0,    1,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
          0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
          0,    0,    0,    0,    0,    0]])

loaded_model = s3_get_keras_model()

loaded_model.summary()
print(loaded_model.input_shape)

prediction = loaded_model.predict(input_data)

print("Prediction:", prediction)