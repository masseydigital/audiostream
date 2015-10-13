import essentia
import essentia.standard
import essentia.streaming

## room for growth with inputing files
arrayDATA=[]
#potential "for loop" start point
reader = essentia.standard.MetadataReader(filename = '/home/matts/audioBLACK.mp3')

metadata = reader();
#use as many or few tags as needed
print "Title: %s \tArtist: %s\tAlbum: %s" % (metadata[0], metadata[1], metadata[2])


a = "Title: %s \tArtist: %s\tAlbum: %s" % (metadata[0], metadata[1], metadata[2])


arrayDATA.append(a)##puts info at the end of the array

#potential for loop end point



## room for growth with inputing files
#potential for loop start point
reader = essentia.standard.MetadataReader(filename = '/home/matts/audioHELLO.mp3')

metadata = reader();
#use as many or few tags as needed
print "Title: %s \tArtist: %s\tAlbum: %s" % (metadata[0], metadata[1], metadata[2])


b = "Title: %s \tArtist: %s\tAlbum: %s" % (metadata[0], metadata[1], metadata[2])


arrayDATA.append(b)##puts info at the end of the array

#potential for loop end point




with open("test123.txt", 'w') as file:
    for item in arrayDATA:
        file.write("{}\n".format(item))
##prints array to text file established (test123.txt) and seperates by line item?? 
#TITLE
#ARTIST

print(arrayDATA)



