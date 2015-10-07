import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
#to run the file: python loudness.py 'filename'

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

loudnessExtractor = essentia.standard.Loudness()

loudness = loudnessExtractor(audio)

print 'Loudness: %f' % loudness
