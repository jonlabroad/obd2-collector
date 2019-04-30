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
    print('Supported commands: ' + cmds)
    return cmds

def query(connection, command):
    print("Querying [" + command + "]...")
    response = connection.query(command)
    print("[" + command + "] response:" + response)
    return response

def pollAll(connection):
    response = {}
    allCmds = supported_commands(connection)
    for cmd in allCmds:
        cmdResponse = query(connection, cmd)
        if not cmdResponse.is_null():
            response[cmd] = cmdResponse
        else:
            print("Received NULL response from command [" + cmd + "]")

    return response

def close(connection):
    connection.close()

