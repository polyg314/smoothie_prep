from flask import Flask, request, jsonify
import psycopg2
from dotenv import load_dotenv
import os
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests
import queries as q
from datetime import datetime, timedelta
import jwt


app = Flask(__name__)
CORS(app)
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


@app.route('/check-user', methods=['POST'])
def check_user():
    print(f'CHECK USER---------')
    try:
        req_obj = request.json
        encoded_jwt = str(request.authorization)
        ## make sure jwt hasnt expired
        token_exp = False
        token = encoded_jwt.replace('Bearer $', '')
        if(len(token) > 10): 
            try:
                # Decode JWT
                decoded_jwt = jwt.decode(token, os.getenv('BE_SECRET'), algorithms=["HS256"])
                expires_timestamp = float(decoded_jwt["expires"])  # Convert string to float
                expires_datetime = datetime.fromtimestamp(expires_timestamp)
                if datetime.now() >= expires_datetime:
                    token_exp = True
            except Exception as ex:
                ## decoding erorr
                print("Decode error")
        idinfo = id_token.verify_oauth2_token(req_obj["token"], requests.Request(), audience=None)
        data_dict = {
            'google_id': idinfo['sub'],
            'first_name': idinfo['given_name'],
            'last_name': idinfo['family_name'],
            'email': idinfo['email']
        }
        expires_timestamp = float(idinfo["exp"])  # Convert string to float
        expires_datetime = datetime.fromtimestamp(expires_timestamp)
        # Check if the google token has expired AND JWT has expired
        if datetime.now() >= expires_datetime and token_exp:
            print("Tokens have expired")
            return {'Success': False,
                'Exception': 'Token has expired'}
        conn = create_connection()
        data = q.read_user_by_google_id(conn, data_dict['google_id'])['Data']
        expires = str(datetime.timestamp(datetime.now() + timedelta(seconds=14)))
        try:
            newjwt = jwt.encode({"google_id": idinfo['sub'], "expires": expires}, os.getenv('BE_SECRET'), algorithm="HS256")
            decoded_jwt = jwt.decode(newjwt, os.getenv('BE_SECRET'), algorithms=["HS256"])
            print(decoded_jwt)
        except jwt.DecodeError as ex:
            print(f"JWT Decode Error: {str(ex)}")
        except Exception as ex:
            print(f"An error occurred: {str(ex)}")
        if len(data) == 0:
            q_data = q.create_user(conn, data_dict)
            if q_data['Success'] is True:
                data = {
                    'Success': True,
                    'user_id': q_data['Data'],
                    'jwt': newjwt,
                }
                return jsonify(data)
            else:
                data = q_data['Data']
                data["Success"] = False
                return jsonify(data)
        else:
            data = {
                'Success': True,
                'user_id': data[0]['user_id'],
                'jwt': newjwt,
            }
        return jsonify(data)
    except Exception as ex:
        return {'Success': False,
                'Exception': ex}
        



if __name__ == '__main__':
    app.run(port=5000, debug=True)