# This is a sample Python script.
import requests
from bs4 import BeautifulSoup
import json
from getallClassCodes import get_class_codes


def generate_ucla_url(subject_area_name, subject):
    base_url = 'https://sa.ucla.edu/ro/public/soc/Results'
    params = {
        'SubjectAreaName': subject_area_name,
        't': '24W',
        'sBy': 'subject',
        'subj': subject,
        'catlg': '',
        'cls_no': '',
        'undefined': 'Go',
        'btnIsInIndex': 'btn_inIndex'
    }

    # Construct the URL with parameters
    url = f"{base_url}?{'&'.join(f'{key}={value}' for key, value in params.items())}"

    return url


# Define the URL of the class schedule page


#Automate this with a list of all of the Variable and full-named strings


#do pagination








def pull_url(url):

# Send a request to the URL and get the content
    response = requests.get(url)
    html_content = response.content

    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the relevant elements containing class information
    class_elements = soup.find_all('div', class_='row-fluid class-title')

    # Define a list to store class data
    classes = []

    # Iterate through class elements and extract information
    for class_element in class_elements:

        h3_element = class_element.find('h3', class_='head')

        # Find the button element inside the h3 element
        button_element = h3_element.find('button')

        # Access the text inside the button
        title = button_element.next

        # Check if the button_element is not there

        if not button_element:
            print("Button element not found in the current class_element.")
            print("Class Element HTML:", class_element.prettify())

        # Split the string at the hyphen
        split_strings = title.split('-')

        # Strip leading and trailing whitespace from each part
        result_strings = [part.strip() for part in split_strings]

        class_info = {
            'name_description': title,
            'id':result_strings[0],
            'name':result_strings[1]
        }
        classes.append(class_info)

    return (classes)


sAreas, abv = get_class_codes()


departments = {}
for i in range(0, len(abv)):
    sa = sAreas[i]
    ab = abv[i]
   # print(sa)
    print (ab)
    subject_area_name = sa + ' (' + ab + ')'
    subject = ab
    url = generate_ucla_url(sa, ab)

    pulledJSON = pull_url(url)
    departments[ab] = pulledJSON



with open('ucla_classes.json', 'w') as json_file:
    json.dump(departments, json_file, indent=4)

print('Scraping complete. Data saved to ucla_classes.json')

# Example usage:
