import asyncio
import threading
import time

async def example():
    print('trial-0')
    await asyncio.sleep(1)
    return 'trial-1'
async def example_input(a,b,c):
    print('trial-0')
    await asyncio.sleep(1)
    return 'trial-',a,b,c

threads_0 = threading.Thread(target=asyncio.run(example()));
threads = threading.Thread(target=asyncio.run(example_input('alpha','beta','gamma')))