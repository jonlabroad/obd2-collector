import time
import jdlDate
import obdClient
import commands
import fileCache

allCommandsToPoll = {}
lastPolled = {}

def poll():
    global allCommandsToPoll
    global lastPolled

    allCommandsToPoll = commands.readCommandInfo()
    initializeLastPolled()
    connection = connect()
    while(True):
        if (connection.is_connected()):
            allData = {}
            for cmdName in allCommandsToPoll['commands'].keys():
                fileCache.updateFile()
                try:
                    if isTimeToPoll(cmdName):
                        print("Polling " + cmdName)
                        data = obdClient.query(connection, cmdName)
                        setLastPolledTime(cmdName, lastPolled)
                        allData[cmdName] = data
                    else:
                        print("Not time to poll " + cmdName)
                except Exception as e:
                    print("ERROR!")
                    print(str(e))
            print('************************')
            fileCache.writeData(allData)
        else:
            print("Connection failure... retrying")
            time.sleep(5)
            connection = connect

def connect():
    connection = obdClient.connect()

    return connection

def isTimeToPoll(cmdName):
    command = allCommandsToPoll['commands'][cmdName]
    print(str(command))
    lastPolledTime = lastPolled[cmdName]
    print(str(lastPolledTime))
    print("Command: " + str(command))
    print("LastPolledTime: " + str(lastPolledTime))
    return jdlDate.getUtc(jdlDate.getLocalTime()) - lastPolledTime > command['pollIntervalSec']

def setLastPolledTime(cmdName, lastPolled):
    lastPolled[cmdName] = jdlDate.getUtc(jdlDate.getLocalTime())

def initializeLastPolled():
    global lastPolled
    for cmdName in allCommandsToPoll['commands'].keys():
        lastPolled[cmdName] = 0

