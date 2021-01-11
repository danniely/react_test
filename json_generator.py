import json

person_dict = {

		"id": 1,

		"itle": "Sample 1",

		"author": "Hyunho"

	}

with open('person.txt', 'w') as json_file:
  json.dump(person_dict, json_file)
