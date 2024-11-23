import logging

import s3Client
import dynamoDBClient

def sync_handler(event, context):
    files = s3Client.list()
    for file in files:
        try:
            logging.info("Processing: " + file)
            entries = s3Client.readJson(file)
            dynamoDBClient.writeDataset(entries)
            s3Client.delete(file)
        except:
            logging.exception("Failed to read/write " + file)
