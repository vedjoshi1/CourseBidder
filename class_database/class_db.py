import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
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
                existing_class = Class.query.get((class_info['id'], department))
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
    app.run(debug=False)
