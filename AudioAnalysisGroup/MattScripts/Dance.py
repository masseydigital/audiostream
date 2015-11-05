
import essentia
import essentia.standard
import sys

filepath = sys.argv[1]

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def Dance(audioInput):
	DanceAbility = essentia.standard.Danceability()
	dance = DanceAbility(audio)
	return dance


print 'Dance: %f' % Dance(audioInput = audio)
