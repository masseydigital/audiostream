import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
#to run the file: python loudness.py 'filename'

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def loudnessCalculator(audioInput):
	loudnessExtractor = essentia.standard.Loudness()
	loudness = loudnessExtractor(audio)
	return loudness

print 'Loudness: %f' % loudnessCalculator(audioInput = audio)
