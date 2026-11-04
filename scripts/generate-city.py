"""Generate original deterministic vector art; a concept city, not canonical geography."""
from pathlib import Path
from random import Random
rng=Random(76)
out=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 800" fill="none">', '''<defs>
<linearGradient id="ground" x1="800" y1="150" x2="800" y2="790" gradientUnits="userSpaceOnUse"><stop stop-color="#203431"/><stop offset="1" stop-color="#0a1115"/></linearGradient>
<linearGradient id="left" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#263735"/><stop offset="1" stop-color="#101d21"/></linearGradient>
<linearGradient id="right"><stop stop-color="#142326"/><stop offset="1" stop-color="#0c161c"/></linearGradient>
<radialGradient id="light"><stop stop-color="#a8dac6" stop-opacity=".2"/><stop offset="1" stop-color="#a8dac6" stop-opacity="0"/></radialGradient>
</defs><ellipse cx="800" cy="430" rx="650" ry="290" fill="url(#light)"/>''']
def p(x,y,z=0): return (800+(x-y)*.89, 445+(x+y)*.37-z)
def pts(v): return ' '.join(f'{a:.1f},{b:.1f}' for a,b in v)
def pathline(v,col='#54736c',opacity=.3,width=.7):
    out.append(f'<polyline points="{pts(v)}" stroke="{col}" stroke-opacity="{opacity}" stroke-width="{width}"/>')
out.append(f'<polygon points="{pts([p(-480,-480,-8),p(480,-480,-8),p(480,480,-8),p(-480,480,-8)])}" fill="url(#ground)"/>')
for n in range(-480,481,48):
    pathline([p(n,-480),p(n,480)],opacity=.2)
    pathline([p(-480,n),p(480,n)],opacity=.2)
for rad in [260, 405, 565, 690]:
    out.append(f'<ellipse cx="800" cy="445" rx="{rad}" ry="{rad*.416}" stroke="#63887b" stroke-opacity=".24" stroke-width=".7"/>')
for n in [-255,0,255]:
    pathline([p(n,-480,1),p(n,480,1)],'#a8dac6',.43,1)
    pathline([p(-480,n,1),p(480,n,1)],'#a8dac6',.43,1)
buildings=[]
for x in range(-420,421,55):
    for y in range(-420,421,55):
        if abs(x)<70 and abs(y)<70: continue
        if abs(x-y)<25 or rng.random()<.25: continue
        if abs(x)+abs(y)>720: continue
        h=rng.randint(16,90)
        if rng.random()>.85: h+=rng.randint(45,100)
        buildings.append((x,y,rng.randint(20,37),rng.randint(20,38),h))
buildings += [(-22,-22,44,44,295),(-70,15,30,46,130),(25,-65,48,30,165)]
for x,y,w,d,h in sorted(buildings,key=lambda v:v[0]+v[1]):
    a,b,c,e=p(x,y,h),p(x+w,y,h),p(x+w,y+d,h),p(x,y+d,h)
    ab,bb,cb,eb=p(x,y),p(x+w,y),p(x+w,y+d),p(x,y+d)
    out.append(f'<path d="M{pts([a,b,c,e])}Z" fill="#354842" stroke="#658075" stroke-opacity=".7" stroke-width=".55"/>')
    out.append(f'<path d="M{pts([e,c,cb,eb])}Z" fill="url(#left)" stroke="#658075" stroke-opacity=".45" stroke-width=".55"/>')
    out.append(f'<path d="M{pts([b,c,cb,bb])}Z" fill="url(#right)" stroke="#658075" stroke-opacity=".45" stroke-width=".55"/>')
    for z in range(8,h-4,8):
        pathline([p(x+3,y+d,z),p(x+w-3,y+d,z)],'#aac1a2',.25 if rng.random()<.75 else .68,.65)
        pathline([p(x+w,y+3,z),p(x+w,y+d-3,z)],'#82a89a',.24,.6)
    if h>100:
        pathline([p(x+w/2,y+d/2,h),p(x+w/2,y+d/2,h+21)],'#c0dcc2',.75,1)
        ax,ay=p(x+w/2,y+d/2,h+21)
        out.append(f'<circle cx="{ax}" cy="{ay}" r="1.6" fill="#b0e2cb"/>')
# A sculptural suspended architectural ring, deliberately concept-only.
out.append('<ellipse cx="800" cy="223" rx="112" ry="39" stroke="#9bbdaa" stroke-width="1.2" stroke-opacity=".65"/>')
out.append('<ellipse cx="800" cy="228" rx="112" ry="39" stroke="#658476" stroke-width=".6" stroke-opacity=".4"/>')
for i in range(7):
    x=750+i*17
    pathline([(x,90),(x,165)],'#a8dac6',.04,1)
out.append('</svg>')
Path('public/assets/novaris-city.svg').write_text(''.join(out))
