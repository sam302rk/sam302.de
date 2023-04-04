import sys, os
for city in sys.argv[1:]:
    f = city.replace(".kml", "")
    print(f'./{f}', '->', f'./{f}/main.kml')
    if not os.path.exists(f'./{f}'): os.mkdir(f'./{f}')
    os.rename(f'./{city}', f'./{f}/main.kml')