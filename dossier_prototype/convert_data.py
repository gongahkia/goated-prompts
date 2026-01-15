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
                topic = row.get('Purpose', row.get('Model', 'Untitled')).strip()
                if not topic:
                     topic = row.get('Model', 'Untitled')
                     
                prompts.append({
                    "Topic": topic,
                    "Prompt": row.get('Prompt', ''),
                    "References": row.get('References', ''),
                    "Model": row.get('Model', ''),
                    "Remarks": row.get('Remarks', ''),
                    "Tier": row.get('Tier', ''),
                    "Purpose": row.get('Purpose', '') 
                })
    data[category] = prompts

# Serialize data to JSON
json_data = json.dumps(data, indent=4)

# Read template
with open('dossier_prototype/script_template.js', 'r', encoding='utf-8') as f:
    template = f.read()

# Replace placeholder
final_script = template.replace('__DATA_PLACEHOLDER__', json_data)

# Write final script
with open('dossier_prototype/script.js', 'w', encoding='utf-8') as f:
    f.write(final_script)

print("Successfully regenerated dossier_prototype/script.js")
