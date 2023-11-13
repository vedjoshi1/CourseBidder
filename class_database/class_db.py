import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS extension
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ucla_classes.db'
db = SQLAlchemy(app)

# SQLAlchemy model class for Class
class Class(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    department = db.Column(db.String(50), primary_key=True)
    name_description = db.Column(db.String(255))
    name = db.Column(db.String(255))

# API endpoint to get classes
@app.route('/api/classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    class_list = [{'id': c.id, 'department': c.department, 'name_description': c.name_description, 'name': c.name} for c in classes]
    return jsonify({'classes': class_list})



@app.route('/api/search', methods=['GET'])
def searchClasses():
    class_id_query = request.args.get('class_id')
    
    # Get the search query for department from the request parameters (required)
    department_query = request.args.get('department')

    # If no department query is provided, return an error response
    if not department_query:
        return jsonify({'error': 'Please provide a department for the search'}), 400

    # Set up the filters
    department_filter = Class.department.ilike(f'%{department_query}%')

    if class_id_query:
        class_id_filter = Class.id.ilike(f'%{class_id_query}%')
        results = Class.query.filter(class_id_filter, department_filter).all()
    else:
        results = Class.query.filter(department_filter).all()

    # Format the results as a list of dictionaries
    search_results = [{'id': result.id, 'department': result.department, 'name_description': result.name_description, 'name': result.name} for result in results]

    # Return the search results in JSON format
    return jsonify({'search_results': search_results})











if __name__ == '__main__':
    # Move database-related code inside the application context
    with app.app_context():
        # Clear existing data and create tables
        db.drop_all()
        db.create_all()

        # Load JSON data using an absolute path
        json_path = os.path.join(os.path.dirname(__file__), '../scrape/ucla_classes.json')
        with open(json_path, 'r') as file:
            data = json.load(file)

        # Insert or update data into the database
        for department, classes in data.items():
            for class_info in classes:
                existing_class = db.session.query(Class).get((class_info['id'], department))
                if existing_class:
                    # Update existing record
                    existing_class.name_description = class_info['name_description']
                    existing_class.name = class_info['name']
                else:
                    # Insert new record
                    new_class = Class(
                        id=class_info['id'],
                        department=department,
                        name_description=class_info['name_description'],
                        name=class_info['name']
                    )
                    db.session.add(new_class)

        # Commit changes to the database
        db.session.commit()

    # Run the application
    app.run(debug=True)
