import requests
from bs4 import BeautifulSoup
import json

# Define the URL of the class schedule page
def get_class_codes():
    url = 'https://registrar.ucla.edu/faculty-staff/courses-and-programs/department-and-subject-area-codes'
    response = requests.get(url)
    html_content = response.content

    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    rows = soup.select('table.js-sortable tbody tr')

    subject_areas = []
    abbreviations = []
    for row in rows:
        columns = row.find_all('td')
        subject_name = columns[2].get_text(strip=True)
        subject_abbreviation = columns[3].get_text(strip=True)
        subject_areas.append(subject_name)
        abbreviations.append(subject_abbreviation)



    return subject_areas, abbreviations