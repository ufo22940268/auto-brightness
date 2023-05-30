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


def draw_volume(display, vol):
    display.fill(0)

    icon = get_icon(vol)
    fb = framebuf.FrameBuffer(icon, icon_width, icon_height, framebuf.MONO_HLSB)
    x = 45
    y = 10
    display.blit(fb, x, y)
    display.show()
