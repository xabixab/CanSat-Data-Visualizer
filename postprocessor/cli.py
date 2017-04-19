import os
from subprocess import call
import argparse
import json
from bcolors import *
from postprocessor import *

print "[A] Extracting frames from A deck";
extractFrames("input/input_a.avi", "processed/a/raw/frame_");
lenght = len(os.listdir("./processed/a/raw/"));


print "[A] Spliting primary colors. (R, G, B)";
for frame in os.listdir("./processed/a/raw/"):
    splitChannels("./processed/a/raw/" + frame, {
        "channel_b": "./processed/a/channel_b/" + frame,
        "channel_g": "./processed/a/channel_g/" + frame,
        "channel_r": "./processed/a/channel_r/" + frame,
    });


print "[B] Extracting frames from B deck";
extractFrames("input/input_b.avi", "processed/b/raw/frame_");

print "[B] Spliting primary colors. (R, G, B)";
for frame in os.listdir("./processed/b/raw/"):
    splitChannels("./processed/b/raw/" + frame, {
        "channel_b": "./processed/b/channel_b/" + frame,
        "channel_g": "./processed/b/channel_g/" + frame,
        "channel_r": "./processed/b/channel_r/" + frame,
    });

# Writing info.json file.

print "[ ] Writing info.json file.";
info = {
    "frames": lenght,
    "views": ["raw", "channel_r", "channel_g", "channel_b"]
}

os.unlink("processed/info.json");
f = open('processed/info.json', 'w')
f.write(json.dumps(info))
f.close()
