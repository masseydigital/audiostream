import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
#to run the file: python loudness.py 'filename'

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def getMaxMagFreq(audioInput):
	MaxMagFreq = essentia.standard.MaxMagFreq()
	return MaxMagFreq(audioInput)

dc = getMaxMagFreq(audioInput = audio)
print dc
