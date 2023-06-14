import serial


class Talker:
    TERMINATOR = '\r'.encode('UTF8')

    def __init__(self, timeout=1):
        self.serial = serial.Serial('/dev/cu.usbmodem1401', 9600, timeout=timeout)

    def send(self, text: str):
        """

        :rtype: object
        """
        line = '%s\r\f' % text
        self.serial.write(line.encode('utf-8'))
        reply = self.receive()
        reply = reply.replace('>>> ', '')  # lines after first will be prefixed by a propmt
        if reply != text:  # the line should be echoed, so the result should match
            raise ValueError('expected %s got %s' % (text, reply))

    def receive(self) -> str:
        line = self.serial.read_until(self.TERMINATOR)
        return line.decode('UTF8').strip()

    def close(self):
        self.serial.close()


# t = Talker()
# t.send("show('123123444')")
# t.close()
# t.send("2 + 2")
# print(t.receive())
# t.send("get_brightness()")
# print(t.receive())
