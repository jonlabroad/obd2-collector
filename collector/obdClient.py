import json
import logging

import obd

def connect():
    logging.info('Connecting...')
    connection = obd.OBD()
    isConnected = connection.is_connected()
    logging.info('Connection status: ' + connection.status())
    if isConnected:
        logging.info('Port: ' + connection.port_name())
        logging.info('Protocol: ' + connection.protocol_name())

    return connection

def supported_commands(connection):
    cmds = connection.supported_commands
    return cmds

def query(connection, command):
    response = connection.query(obd.commands[command])
    return response

def pollAll(connection, cmds):
    response = {}
    for cmd in cmds:
        cmdResponse = query(connection, cmd)
        if not cmdResponse.is_null():
            response[cmd.name] = cmdResponse

    return response

def close(connection):
    connection.close()

