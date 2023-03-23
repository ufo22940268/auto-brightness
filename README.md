# auto-brightness

Automatically adjusting the brightness of your monitor based on the ambient lighting in your environment can greatly improve your viewing experience. This feature ensures that your eyes are not strained by overly bright or dim screens in different lighting conditions, while also reducing energy consumption. With automatic brightness adjustment, you no longer need to manually adjust your screen brightness every time the environment light is changed.

# Demo

https://youtube.com/shorts/Lfg8SN3TY0M?feature=share

# Required Materials

1. Raspberry Pi Pico
2. BH1750FVI ambient light sensor
3. Wires for connecting the Pico and light sensor
4. Micro USB connector

# Building the Project

1. Connect the GND and VCC ports of the light sensor to the Pico.
2. Connect the SCL to GP14.
3. Connect the SDA to GP15.
4. Flash the pico/main.py code onto the Pico.

# Installing the Raycast Extension

To run the sync job periodically and adjust the monitor brightness, you need to install the Raycast extension on your Mac. Once installed, you can then install this specific extension. Once both are installed, the sync background job should automatically start running as soon as you launch Raycast.

1. pip3 install pyserial
2. copy the [m1ddc](https://github.com/waydabber/m1ddc) binary into `/usr/local/bin`.
