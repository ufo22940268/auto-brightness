import framebuf

icons = [
    'high',
    'medium',
    'low',
    'mute',
]

icon_data = {}
icon_width = 50
icon_height = 50


def read_pbm(filename):
    with open(filename, 'rb') as fd:
        pbm_format = fd.readline().strip()
        if pbm_format != b'P4':
            print("ERROR: input file must be binary PBM (type P4)")
            return 1
        pbm_dims = [int(d) for d in fd.readline().strip().split()]
        pbm_data = fd.read()

        # Read width and height
        width = pbm_dims[0]
        height = pbm_dims[1]

        return bytearray(pbm_data), width, height


def load_icons():
    for icon in icons:
        data, _, _ = read_pbm('images/' + icon + '.pbm')
        icon_data[icon] = data


load_icons()


def get_icon(vol):
    if vol > 60:
        return icon_data['high']
    elif vol > 30:
        return icon_data['medium']
    elif vol > 0:
        return icon_data['low']
    else:
        return icon_data['mute']


buf = bytearray(128 * 64 // 8)  # Size of the framebuffer (128*64 pixels monochrome)
fb = framebuf.FrameBuffer(buf, 128, 64, framebuf.MONO_HLSB)


def draw_volume_bar(display, volume):
    # Clear the FrameBuffer
    fb.fill(0)

    # Define parameters for the bar
    bar_width = 100
    bar_height = 10
    bar_x = (128 - bar_width) // 2  # Center the bar horizontally
    bar_y = (64 - bar_height) // 2  # Center the bar vertically
    nob_width = 4
    nob_height = bar_height + 6

    # Draw the left part of the bar
    left_width = int(bar_width * volume)
    fb.fill_rect(bar_x, bar_y, left_width, bar_height, 1)

    # Draw the right part of the bar
    fb.rect(bar_x + left_width, bar_y, bar_width - left_width, bar_height, 1)

    # Draw the nob
    nob_x = bar_x + left_width - nob_width // 2
    nob_y = bar_y - (nob_height - bar_height) // 2
    fb.fill_rect(nob_x, nob_y, nob_width, nob_height, 1)

    # Update the display
    display.blit(fb, 0, 0)
    display.show()


def draw_volume(display, vol):
    if vol == 0:
        display.fill(0)
        icon = get_icon(vol)
        fb = framebuf.FrameBuffer(icon, icon_width, icon_height, framebuf.MONO_HLSB)
        x = 45
        y = 10
        display.blit(fb, x, y)
        display.show()
    else:
        draw_volume_bar(display, vol / 100)
