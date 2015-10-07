

ti = "Hello, Brooklyn"
ar = "All Time Low"
al = "Nothing Personal"



def titleformat(title, artist, album):
	titlelow = title.lower()
	titlefinal = titlelow.replace(" ", "_")
	artistlow = artist.lower()
	artistfinal = artistlow.replace(" ", "_")
	albumlow = album.lower()
	albumfinal = albumlow.replace(" ", "_")

	return titlefinal + "-" + artistfinal + "-" + albumfinal + ".mp3"



newtitle = titleformat(title = ti, artist = ar, album = al)
print newtitle

