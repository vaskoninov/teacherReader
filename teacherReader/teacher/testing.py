with open('../assets/1.txt','r') as f:
    text = [word for line in f for word in line.split()]

    print(text)