
import helper_functions as hf

def read_user_by_google_id(conn, google_id):
    """Query user by google id
    """
    try:
        sql = """SELECT
                    usr.user_id,
                    usr.google_id,
                    usr.first_name,
                    usr.last_name,
                    usr.email,
                    usr.status,
                    usr.time_updated,
                    usr.time_created
                FROM
                    "user" usr
                WHERE
                    google_id=%s AND usr.status ='ACTIVE'
                GROUP BY 
                    usr.user_id,
                    usr.google_id,
                    usr.first_name,
                    usr.last_name,
                    usr.email,
                    usr.status,
                    usr.time_updated,
                    usr.time_created
                """

        cur = conn.cursor()
        cur.execute(sql, (google_id,))
        data = cur.fetchall()
        conn.commit()
        return {'Success': True,
                'Data': hf.add_headers(cur, data)}

    except Exception as ex:
        return {'Success': False,
                'Exception': ex, 
                'Data': []}
    

def create_user(conn, user_info):
    """Create user"""
    try:
        sql = f"""INSERT INTO "user"(
            google_id,
            first_name,
            last_name,
            email,
            status,
            time_updated,
            time_created
        )
        VALUES (
            %(google_id)s,
            %(first_name)s,
            %(last_name)s,
            %(email)s,
            'ACTIVE',
            '{hf.time_now()}',
            '{hf.time_now()}'
        )
        RETURNING user_id;
        """
        cur = conn.cursor()
        cur.execute(sql, user_info)
        user_id = cur.fetchone()[0]
        conn.commit()

        return {'Success': True, 'Data': user_id}

    except Exception as ex:
        conn.rollback()  # Rollback the transaction
        print(f"Exception: {ex}")  # Log the exception for debugging
        return {'Success': False, 'Exception': str(ex), 'Data': []}
