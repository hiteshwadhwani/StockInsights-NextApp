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
        if 'DT_TM' in item:
            item['DT_TM'] = datetime.fromisoformat(item['DT_TM'])
        if 'NEWS_DT' in item:
            item['NEWS_DT'] = datetime.fromisoformat(item['NEWS_DT'])
        if 'News_submission_dt' in item:
            item['News_submission_dt'] = datetime.fromisoformat(item['News_submission_dt'])
        if 'DissemDT' in item:
            item['DissemDT'] = datetime.fromisoformat(item['DissemDT'])
        if 'TimeDiff' in item:
            item['TimeDiff'] = datetime.strptime(item['TimeDiff'], '%H:%M:%S')
        return jsonData
        
dumpDataInMongoDb()