import essentia
import essentia.standard
import essentia.streaming



load = essentia.standard.AudioLoader(filename = '/home/matts/audioBLACK.mp3')

metadata = load();
#use as many or few tags as needed
print "FileType: %s " % (metadata[5])

a = "FileType: %s " % (metadata[5])

arrayDATA=[]
arrayDATA.append(a)##puts info at the end of the array





with open("testMP3?.txt", 'w') as file:
    for item in arrayDATA:
        file.write("{}\n".format(item))
##prints array to text file established (test123.txt) and seperates by line item?? 
#TITLE
#ARTIST

print(arrayDATA)



