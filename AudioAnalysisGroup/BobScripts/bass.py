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

total = bassCalculator(audioInput = audio)[0] + bassCalculator(audioInput = audio)[1] + bassCalculator(audioInput = audio)[2]

print 'Bass: %f' % total

