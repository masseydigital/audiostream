import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
# loader = essentia.standard.MonoLoader(filename = '/home/bzachmann/Documents/hellobrooklyn.mp3')
loader = essentia.standard.MonoLoader(filename = filepath) #now run the script like: python bpm.py /home/bazchmann/Documents/hellobrooklyn.mp3

audio = loader()
bpmextractor = essentia.standard.RhythmExtractor2013()
bpmvalues = bpmextractor(audio)

confidence = bpmvalues[2]
confidenceWords = ""
if (confidence < 1.0) and (confidence >= 0.0):
	confidenceWords = "very low confidence"
elif(confidence <= 1.5) and (confidence >= 1):
	confidenceWords = "low confidence"
elif(confidence <=3.5) and (confidence > 1.5):
	confidenceWords = "good confidence"
elif(confidence <= 5.32) and (confidence > 3.5):
	confidenceWords = "excellenct confidence"
else:
	confidenceWords = "error"



print "BPM: %s\nConfidence: %s - %s" % (bpmvalues[0], confidence, confidenceWords)
