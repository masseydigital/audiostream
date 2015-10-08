

ti = "Hello, Brooklyn"
ar = "All Time Low"
al = "Nothing Personal this is a really long title that is more than 20 characters"



def titleformat(title, artist, album):
	titlelow = title.lower()
	titlefinal = titlelow.replace(" ", "_")
	artistlow = artist.lower()
	artistfinal = artistlow.replace(" ", "_")
	albumlow = album.lower()
	albumfinal = albumlow.replace(" ", "_")

	#final = titlefinal + "-" + artistfinal + "-" + albumfinal
	finalstrings = [titlefinal, artistfinal, albumfinal]
	outstrings = ["", "", ""]
	acceptedc = ['_','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
	
	for x in range(0, 3):
		for character in finalstrings[x]:
			if character in	acceptedc:
				if len(outstrings[x]) < 30:
					outstrings[x]= outstrings[x] + character

	out = outstrings[0] + "-" + outstrings[1] + "-" + outstrings[2] + ".mp3"
	print outstrings
	return out

	

newtitle = titleformat(title = ti, artist = ar, album = al)
print newtitle

