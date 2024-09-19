#!/Users/chao.cheng/.pyenv/shims/python3
from talker import Talker
import sys


def get_brightness():
    t = Talker()
    t.send("get_brightness()")
    b = t.receive()
    print(int(b))
    t.close()


def update_text(text):
    t = Talker()
    t.send("show('" + text + "')")
    t.close()


def main():
    if len(sys.argv) < 2:
        print("Please provide an argument (get_brightness or update_text)")
        sys.exit(1)

    if sys.argv[1] == 'get_brightness':
        get_brightness()
    elif sys.argv[1] == 'update_text':
        if len(sys.argv) < 3:
            print("Please provide text to be updated")
            sys.exit(1)
        update_text(sys.argv[2])
    else:
        print("Invalid argument. Please provide either 'get_brightness' or 'update_text'")
        sys.exit(1)


if __name__ == "__main__":
    main()
