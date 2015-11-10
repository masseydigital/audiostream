import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
#to run the file: python loudness.py 'filename'

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def getZeroCrossingRate(audioInput):
	ZeroCrossingRate = essentia.standard.ZeroCrossingRate()
	return ZeroCrossingRate(audioInput)

dc = getZeroCrossingRate(audioInput = audio)
print dc
