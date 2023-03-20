import time

from machine import Pin, I2C, PWM

i2c_2 = I2C(1, sda=Pin(14), scl=Pin(15), freq=400000)

# Simple driver for the BH1750FVI digital light sensor

MEASUREMENT_TIME = 120


class BH1750FVI:
    def __init__(self, i2c, addr=0x23, period=150):
        self.i2c = i2c
        self.period = period
        self.addr = addr
        self.time = 0
        self.value = 0
        self.i2c.writeto(addr, bytes([0x10]))  # start continuos 1 Lux readings every 120ms

    def read(self):
        self.time += self.period
        if self.time >= MEASUREMENT_TIME:
            self.time = 0
            data = self.i2c.readfrom(self.addr, 2)
            self.value = (((data[0] << 8) + data[1]) * 1200) // 1000
        return self.value


dev = BH1750FVI(i2c_2)

pwm = PWM(Pin(25))

# Set the PWM frequency.
pwm.freq(1000)


def update_led():
    brightness = int(dev.read())
    l = int(min(max(0, brightness), 200) / 200 * 100)
    pwm.duty_u16(int(2 ** 16 * (l / float(200))))
    print(brightness)


while True:
    update_led()
    time.sleep(0.1)
