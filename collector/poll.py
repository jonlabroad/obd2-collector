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
    
    while(not connection.is_connected()):
        logging.warning("Waiting for connection...")
        time.sleep(5)
        connection = connect()
    
    # Write out the supported commands
    # supported_commands is a list (supports add() and len())
    supportedCommands = connection.supported_commands
    commandsFilename = 'supported_commands.json'
    with open(commandsFilename, 'w') as f:
        f.write('[')
        for cmd in supportedCommands:
            f.write('"' + str(cmd) + '",')
        f.write(']')
        f.close()
    
    while(True):
        if (connection.is_connected()):
            allData = {}
            fileCache.updateFile()
            for cmdName in allCommandsToPoll['commands'].keys():
                try:
                    if isTimeToPoll(cmdName):
                        logging.debug("Polling " + cmdName)
                        data = obdClient.query(connection, cmdName)
                        setLastPolledTime(cmdName, lastPolled)
                        allData[cmdName] = data
                    else:
                        logging.debug("Not time to poll " + cmdName)
                except Exception:
                    logging.exception("ERROR!")

            fileCache.writeData(allData)
            time.sleep(1)
        else:
            logging.warning("Connection failure... retrying")
            time.sleep(5)
            connection = connect()

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

