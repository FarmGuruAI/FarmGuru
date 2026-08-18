"""
Precision Agriculture AI Pipeline
---------------------------------
Trains and exports machine learning models for:
1. Crop Recommendation (Classification)
2. Farm Analytics: Soil Health, Damage Risk, Water Need (Multi-Output Regression)
"""

import pandas as pd
import numpy as np
import joblib
import logging
import sys
from typing import Tuple
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

# Configure production-level logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

# Define core features required by the web application
FEATURES = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']


def engineer_targets(df: pd.DataFrame) -> pd.DataFrame:
    """
    Synthesizes real-world agronomic metrics based on raw environmental features.
    These act as truth labels for the regression model to train on.
    """
    # 1. Soil Health Score (%)
    df['Target_Soil_Health_Pct'] = df.apply(
        lambda row: max(10, min(100, 100 - (abs(6.5 - row['ph']) * 12))), axis=1
    )
    
    # 2. Damage / Dying Risk Ratio (%)
    def calc_damage(row):
        damage = 0
        if row['temperature'] > 32: damage += (row['temperature'] - 32) * 4.5
        if row['rainfall'] < 60: damage += (60 - row['rainfall']) * 0.8
        if row['ph'] < 5.0 or row['ph'] > 8.0: damage += 15
        return max(0, min(100, damage))
        
    df['Target_Damage_Ratio_Pct'] = df.apply(calc_damage, axis=1)
    
    # 3. Water / Irrigation Needed (mm)
    df['Target_Water_Needed_mm'] = df.apply(
        lambda row: max(0, (100 - row['rainfall']) + (row['temperature'] * 0.4)) if row['rainfall'] < 100 else 0.0, 
        axis=1
    )
    
    return df


def load_and_preprocess_data(filepath: str) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """Loads CSV, engineers targets, and splits into Features (X) and Targets (y)."""
    try:
        df = pd.read_csv(filepath)
        logging.info(f"Successfully loaded dataset with {len(df)} records.")
    except Exception as e:
        logging.error(f"Failed to load dataset: {e}")
        sys.exit(1)

    df = engineer_targets(df)

    X = df[FEATURES]
    y_class = df['label'] # Categorical target for Crop Recommender
    y_reg = df[['Target_Soil_Health_Pct', 'Target_Damage_Ratio_Pct', 'Target_Water_Needed_mm']] # Numerical targets

    return X, y_class, y_reg


def train_classifier(X_train: pd.DataFrame, y_train: pd.Series) -> Pipeline:
    """Trains the Crop Recommendation model using a robust Scikit-Learn pipeline."""
    logging.info("Training Crop Recommendation Classifier...")
    
    pipeline = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler()),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1))
    ])
    
    pipeline.fit(X_train, y_train)
    return pipeline


def train_regressor(X_train: pd.DataFrame, y_train: pd.DataFrame) -> Pipeline:
    """Trains the Analytics model for Soil Health, Damage, and Water requirement."""
    logging.info("Training Multi-Output Analytics Regressor...")
    
    pipeline = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler()),
        ('regressor', MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)))
    ])
    
    pipeline.fit(X_train, y_train)
    return pipeline


def main():
    """Main execution pipeline."""
    # Using the raw web URL so it never fails with a FileNotFoundError
    dataset_path = 'https://raw.githubusercontent.com/Gladiator07/Harvestify/master/Data-processed/crop_recommendation.csv'
    
    # 1. Load Data
    X, y_class, y_reg = load_and_preprocess_data(dataset_path)
    
    # 2. Split Data
    logging.info("Splitting dataset into training and testing sets...")
    X_train, X_test, y_class_train, y_class_test = train_test_split(
        X, y_class, test_size=0.2, random_state=42, stratify=y_class
    )
    
    _, _, y_reg_train, y_reg_test = train_test_split(
        X, y_reg, test_size=0.2, random_state=42
    )

    # 3. Train Models
    crop_pipeline = train_classifier(X_train, y_class_train)
    analytics_pipeline = train_regressor(X_train, y_reg_train)

    # 4. Evaluate Models
    crop_acc = crop_pipeline.score(X_test, y_class_test)
    analytics_r2 = analytics_pipeline.score(X_test, y_reg_test)
    
    logging.info(f"Crop Model Accuracy: {crop_acc * 100:.2f}%")
    logging.info(f"Analytics Model R2 Score: {analytics_r2:.4f}")

    # 5. Export Production Artifacts
    joblib.dump(crop_pipeline, 'crop_recommender.pkl')
    joblib.dump(analytics_pipeline, 'farm_analytics.pkl')
    logging.info("Pipeline execution complete. Models successfully exported as .pkl files.")


if __name__ == "__main__":
    main()
