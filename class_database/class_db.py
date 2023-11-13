from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ucla_classes.db'
db = SQLAlchemy(app)

# SQLAlchemy model class for Class
class Class(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name_description = db.Column(db.String(255))
    name = db.Column(db.String(255))

# Create the database tables
db.create_all()

# API endpoint to get classes
@app.route('/api/classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    class_list = [{'id': c.id, 'name_description': c.name_description, 'name': c.name} for c in classes]
    return jsonify({'classes': class_list})

if __name__ == '__main__':
    app.run(debug=True)
