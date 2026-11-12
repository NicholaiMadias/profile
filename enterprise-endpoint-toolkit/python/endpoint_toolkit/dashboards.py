import pandas as pd
import plotly.express as px

def compliance_dashboard(csv_file):
    df = pd.read_csv(csv_file)
    if "Status" not in df.columns:
        raise ValueError("CSV must include Status column")
    return px.pie(df, names="Status", title="Endpoint inventory status")
