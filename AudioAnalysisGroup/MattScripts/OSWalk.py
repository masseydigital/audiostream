import os

filepath1 ="/home/matts/Music"#"user input"
def walkDir(filepath): 
	a = []
	for root, dirs, files in os.walk(filepath):
		for file in files:
			if file.endswith(".mp3"):
				a.append(os.path.join(root, file))
	print(a)#check
	return (a)

name = walkDir(filepath1)#test
