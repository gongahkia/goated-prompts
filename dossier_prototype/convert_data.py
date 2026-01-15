import csv
import json
import os

csv_files = {
    "General": "cache/goated prompts - General.csv",
    "Stocks": "cache/goated prompts - Stocks.csv",
    "Studying": "cache/goated prompts - Studying.csv"
}

data = {}

for category, filepath in csv_files.items():
    prompts = []
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Map CSV fields to Prototype fields
                # Use 'Purpose' as Topic if available, else 'Model', else generic
                topic = row.get('Purpose', row.get('Model', 'Untitled'))
                if not topic.strip():
                     topic = row.get('Model', 'Untitled')
                     
                prompts.append({
                    "Topic": topic,
                    "Prompt": row.get('Prompt', ''),
                    "References": row.get('References', '')
                })
    data[category] = prompts

# Output just the JSON object
print(json.dumps(data, indent=4))
