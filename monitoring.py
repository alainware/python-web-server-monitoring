# Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import tree
from sklearn.model_selection import train_test_split
# Read the file
df = pd.read_csv("system_info_with_warning.csv")
# Split the dataset into X and y (inputs and target)
inputs = df.drop('failure_warning', axis='columns')
target = df['failure_warning']
# Split the model into train and test
X_train, X_test, y_train, y_test = train_test_split(inputs, target, test_size=0.2)
# Create the decision tree
# max_depth is used to prevent overfitting
model = tree.DecisionTreeClassifier(min_samples_split=2, max_depth=3)
# Train the model
model.fit(X_train, y_train)
# Get model accuracy
model.score(X_test, y_test)
prediction = model.predict([[542,112535.76,10,644969,794583,230475291,1138029,8,4,7303159808,7769489408,57.5,500068036608,15324188672,8468860928,64.4,5157158912,1285292032,80.0]])
print(prediction[0])