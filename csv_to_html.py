import csv
import sys
import html

def csv_to_html(csv_file_path, html_file_path, title):
    with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
        reader = csv.reader(csv_file)
        try:
            header = next(reader)
        except StopIteration:
            header = [] # Handle empty file
        rows = list(reader)

    # Find the index of the 'Prompt' column
    prompt_column_index = -1
    if 'Prompt' in header:
        prompt_column_index = header.index('Prompt')

    with open(html_file_path, 'w', encoding='utf-8') as html_file:
        html_file.write('<!DOCTYPE html>')
        html_file.write('<html lang="en">')
        html_file.write('<head>')
        html_file.write('    <meta charset="UTF-8">')
        html_file.write('    <meta name="viewport" content="width=device-width, initial-scale=1.0">')
        html_file.write(f'<title>{title}</title>')
        html_file.write('    <link rel="stylesheet" href="../style.css">')
        html_file.write('</head>')
        html_file.write('<body>')
        html_file.write('    <header>')
        html_file.write(f'<h1><a href="../index.html">Goated Prompts</a> / {title}</h1>')
        html_file.write('        <button id="theme-switcher">Theme</button>')
        html_file.write('    </header>')
        html_file.write('    <main>')
        html_file.write('        <table>')
        html_file.write('            <thead>')
        html_file.write('                <tr>')
        for col in header:
            html_file.write(f'                    <th>{html.escape(col)}</th>')
        html_file.write('                </tr>')
        html_file.write('            </thead>')
        html_file.write('            <tbody>')
        for row in rows:
            if not any(field.strip() for field in row):
                continue
            html_file.write('                <tr>')
            for i, col in enumerate(row):
                if i == prompt_column_index:
                    cell_content = f'<pre><code>{html.escape(col)}</code></pre>'
                else:
                    cell_content = html.escape(col).replace('\n', '<br>')
                html_file.write(f'                    <td data-label="{html.escape(header[i])}">{cell_content}</td>')
            html_file.write('                </tr>')
        html_file.write('            </tbody>')
        html_file.write('        </table>')
        html_file.write('    </main>')
        html_file.write('    <footer>')
        html_file.write('        Made by <a href="https://gabrielongzm.com" target="_blank">Gabriel Ong</a>.')
        html_file.write('        Source: <a href="https://github.com/gongahkia/goated-prompts" target="_blank">gongahkia/goated-prompts</a>')
        html_file.write('    </footer>')
        html_file.write('    <script src="../script.js"></script>')
        html_file.write('</body>')
        html_file.write('</html>')

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python csv_to_html.py <csv_file> <html_file> <title>")
        sys.exit(1)
    csv_to_html(sys.argv[1], sys.argv[2], sys.argv[3])
