import essentia
import essentia.standard
import essentia.streaming

reader = essentia.standard.MetadataReader(filename = '/home/bzachmann/Documents/hellobrooklyn.mp3')

metadata = reader();

print "Title: %s \nArtist: %s" % (metadata[0], metadata[1])

