import csv

userInterest = {
    "Sarah":{
        "games":{
            "wins":0
            ,"losses":0
            ,"skunks":0
            ,"skunked":0
            ,"best":[0,0]
            ,"worst":[0,0]
        },
        # index 0 = peg, 1 = hand, 2=crib, 3=total_score
        "highest":[
            {'game':0,'round':0,'score':0}
            ,{'game':0,'round':0,'score':0}
            ,{'game':0,'round':0,'score':0}
            ,{'game':0,'round':0,'score':0}
        ],
        "totals":[
            0,0,0,0
        ],
        "averages":[
            0,0,0,0
        ]
        ,"handFrequencies":{
            "frequent start":[{"card":"X","times":0},{"card":"X","times":0},{"card":"X","times":0}]
            ,"flushes":{
                "total":0
                ,"inCrib":0
                ,"averagePerGame":0
                ,"averagePerCrib":0
            }
            ,"runs":{
                "total":0
                ,"inCrib":0
                ,"single":0
                ,"double":0
                ,"triple":0
                ,"averagePerGame":0
                ,"averagePerCrib":0
            },"fifteens":{
                "total":0
                ,"inCrib":0
                ,"ten&5":0
                ,"ten&4&A":0
                ,"ten&2&3":0
                ,"9&6":0
                ,"9&5&A":0
                ,"9&4&2":0
                ,"9&3&3":0
                ,"8&7":0
                ,"8&6&A":0
                ,"8&5&2":0
                ,"8&4&3":0
                ,"averagePerHand":0
                ,"averagePerGame":0
                ,"averagePerCrib":0
            },"pairs":{
                "total":0
                ,"inCrib":0
                ,"double":0
                ,"triple":0
                ,"quad":0
                ,"averagePerHand":0
                ,"averagePerGame":0
                ,"averagePerCrib":0
            }
        }
    }
}

games={}

def getGameStats(thisRound,game):
    p1 = int(thisRound[0][16])
    p2 = int(thisRound[1][16])
    difference = p1 - p2
    if difference <= 0:
        games[game]["rounds"].append([game,thisRound[0][2],thisRound[1][0],thisRound[0][0],difference*-1])
        winner = thisRound[1][0]
    else:
        games[game]["rounds"].append([game,thisRound[0][2],thisRound[0][0],thisRound[1][0],difference])
        winner = thisRound[0][0]
    if p1 == 121 or p2==121:
        games[game]["winner"] = winner
        games[game]["numRounds"] = thisRound[0][2]

def gameStats(spamreader):
    i = 0
    date = 0
    game = -1
    round = []
    for row in spamreader:
        if row[1] == date:
            if i == 0:
                round.append(row)
                i = 1
            else:
                round.append(row)
                getGameStats(round,game)
                round = []
                i=0
        else:
            date = row[1]
            game = game + 1
            games[game] = {"date":row[1],"numRounds":0,"winner":"","rounds":[]}
            round = [row]
            i = 1
    print(games)

getGameStatsCSV


hands = {"Sarah":{"hi":""},"Caitlin":{"hi":""},"Darren":{"hi":""},"Colban":{"hi":""},"James":{"hi":""},"Name":{"hi":""}}

def userStats(reader):
    for row in spamreader:
        player = str(row[0])
        hands[player]['hi'] = "world"

        print(hands)

with open('C:/Users/cmcco/Documents/github-repos/caitsmcco.github.io/crib/data.csv', newline='') as csvfile:

    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    
    userStats(spamreader)



        
        
