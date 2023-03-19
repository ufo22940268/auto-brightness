#!/Users/chao.cheng/.pyenv/shims/python3
import serial

ser = serial.Serial('/dev/tty.usbmodem21401', 9600, timeout=1)  # 打开串口
ser.flushInput()
data = ser.readline()
ser.close()
print(int(data))
