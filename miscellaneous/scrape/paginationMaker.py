from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait

# Set up the Selenium WebDriver
driver = webdriver.Chrome()  # You can use other browsers by downloading the corresponding driver

# Navigate to the website
url = "https://sa.ucla.edu/ro/public/soc/Results?SubjectAreaName=Computer+Science+(COM+SCI)&t=24W&sBy=subject&subj=COM+SCI&catlg=&cls_no=&undefined=Go&btnIsInIndex=btn_inIndex"  # Replace with the actual URL
driver.get(url)


wait = WebDriverWait(driver, 10)
print(driver.page_source)



# Locate and click the "Next" button
next_button = driver.find_element(By.XPATH, "//button[@class='paginateArrow']")  # Replace with the actual XPath or other locator
next_button.click()

# After clicking, you can then use BeautifulSoup to parse the updated HTML
# soup = BeautifulSoup(driver.page_source, 'html.parser')
# ... your BeautifulSoup code ...

# Close the browser when you're done
driver.quit()