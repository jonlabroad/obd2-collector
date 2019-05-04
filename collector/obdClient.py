import json

import obd

def connect():
    print('Connecting...')
    connection = obd.OBD()
    isConnected = connection.is_connected()
    print('Connection status: ' + connection.status())
    if isConnected:
        print('Port: ' + connection.port_name())
        print('Protocol: ' + connection.protocol_name())

    return connection

def supported_commands(connection):
    cmds = connection.supported_commands
    #print('Supported commands: ')
    #for cmd in cmds:
    #    print(cmd.name + ": " + cmd.desc)
    return cmds

def query(connection, command):
    #print("Querying [" + command.name + "]...")
    response = connection.query(obd.commands[command])
    #print("[" + command.name + "] response:" + str(response.value))
    return response

def pollAll(connection, cmds):
    response = {}
    for cmd in cmds:
        cmdResponse = query(connection, cmd)
        if not cmdResponse.is_null():
            response[cmd.name] = cmdResponse
#        else:
#            print("Received NULL response from command [" + cmd.name + "]")

    return response

def close(connection):
    connection.close()

