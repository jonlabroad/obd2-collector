import obdClient
import fileCache

def poll():
    connection = obdClient.connect()
    allData = obdClient.pollAll(connection)

    fileCache.writeData(allData)

