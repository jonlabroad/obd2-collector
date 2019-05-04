import time
import jdlDate
import obdClient
import commands
import fileCache

allCommandsToPoll = {}
lastPolled = {}

def poll():
    allCommandsToPoll = commands.readCommandInfo()
    initializeLastPolled()
    connection = connect()
    while(True):
        if (connection.is_connected()):
            allData = {}
            for cmdName in allCommandsToPoll.keys():
                try:
                    if isTimeToPoll(cmdName):
                        data = obdClient.query(connection, cmdName)
                        setLastPolledTime(cmdName)
                        allData[cmdName] = data
                except Exception as e:
                    print(e)
            print('************************')
            fileCache.writeData(allData)
        else:
            print("Connection failure")
            connection = connect
            time.sleep(5)


def connect():
    connection = obdClient.connect()

    return connection

def isTimeToPoll(cmdName):
    lastPolledTime = lastPolled[cmdName]
    return jdlDate.getUtc(jdlDate.getLocalTime()) - lastPolledTime

def setLastPolledTime(cmdName):
    lastPolled[cmdName] = jdlDate.getUtc(jdlDate.getLocalTime())

def initializeLastPolled():
    for cmdName in allCommandsToPoll.keys():
        lastPolled[cmdName] = 0

