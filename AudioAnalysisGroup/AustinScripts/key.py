import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
#to run the file: python loudness.py 'filename'

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def keyCalculator(audioInput):
	keyExtractor = essentia.standard.KeyExtractor()
	key = keyExtractor(audioInput)
	return key

key = keyCalculator(audioInput = audio)
print "Key: %s" % key[0]
print "Scale: %s" % key[1]
