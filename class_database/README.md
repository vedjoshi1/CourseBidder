# UCLA Classes API

## Overview

This Flask application provides a simple API for accessing UCLA class information. It includes two main features:

1. **Get All Classes:**
   - **URL:** [http://127.0.0.1:5000/api/classes](http://127.0.0.1:5000/api/classes)
   - **Method:** GET
   - **Description:** Retrieves information about all classes in the database.

2. **Search Classes:**
   - **URL:** [http://127.0.0.1:5000/api/search](http://127.0.0.1:5000/api/search)
   - **Method:** GET
   - **Parameters:**
     - `class_id` (optional): Search for a specific class by ID.
     - `department` (required): Search for classes in a specific department.
   - **Description:** Allows searching for classes based on class ID, department, or both. Department is a required parameter.

## How to Test

### Get All Classes:

1. Open your browser or a tool like curl or Postman.
2. Visit the following URL: [http://127.0.0.1:5000/api/classes](http://127.0.0.1:5000/api/classes).
3. Method: GET.
4. Receive a JSON response with information about all classes.

### Search Classes:

1. Open your browser or a tool like curl or Postman.
2. Visit the following URL for searching by department: [http://127.0.0.1:5000/api/search?department=<DEPARTMENT_NAME>](http://127.0.0.1:5000/api/search?department=<DEPARTMENT_NAME>).
   - Replace `<DEPARTMENT_NAME>` with the desired department name.
3. Method: GET.
4. Receive a JSON response with information about classes in the specified department.
    Some examples of usage include: 
        http://127.0.0.1:5000/api/search?department=COM%20SCI
        http://127.0.0.1:5000/api/search?department=COM%20SCI&class_id=118



5. Visit the following URL for searching by class ID and department: [http://127.0.0.1:5000/api/search?class_id=<CLASS_ID>&department=<DEPARTMENT_NAME>](http://127.0.0.1:5000/api/search?class_id=<CLASS_ID>&department=<DEPARTMENT_NAME>).
   - Replace `<CLASS_ID>` with the desired class ID and `<DEPARTMENT_NAME>` with the desired department name.
6. Method: GET.
7. Receive a JSON response with information about the specified class in the specified department.

