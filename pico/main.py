import utime
from machine import Pin, I2C, UART
import ssd1306

# 创建一个I2C接口
i2c = I2C(1, sda=Pin(2), scl=Pin(3))

# 创建一个SSD1315对象
# 注意，SSD1315的分辨率可能因模块不同而不同，以下例子中的128, 64是示例值
# 请根据你的具体模块修改这两个值
display = ssd1306.SSD1306_I2C(128, 64, i2c)


def show(show_text):
    display.fill(0)
    display.text(show_text, 0, 0)
    display.show()


# while True:
#     print("123")
# t = utime.localtime()
# formatted_time = "{:02d}:{:02d}:{:02d}".format(t[3], t[4], t[5])
# show(formatted_time)

# 创建一个 UART 对象
uart = UART(0, 9600)  # UART 通信在 0 号设备上，波特率为 9600
uart.init(9600, bits=8, parity=None, stop=1)

show('oijoijioj')
show('123')

while True:
    if uart.any():
        print('kkk')
        text = uart.read(20).decode().strip()
        print('text:', text)
        show(text)
