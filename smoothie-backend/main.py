from flask import Flask
import psycopg2
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

def create_connection():
    connection = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return connection


@app.route('/', methods=['GET'])
def get_home_info():
    try:
        connection = create_connection()
        cursor = connection.cursor()
        cursor.close()
        connection.close()
        return str('hello backend')
    except psycopg2.Error as error:
        return str(error)

if __name__ == '__main__':
    app.run(port=5000, debug=True)