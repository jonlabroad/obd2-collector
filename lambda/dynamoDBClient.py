import boto3

client = boto3.client('dynamodb')
tableName = "Obd2"

stringTypes = ['AIR_STATUS']

def writeDataset(dataset):
    for entry in dataset:
        request = {}
        request['TableName'] = tableName
        
        timestamp = entry['timestamp']
        item = {}
        item = {
            "calendarDate": { 'N': timestamp['calendarDate']},
            "utc": {'N': str(timestamp['utcTimestamp'])}
        }

        data = entry['data']
        for dataKey in data.keys():
            dataValue = data[dataKey]
            unit = dataValue.get('units')
            value = dataValue['value']
            keyUnitPair = dataKey + ("" if unit is None else ("_" + unit))
            item[keyUnitPair] = {
                getType(dataKey): str(value)
            }
        
        request['Item'] = item
        client.put_item(TableName=tableName, Item=item)

def getType(fieldName):
    return 'S' if (fieldName in stringTypes) else 'N'