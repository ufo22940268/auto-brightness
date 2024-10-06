#!/Users/chao.cheng/.pyenv/shims/python3
import serial
import time

ser = serial.Serial('/dev/tty.usbmodem1401', 9600, timeout=1)  # 打开串口
ser.flushInput()
while True:
    data = ser.readline()
    print(data)
    time.sleep(1)
# ser.close()
