from scratch import *

storage = [];

for i in range(97000):
    count = 0
    if i not in storage:
        storage.append(stringGenerator())
    else:
        count+=1
        print('Already in storage',count)
    print(i)