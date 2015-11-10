import essentia
import essentia.standard
import sys

filepath = sys.argv[1]
#to run the file: python loudness.py 'filename'

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def getDynamicComplexity(audioInput):
	DynamicComplexity = essentia.standard.DynamicComplexity()
	return DynamicComplexity(audioInput)

dc = getDynamicComplexity(audioInput = audio)
print dc
