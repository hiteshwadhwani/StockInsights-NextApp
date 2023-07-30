import os
from dotenv import load_dotenv
import pymongo
import json
from datetime import datetime

DATABASE_NAME='STOCKINSIGHTS'
COLLECTION_NAME='announcements'

load_dotenv()
url = os.getenv("MONGODB_URL")

myclient = pymongo.MongoClient(url)
print(myclient)

db = myclient[DATABASE_NAME]
col = db[COLLECTION_NAME]


def dumpDataInMongoDb():
    # read json file

    with open('./bse_announcements_data.json', 'r', encoding='utf-8') as file:
        json_file  = json.loads(file.read())
    updatedJson = convertToDateTime(json_file)
    col.insert_many(list(updatedJson))

def convertToDateTime(jsonData):
    for item in jsonData:
        if 'NEWS_DT' in item and is_valid_iso_string(item['NEWS_DT']):
            item['NEWS_DT'] = datetime.fromisoformat(item['NEWS_DT'])
        else:
            del item
    return jsonData

def is_valid_iso_string(s):
    try:
        datetime.fromisoformat(s)
        return True
    except ValueError:
        return False
        
dumpDataInMongoDb()