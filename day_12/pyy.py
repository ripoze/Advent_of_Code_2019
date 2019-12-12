def computestep(lp,lv):
    for i in range(4):
        for j in range(4):
            if i == j:
                continue
            if lp[i] < lp[j]:
                lv[i] += 1
            elif lp[i] > lp[j]:    
                lv[i] -= 1

    for i in range(4):
        lp[i] += lv[i]
    return lp, lv

def gcd(a,b):
    return gcd(b, a%b) if b else a or 1
    
def lcm(a, b):
    return a * b // gcd(a, b)

xp = list()
yp = list()
zp = list()
xv = list()
yv = list()
zv = list()

with open('input.txt') as f:
    for line in f.readlines():
        line = line.replace('<','').replace('>','').strip()
        x,y,z = line.split(',')
        x = int(x.split('=')[1])
        y = int(y.split('=')[1])
        z = int(z.split('=')[1])
        xp.append(x)
        yp.append(y)
        zp.append(z)
        xv.append(0)
        yv.append(0)
        zv.append(0)


xpi = xp[:]
xvi = xv[:]
ypi = yp[:]
yvi = yv[:]
zpi = zp[:]
zvi = zv[:]

xp, xv = computestep(xp, xv)
yp, yv = computestep(yp, yv)
zp, zv = computestep(zp, zv)

xr = 1
yr = 1
zr = 1

while xpi != xp and xvi != xv:
    xp, xv = computestep(xp, xv)
    xr += 1
while ypi != yp and yvi != yv:
    yp, yv = computestep(yp, yv)
    yr += 1
while zpi != zp and zvi != zv:
    zp, zv = computestep(zp, zv)
    zr += 1

print(xr,yr,zr)
print(lcm(xr, lcm(yr,zr)))