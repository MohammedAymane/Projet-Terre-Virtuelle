import sys
import tle2czml
import os


# Creates a file in the current directory called "orbit.czml", containing the orbits of the satelites over the next 24 hours.
tle2czml.create_czml(sys.argv[1], outputfile_path=sys.argv[2])
with open(sys.argv[2], "r") as filin:
    content = filin.readlines()
    print((content))

