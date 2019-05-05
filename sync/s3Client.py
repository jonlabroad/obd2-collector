import boto3
import os
import logging

client = boto3.client('s3')
bucketName = 'obd2-data'
baseKey = 'cache'

def upload(files):
    for f in files:
        try:
            s3Name = os.path.basename(f)
            client.upload_file(f, bucketName, baseKey + '/' + s3Name)
            os.remove(f)
        except Exception:
            logging.exception('Error syncing ' + f)