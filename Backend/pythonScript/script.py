import sys
import tle2czml
import os

print(os.path.isfile(sys.argv[1]))


# Creates a file in the current directory called "orbit.czml", containing the orbits of the satelites over the next 24 hours.
tle2czml.create_czml(sys.argv[1], outputfile_path="./czmlFiles/orbit.czml")

