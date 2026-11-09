import os
import re
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

# Scope setup for Google Sheets & Drive API
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

# Path configurations
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CREDENTIALS_PATH = os.path.join(BASE_DIR, "backend", "service_account.json")
LOG_FILE_PATH = os.path.join(BASE_DIR, "firestore-debug.log")

# Google Sheet Configuration (Replace with your actual Sheet ID or Name)
SPREADSHEET_NAME = "Looker_Telemetry_Data"
WORKSHEET_NAME = "Firestore_Logs"

def authenticate_gspread():
    """Authenticates using the Service Account JSON key."""
    credentials = Credentials.from_service_account_file(
        CREDENTIALS_PATH, scopes=SCOPES
    )
    client = gspread.authorize(credentials)
    return client

def parse_firestore_log(file_path):
    """Parses log lines from firestore-debug.log into structured data."""
    parsed_rows = []
    if not os.path.exists(file_path):
        print(f"Log file not found at {file_path}")
        return parsed_rows
    # Sample log regex pattern for standard Firestore debug outputs
    log_pattern = re.compile(
        r'^(?P<timestamp>\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)\s+\[(?P<level>\w+)\]\s+(?P<message>.*)$'
    )
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            match = log_pattern.match(line)
            if match:
                data = match.groupdict()
                parsed_rows.append([
                    data['timestamp'],
                    data['level'].upper(),
                    data['message'],
                    "firestore-debug.log"
                ])
            else:
                # Catch unstructured fallback log entries
                parsed_rows.append([
                    datetime.utcnow().isoformat() + "Z",
                    "INFO",
                    line,
                    "firestore-debug.log"
                ])
    return parsed_rows

def update_google_sheet(rows):
    """Overwrites or appends parsed log data in Google Sheets."""
    client = authenticate_gspread()
    try:
        spreadsheet = client.open(SPREADSHEET_NAME)
    except gspread.SpreadsheetNotFound:
        # Create sheet if it doesn't exist
        spreadsheet = client.create(SPREADSHEET_NAME)
        print(f"Created new spreadsheet: {SPREADSHEET_NAME}")
    try:
        worksheet = spreadsheet.worksheet(WORKSHEET_NAME)
    except gspread.WorksheetNotFound:
        worksheet = spreadsheet.add_worksheet(title=WORKSHEET_NAME, rows=100, cols=10)
    # Define headers
    headers = ["Timestamp", "Log Level", "Message", "Source File"]
    # Clear current contents and populate headers + rows
    worksheet.clear()
    worksheet.append_row(headers)
    if rows:
        worksheet.append_rows(rows)
        print(f"Successfully uploaded {len(rows)} rows to '{WORKSHEET_NAME}'.")
    else:
        print("No log rows found to upload.")

if __name__ == "__main__":
    print("Parsing logs...")
    log_data = parse_firestore_log(LOG_FILE_PATH)
    print("Uploading to Google Sheets...")
    update_google_sheet(log_data)
