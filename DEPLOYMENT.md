# Automated Deployment Instructions

This document outlines the steps required to set up the automated deployment for the Goated Prompts website. The site is built using a GitHub Action that fetches data directly from a Google Sheet, generates the necessary CSV and HTML files, and commits them to the repository.

## Overview

The process works as follows:
1. Data is updated in the source Google Sheet.
2. A GitHub Action runs automatically on a push to the `main` branch or can be triggered manually.
3. The Action authenticates with the Google Sheets API using a secure Service Account.
4. It fetches the latest data, overwrites the `.csv` files in the repository.
5. It rebuilds the `.html` files from the new CSVs.
6. It commits the updated `.csv` and `.html` files back to the repository.

## Setup Instructions

To make this work, you need to configure the necessary credentials and secrets.

### 1. Set up Google Cloud and Service Account

1.  **Go to the Google Cloud Console:** [console.cloud.google.com](https://console.cloud.google.com)
2.  **Create a new project** (or select an existing one).
3.  **Enable APIs:** In the project's dashboard, search for and enable the **Google Sheets API** and **Google Drive API**.
4.  **Create a Service Account:**
    *   Navigate to **IAM & Admin** > **Service Accounts**.
    *   Click **+ CREATE SERVICE ACCOUNT**.
    *   Give it a name (e.g., `github-actions-sheets-reader`) and a description, then click **CREATE AND CONTINUE**.
    *   For permissions, grant the **Viewer** role, then click **CONTINUE**.
    *   Click **DONE**.
5.  **Generate JSON Key:**
    *   Find the service account you just created, click the three-dot menu under **Actions**, and select **Manage keys**.
    *   Click **ADD KEY** > **Create new key**.
    *   Choose **JSON** as the key type and click **CREATE**. A `.json` file will be downloaded. **Keep this file secure and do not commit it to the repository.**

### 2. Share Your Google Sheet

1.  **Find your Service Account's email:** Open the downloaded `.json` key file. You will see a field called `"client_email"`. It will look something like `...gserviceaccount.com`.
2.  **Share the sheet:** Open your Google Sheet, click the **Share** button in the top right, and paste the `client_email` address. Ensure it has **Viewer** access, then save the changes.

### 3. Add Secrets to GitHub

1.  **Go to your repository settings** on GitHub (`https://github.com/gongahkia/goated-prompts/settings`).
2.  Navigate to **Secrets and variables** > **Actions** in the left sidebar.
3.  Click the **New repository secret** button for each of the following secrets:
    *   **Name:** `GCP_SA_KEY`
        *   **Value:** Open the downloaded `.json` key file with a text editor, copy its entire contents, and paste them into the value field.
    *   **Name:** `SHEET_ID`
        *   **Value:** This is the long string of characters in the URL of your Google Sheet. For example, if the URL is `https://docs.google.com/spreadsheets/d/12345abcde_FGHIJKLMNOP/edit`, the ID is `12345abcde_FGHIJKLMNOP`.

Once these steps are completed, the GitHub Action will be fully configured to automate site updates.
