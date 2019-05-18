import boto3
import logging
import json

client = boto3.client('s3')
bucketName = 'obd2-data'
baseKey = 'cache'

def list():
    retList = []
    response = client.list_objects(Bucket=bucketName, Prefix='cache/OBD_')
    if 'Contents' in response:
        for content in response['Contents']:
            retList.append(content['Key'])
    return retList

def readJson(key):
    entries = []
    response = client.get_object(Bucket=bucketName, Key=key)
    body = response['Body'].read().decode('utf-8')
    for entryJson in body.splitlines():
        try:
            entry = json.loads(entryJson)
            entries.append(entry)
        except Exception:
            logging.exception("Could not read a line in " + key)

    return entries

def delete(key):
    client.delete_object(Bucket=bucketName, Key=key)
