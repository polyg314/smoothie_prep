import pytz
import datetime as dt

def add_headers(cur, data):
    column_names = [desc[0] for desc in cur.description]
    vals = []
    for val in data:
        val = {column_names[i]: val[i] for i in range(len(column_names))}
        vals.append(val)
    return vals


def time_now():
    time_format = "%Y-%m-%d %H:%M:%S"
    time = dt.datetime.now(pytz.timezone('UTC')).strftime(time_format)
    return time
