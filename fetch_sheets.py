import csv
import gspread
import os
import sys
import json
from google.oauth2.service_account import Credentials

def fetch_sheet_data(credentials_json_str, sheet_id, sheet_name, output_csv_path):
    try:
        credentials_json = json.loads(credentials_json_str)
        
        scopes = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive'
        ]
        
        creds = Credentials.from_service_account_info(credentials_json, scopes=scopes)
        client = gspread.authorize(creds)

        spreadsheet = client.open_by_key(sheet_id)
        worksheet = spreadsheet.worksheet(sheet_name)
        
        data = worksheet.get_all_values()
        
        with open(output_csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerows(data)
            
        print(f"Successfully fetched '{sheet_name}' and saved to '{output_csv_path}'")

    except Exception as e:
        print(f"Error fetching sheet data for '{sheet_name}': {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python fetch_sheets.py <sheet_name> <output_csv_path> <sheet_id>", file=sys.stderr)
        sys.exit(1)

    credentials_json_str = os.getenv('GCP_SA_KEY')
    if not credentials_json_str:
        print("Error: GCP_SA_KEY environment variable not set.", file=sys.stderr)
        sys.exit(1)
        
    sheet_name = sys.argv[1]
    output_csv_path = sys.argv[2]
    sheet_id = sys.argv[3]

    fetch_sheet_data(credentials_json_str, sheet_id, sheet_name, output_csv_path)
