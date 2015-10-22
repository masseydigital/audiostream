import essentia
import essentia.standard
import os
import sys

##########################################functions###############################################

#takes the full filepath (example: /home/bzachmann/Documents/test.mp3) 
#and some meta data to format a new filename and rename the file in the filepath
#the function returns the new filepath
def changeName(filepath, title, artist, album):
	titlelow = title.lower()
	titlefinal = titlelow.replace(" ", "-")
	artistlow = artist.lower()
	artistfinal = artistlow.replace(" ", "-")
	albumlow = album.lower()
	albumfinal = albumlow.replace(" ", "-")

	finalstrings = [titlefinal, artistfinal, albumfinal]
	outstrings = ["", "", ""]
	acceptedc = ['-','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
	
	for x in range(0, 3):
		for character in finalstrings[x]:
			if character in	acceptedc:
				if len(outstrings[x]) < 30:
					outstrings[x]= outstrings[x] + character

	newname = outstrings[0] + "_" + outstrings[1] + "_" + outstrings[2] + ".mp3"

	filesplits = os.path.split(filepath)
	path = filesplits[0]
	
	newfilepath = os.path.join(path, newname)
	os.rename(filepath, newfilepath)
	return newfilepath

#Inputs an array value and a path and will append to that text file path

def AppendToText(dataList, textFilePath):

	with open(textFilePath, 'a') as file:
		for item in dataList:
			file.write("{}; ".format(item))
		file.write("\n")


#################################################################################################





################################essentia_function_setup##########################################

# here we would define all of the essentia funcitions

#Input audio signal and returns the loudness
def loudnessCalculator(audioInput):
	loudnessExtractor = essentia.standard.Loudness()
	loudness = loudnessExtractor(audio)
	return loudness

#Input audio signal
#returns the key, scale, and strength
def keyCalculator(audioInput):
	keyExtractor = essentia.standard.KeyExtractor()
	key = keyExtractor(audioInput)
	return key

def getAudioVector(filepath):
	loader = essentia.standard.MonoLoader(filename = filepath)
	audio = loader()
	return loader()

def getBPM(audioInput):
	bpmextractor=essentia.standard.RhythmExtractor2013()
	bpmvalues = bpmextractor(audioInput)
	return bpmvalues[0]

#return values will be 0=title, 1=Artist, 2=Ablum, 3=Genre, 4=Duration
def GetTagInfo(filename):

	reader = essentia.standard.MetadataReader(filename)
	metadata = reader()
	a = (metadata[0], metadata[1], metadata[2], metadata[4], metadata[8])

	return(a);






#################################################################################################



##################################### MAIN ######################################################


#take the argument from command line and find the filepath
filepath = sys.argv[1]

#here we should check if the file really exists(use os. methods)


#this constant info will be replaced with a metadata finder funciton
ti = "Hello, Brooklyn"
ar = "All Time Low"
al = "Nothing Personal"
####

#change the name and update the filepath
filename = changeName(filepath, ti, ar, al)

#get the audio vector of the .mp3 file
audio = getAudioVector(filename)

#get the bpm of the audio vector
bpm = getBPM(audio)
#for testing
print filename
