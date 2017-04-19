from subprocess import call
import cv2
import numpy as np

def extractFrames(inputt, output_prefix):
    call(["ffmpeg", "-i", inputt, "-codec:v", "copy", "-bsf:v", "mjpeg2jpeg", output_prefix + "%d" + ".jpg"]);

def splitChannels(imagePath, outputs):
    img = cv2.imread(imagePath)
    B,G,R = cv2.split(img)
    cv2.imwrite(outputs["channel_r"],R)
    cv2.imwrite(outputs["channel_g"],G)
    cv2.imwrite(outputs["channel_b"],B)
