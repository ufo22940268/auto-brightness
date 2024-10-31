import time

import serial

# 创建一个 serial 对象
# 注意，你需要将 'COMx' 替换为你的设备的正确端口号
ser = serial.Serial('/dev/cu.usbmodem11301', 9600)

# 向 Pico 发送文本
ser.write(b'\x7B')
print('send--')

# 关闭串口
ser.close()
