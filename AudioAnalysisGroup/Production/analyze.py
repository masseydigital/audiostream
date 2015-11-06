import essentia
import essentia.standard
import os
import sys
import logging
import pysftp
#########################################constant variables######################################

#fileStorageFolder = "server/"
fileStorageFolder = "/SongUpload/Songs"


##########################################functions###############################################

#parameter is a directory for the music files
#will print all directories and retrun all directories in an array
def getFileList(filefolder): 
	a = []
	for root, dirs, files in os.walk(filefolder):
		for file in files:
			if file.endswith(".mp3"):
				a.append(os.path.join(root, file))
	#print(a) #unneccesary if returning, only used for checking files
	return (a)

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

def makeLogPath(filefolder):
	logpath = os.path.join(filefolder, "log.txt")
	return logpath

def setupLogging(filefolder):
	logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s', datefmt='%m-%d %H:%M', filename= makeLogPath(filefolder), filemode='w')
	console = logging.StreamHandler()
	console.setLevel(logging.INFO)

	formatter = logging.Formatter('%(name)-12s: %(levelname)-8s %(message)s')

	console.setFormatter(formatter)
	logging.getLogger('').addHandler(console)


################################essentia_function_setup##########################################

# here we would define all of the essentia funcitions

#Input audio signal and returns the loudness
def getLoudness(audioInput):
	loudnessExtractor = essentia.standard.Loudness()
	loudness = loudnessExtractor(audioInput)
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
	tone = tonalExtractor(audioInput)
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

# experimental, this function computes the energy from between frequency 0 to 150hz
def bassCalculator(audioInput):
	bassExtractor = essentia.standard.BarkBands()
	bass = bassExtractor(audioInput)
	total = 0;
	for i in range(0,3):
		total += bass[i]
	return total


#dancability returns a value based on a crazy algorithm that will be between 1 and 3
	#optional scale of dance=dance*3.33 for a 1-10 scale
def getDanceability(audioInput):
	DanceAbility = essentia.standard.Danceability()
	dance = DanceAbility(audioInput)
	return dance




###################################### analyze song #################################################
def analyzeSong(filepath, textfilepath):

	#setup the logging to put the log file in the same root folder that the .mp3 file is it
	
	loggerSong = logging.getLogger(os.path.split(filepath)[1])
	loggerSong.info("Logging Enabled")

	#here we should check if the file really exists(use os. methods)
	#and if it is a .mp3

	loggerSong.info("getting tag info")
	tags = getTagInfo(filepath)
	loggerSong.info("done getting tag info")

	#here we should check if all the metadata is in the list( not missing any)
	for t in tags:
		if (t == ""):
			loggerSong.error(os.path.split(filepath)[1] + "is missing tag info. Excluding file from analysis and upload")
			return

	#change the name and update the filepath
	loggerSong.info("changing the filename")
	filename = changeName(filepath, tags[0], tags[1], tags[2])
	loggerSong = logging.getLogger(os.path.split(filename)[1]) #changes the name of the logger so that it has the new .mp3 name
	loggerSong.info("renamed filename to " + os.path.split(filename)[1])


	#here we should check if the file already exists in the server.  If yes.  Return to cancel anaylsis and upload


	#get the audio vector of the .mp3 file
	loggerSong.info("generating audio vector")
	audio = getAudioVector(filename)
	loggerSong.info("done generating audio vector")

	#get the bpm of the audio vector
	loggerSong.info("calculating BPM")
	bpm = getBPM(audio)
	loggerSong.info("done calculating BPM")

	#get the loudness of the audio vector
	loggerSong.info("calculating loudness")
	loudness = getLoudness(audio) 
	loggerSong.info("done calculating loudness")

	#get the key of the audio vector
	loggerSong.info("calculating key information")
	keyinfo = getKey(audio)
	key = keyinfo[0]
	scale = keyinfo[1]
	loggerSong.info("done calculating key information")
	
	loggerSong.info("calculating tone information")
	toneinfo = getTone(audio)
	chordsKey = toneinfo[2]
	chordsChangesRate = toneinfo[0]
	chordsNumberRate = toneinfo[3]
	loggerSong.info("done calculating tone information")

	#get the danceability
	loggerSong.info("calculating the danceability... yeah seriously!")
	danceability = getDanceability(audio)
	loggerSong.info("done calculating the danceability")

	#calculate the amount of bass
	loggerSong.info("calculating the amuont of bass")
	bassiness = bassCalculator(audio)
	loggerSong.info("done calculatingt the amount of bass")

	#for testing

	serverPath = makeServerPath(filename)

	toFileList = [serverPath, tags[0], tags[1], tags[2], tags[3], tags[4], bpm, loudness, key, scale, chordsKey, chordsChangesRate, chordsNumberRate, danceability, bassiness]

	appendToText(toFileList, textfilepath)

	#here we would upload the file to the server
	#im not 100% sure about these paths
	srv.put(localpath = filepath, remotepath = serverPath)
	
##################################### EXECUTE ######################################################


#check if the arguments are correct
if((len(sys.argv) < 3) or (len(sys.argv) > 3)):
	print "Incorrect Number of Arguments.  Specify filepath to input folder and filepath to output .txt"
else:
	#check if the directory is truely a directory
	if (not(os.path.isdir(sys.argv[1]))):
		print "invalid filepath to input files"
	else:
		#check if the output.txt is specified as a .txt
		if(not(sys.argv[2].endswith(".txt"))):
			print "output must be .txt"
		else:
			#connect to server via sftp
			srv = pysftp.Connection(host="134.129.125.114", username = "audioanalysis", password = "csci413aa")
			filelist = getFileList(sys.argv[1])
			setupLogging(sys.argv[1])
			for f in filelist:
				analyzeSong(f, sys.argv[2])

			#here is were we would finally upload the .txt doc
			#im not 100% sure what the path will be for the text doc
			#will overwrite any existing files with this name
			srv.put(localpath = sys.argv[2], remotepath ="/SongUpload/Information/output.txt")
			srv.close()



