#!/Users/chao.cheng/.pyenv/shims/python3
from talker import Talker

t = Talker()
t.send("get_brightness()")
b = t.receive()
print(int(b))
t.close()
