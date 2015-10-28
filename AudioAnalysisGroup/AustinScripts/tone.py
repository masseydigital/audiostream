import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
#to run the file: python loudness.py 'filename'

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def getTone(audioInput):
	tonalExtractor = essentia.standard.TonalExtractor()
	tone = tonalExtractor(audio)
	return tone

tone = getTone(audioInput = audio)
print tone
