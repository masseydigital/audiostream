import essentia
import essentia.standard
import os
import sys

fileStorageFolder = "server/"


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

def appendToText(dataList, textFilePath):

	with open(textFilePath, 'a') as file:
		for item in dataList:
			file.write("{};; ".format(item))
		file.write("\n")

def makeServerPath(filepath):
	filesplits = os.path.split(filepath)
	name = filesplits[1]
	serverpath = os.path.join(fileStorageFolder, name)
	return serverpath

#################################################################################################





################################essentia_function_setup##########################################

# here we would define all of the essentia funcitions

#Input audio signal and returns the loudness
def getLoudness(audioInput):
	loudnessExtractor = essentia.standard.Loudness()
	loudness = loudnessExtractor(audio)
	return loudness

#Input audio signal
#returns the key, scale, and strength
def getKey(audioInput):
	keyExtractor = essentia.standard.KeyExtractor()
	key = keyExtractor(audioInput)
	return key
#Input audio signal
#returns chords_changes_rate, chords_histogram, chords_key, chords_number_rate, chords_progression,
#chords_scale, chords_strength, hpcp, hpcp_highres, key_key, key_scale, key_strength
def getTone(audioInput):
	tonalExtractor = essentia.standard.TonalExtractor()
	tone = tonalExtractor(audio)
	return tone

def getAudioVector(filepath):
	loader = essentia.standard.MonoLoader(filename = filepath)
	audio = loader()
	return loader()

def getBPM(audioInput):
	bpmextractor=essentia.standard.RhythmExtractor2013()
	bpmvalues = bpmextractor(audioInput)
	return bpmvalues[0]

#return values will be 0=title, 1=Artist, 2=Ablum, 3=Genre, 4=Duration
def getTagInfo(filepath):

	reader = essentia.standard.MetadataReader(filename = filepath)
	metadata = reader()
	a = (metadata[0], metadata[1], metadata[2], metadata[4], metadata[8])

	return a;






#################################################################################################



##################################### MAIN ######################################################


serverFolder = "server/"

#here we should check if the arguments are correct

#take the argument from command line and find the filepath
filepath = sys.argv[1]
textfilepath = sys.argv[2]

#here we should check if the file really exists(use os. methods)
#and if it is a .mp3

tags = getTagInfo(filepath)

#here we should check if all the metadata is in the list( not missing any)

#change the name and update the filepath
filename = changeName(filepath, tags[0], tags[1], tags[2])

#get the audio vector of the .mp3 file
#audio = getAudioVector(filename)

#get the bpm of the audio vector
#bpm = getBPM(audio)
#for testing

serverPath = makeServerPath(filename)

toFileList = [serverPath, tags[0], tags[1], tags[2], tags[3], tags[4]]

appendToText(toFileList, textfilepath)


