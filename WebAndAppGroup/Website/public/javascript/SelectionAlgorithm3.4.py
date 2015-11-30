import mysql.connector

db = mysql.connector.connect(user='csci413f15_1',
                             password='F9UnP31c',
                             host='rei.cs.ndsu.nodak.edu',
                             database='csci413f15_1')
cursor = db.cursor()

path = r'AnalysisDirectory'
weight = [10, #0  Artist
          10, #1  Album
          5,  #2  Year
          20, #3  Genre
          5,  #4  Duration
          10, #5  BPM
          5,  #6  Loudness
          10, #7  Key
          5,  #8  Scale
          10, #9  Chords Key
          5,  #10 Chords Scale
          5,  #11 Chords Changes Rate
          5,  #12 Chords Number Rate
          5,  #13 Danceability
          5,  #14 Bassiness
          5,  #15 Dynamic Complexity
          5,  #16 Zero Cross Rate
          10] #17 Intensity

threshold = 30

cursor.execute("""SELECT artist,
               album,
               year,
               genre,
               duration,
               bpm,
               loudness,
               songKey,
               scale,
               chordsKey,
               chordsScale,
               chordsChangesRate,
               chordsNumberRate,
               danceability,
               bassiness,
               dynamicComplexity,
               zeroCrossingRate,
               intensity,
               title
               FROM SONGS,
               ARTISTS,
               ALBUMS,
               GENRES
               WHERE ALBUMS.albumID = SONGS.albumID
               AND GENRES.genreID = SONGS.genreID
               AND ALBUMS.artistID = ARTISTS.artistID""")

result = cursor.fetchall()

print(result[1])
#for song in result:
 #   for element in song:
  #      print(element)

similar_songs = []
i = 0
song = result[i]

for fields in result:
    score = 0
    if i != 0:
        try:
            if fields[0] == song[0]:
                score += weight[0]
            if fields[1] == song[1]:
                score += weight[1]
            if fields[2]-5 <= song[2] & (fields[2]+5 >= song[2]):
                score += weight[2]
            if fields[3] == song[3]:
                score += weight[3]
            if (fields[4]-30 <= song[4]) & (fields[4]+30 >= song[4]):
                score += weight[4]
            if (fields[5]*.95 <= song[5]) & (fields[5]*1.05 >= song[5]):
                score += weight[5]
            if (fields[6]*.95 <= song[6]) & (fields[6]*1.05 >= song[6]):
                score += weight[6]
            if fields[7] == song[7]:
                score += weight[7]
            if fields[8] == song[8]:
                score += weight[8]
            if fields[9] == song[9]:
                score += weight[9]
            if fields[10] == song[10]:
                score += weight[10]
            if (fields[11]*.95 <= song[11]) & (fields[11]*1.05 >= song[11]):
                score += weight[11]
            if (fields[12]*.95 <= song[12]) & (fields[12]*1.05 >= song[12]):
                score += weight[12]
            if (fields[13]*.95 <= song[13]) & (fields[13]*1.05 >= song[13]):
                score += weight[13]
            if (fields[14]*.95 <= song[14]) & (fields[14]*1.05 >= song[14]):
                score += weight[14]
            if (fields[15]*.95 <= song[15]) & (fields[15]*1.05 >= song[15]):
                score += weight[15]
            if (fields[16]*.95 <= song[16]) & (fields[16]*1.05 >= song[16]):
                score += weight[16]
            if fields[17] == song[17]:
                score += weight[17]
            print('Title: %s\tScore: %d' % (fields[18], score))
            if score >= threshold:
                similar_songs.append(fields[18])
        except IndexError:
            print('End of Query\n')
            break
    i += 1
print('\nNumber of comparisons: %d\n' % i)
print('Similar Songs to %s:' % song[18])
for songs in similar_songs:
    print('\t%s' % songs)
