# auto-brightness

Automatically adjust monitor brightness according the ambient light around.


# Demo

https://youtube.com/shorts/Lfg8SN3TY0M?feature=share

# The materials you needs

1. Raspberry Pi Pico
2. BH1750FVI ambient light sensor
3. Some wires used to connect Pico and light sensor
4. An micro usb connector.

# Build 

1. Connect the GND and VCC ports from light sensor to pico
2. Connect the SCL to GP14
3. Connect the SDA to GP15
4. Flash the `pico/main.py` into pico.

# Install raycast extension

It uses the raycast to run the sync job periodically to sync the brightness from pico into mac and then mac adjust the monitor brightness.
So you have to install the raycast on you mac, and install this extension.

After all this done, the sync background job should be started automatically as soon as raycast is launched.
