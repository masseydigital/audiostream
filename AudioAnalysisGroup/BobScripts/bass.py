# this function computes the energy from between frequency 0 to 150hz

import essentia
import essentia.standard
import sys

filepath = sys.argv[1]


loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def bassCalculator(audioInput):
	bassExtractor = essentia.standard.BarkBands()
	bass = bassExtractor(audio)
	return bass

bass = bassCalculator(audioInput = audio)
total = 0.0
for i in range(0,3):
	total += bass[i]
#for i in range(0,23):
#	print 'Band: %d %d' %(i, bass[i])
print "%d" %total


