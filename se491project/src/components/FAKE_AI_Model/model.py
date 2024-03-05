"""
Column| Description| Feature Type
------------|--------------------|----------------------
Birth Year | Year born | Numerical
Gender | (1 = male; 0 = female) | Categorical
Skin Tone | Chest pain type (0, 1, 2, 3, 4) | Categorical

City | ??? | perhaps categorical
State | ??? | perhaps categorical
Country | ??? | perhaps categorical

Target | SFM ID of Allergen | Target
"""

"""
## Setup
"""
import os

# TensorFlow is the only backend that supports string inputs.
os.environ["KERAS_BACKEND"] = "tensorflow"

import tensorflow as tf
import pandas as pd
import keras
from keras import layers

# Access data

file_url = "se491project\src\components\FAKE_AI_Model\Data\patients.csv"
dataframe = pd.read_csv(file_url)

# shape and show the data

print(dataframe.shape)
print(dataframe.head())

val_dataframe = dataframe.sample(frac=0.2, random_state=1337)
train_dataframe = dataframe.drop(val_dataframe.index)

print(
    f"Using {len(train_dataframe)} samples for training "
    f"and {len(val_dataframe)} for validation"
)

"""
Let's generate `tf.data.Dataset` objects for each dataframe:
"""

def dataframe_to_dataset(dataframe):
    dataframe = dataframe.copy()
    labels = dataframe.pop("SFM Id")
    
    ds = tf.data.Dataset.from_tensor_slices((dict(dataframe), labels))
    ds = ds.shuffle(buffer_size=len(dataframe))
    return ds


train_ds = dataframe_to_dataset(train_dataframe)
val_ds = dataframe_to_dataset(val_dataframe)


for x, y in train_ds.take(1):
    print("Input:", x)
    print("Target:", y)

train_ds = train_ds.batch(32)
val_ds = val_ds.batch(32)

"""
## Feature preprocessing with Keras layers

Don't delete this comment (IMPORTANT!!)

The following features are categorical features encoded as integers:

- `sex`
- `cp`
- `fbs`
- `restecg`
- `exang`
- `ca`

We will encode these features using **one-hot encoding**. We have two options
here:

 - Use `CategoryEncoding()`, which requires knowing the range of input values
 and will error on input outside the range.
 - Use `IntegerLookup()` which will build a lookup table for inputs and reserve
 an output index for unkown input values.

For this example, we want a simple solution that will handle out of range inputs
at inference, so we will use `IntegerLookup()`.

We also have a categorical feature encoded as a string: `thal`. We will create an
index of all possible features and encode output using the `StringLookup()` layer.

Finally, the following feature are continuous numerical features:

- `age`
- `trestbps`
- `chol`
- `thalach`
- `oldpeak`
- `slope`

For each of these features, we will use a `Normalization()` layer to make sure the mean
of each feature is 0 and its standard deviation is 1.

Below, we define 3 utility functions to do the operations:

- `encode_numerical_feature` to apply featurewise normalization to numerical features.
- `encode_string_categorical_feature` to first turn string inputs into integer indices,
then one-hot encode these integer indices.
- `encode_integer_categorical_feature` to one-hot encode integer categorical features.
"""


def encode_numerical_feature(feature, name, dataset):
    # Create a Normalization layer for our feature
    normalizer = layers.Normalization()

    # Prepare a Dataset that only yields our feature
    feature_ds = dataset.map(lambda x, y: x[name])
    feature_ds = feature_ds.map(lambda x: tf.expand_dims(x, -1))

    # Learn the statistics of the data
    normalizer.adapt(feature_ds)

    # Normalize the input feature
    encoded_feature = normalizer(feature)
    
    return encoded_feature


def encode_categorical_feature(feature, name, dataset, is_string):
    lookup_class = layers.StringLookup if is_string else layers.IntegerLookup
    # Create a lookup layer which will turn strings into integer indices
    lookup = lookup_class(output_mode="binary")

    # Prepare a Dataset that only yields our feature
    feature_ds = dataset.map(lambda x, y: x[name])
    feature_ds = feature_ds.map(lambda x: tf.expand_dims(x, -1))

    # Learn the set of possible string values and assign them a fixed integer index
    lookup.adapt(feature_ds)

    # Turn the string input into integer indices
    encoded_feature = lookup(feature)
        
    return encoded_feature

# Build the model

# Categorical features encoded as integers
#sex = keras.Input(shape=(1,), name="sex", dtype="int64")

# Categorical feature encoded as string
gender = keras.Input(shape=(1,), name="Gender", dtype="string")
skinTone = keras.Input(shape=(1,), name="SkinTone", dtype="string")

# Numerical features
birthYear = keras.Input(shape=(1,), name="BirthYear")

all_inputs = [
    gender,
    birthYear,
    skinTone
]

# Integer categorical features
gender_encoded = encode_categorical_feature(gender, "Gender", train_ds, True)
skinTone_encoded = encode_categorical_feature(skinTone, "SkinTone", train_ds, True)

# String categorical features
#thal_encoded = encode_categorical_feature(thal, "thal", train_ds, True)

# Numerical features
birthYear_encoded = encode_numerical_feature(birthYear, "BirthYear", train_ds)

all_features = layers.concatenate(
    [
        gender_encoded,
        birthYear_encoded,
        skinTone_encoded,
    ]
)

x = layers.Dense(32, activation="relu")(all_features)
x = layers.Dropout(0.2)(x)
output = layers.Dense(1, activation="sigmoid")(x)

model = keras.Model(all_inputs, output)
model.compile("adam", "binary_crossentropy", metrics=["accuracy"])

"""
## Train the model
"""

model.fit(train_ds, epochs=50, validation_data=val_ds)

sample = {
    "Gender": "M",
    "BirthYear": 2000,
    "SkinTone": "medium",
}

input_dict = {name: tf.convert_to_tensor([value]) for name, value in sample.items()}
predictions = model.predict(input_dict)

print(
    f"This particular patient might be allergic to allergin ID: {predictions[0][0]} "
)