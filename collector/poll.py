import time
import jdlDate
import obdClient
import commands
import fileCache
import logging

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
                        logging.debug("Polling " + cmdName)
                        data = obdClient.query(connection, cmdName)
                        setLastPolledTime(cmdName, lastPolled)
                        allData[cmdName] = data
                    else:
                        logging.info("Not time to poll " + cmdName)
                except Exception:
                    logging.exception("ERROR!")

            fileCache.writeData(allData)
        else:
            logging.warning("Connection failure... retrying")
            time.sleep(5)
            connection = connect

def connect():
    connection = obdClient.connect()

    return connection

def isTimeToPoll(cmdName):
    command = allCommandsToPoll['commands'][cmdName]
    lastPolledTime = lastPolled[cmdName]
    return jdlDate.getUtc(jdlDate.getLocalTime()) - lastPolledTime > command['pollIntervalSec']

def setLastPolledTime(cmdName, lastPolled):
    lastPolled[cmdName] = jdlDate.getUtc(jdlDate.getLocalTime())

def initializeLastPolled():
    global lastPolled
    for cmdName in allCommandsToPoll['commands'].keys():
        lastPolled[cmdName] = 0

