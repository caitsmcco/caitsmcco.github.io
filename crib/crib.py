import csv

# index 0 = peg, 1 = hand, 2=crib, 3=score
interesting = {
    "Sarah":{
        "highest":[
            0,0,0,0
        ],
        "average":[
            0,0,0,0
        ]
    },
    "Caitlin":{

    },
    "Colban":{

    }
}

with open('C:/Users/cmcco/Documents/github-repos/caitsmcco.github.io/crib/data.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in spamreader:
        print(', '.join(row))

