import json

# # Create a list of all the JSON files that you want to combine.
# json_files = ["kinopoisk-1.json", "kinopoisk-2.json", "kinopoisk-3.json"]

# # Create an empty list to store the Python objects.
# python_objects = []

# # Load each JSON file into a Python object.
# for json_file in json_files:
#     with open(json_file, "r") as f:
#         python_objects.append(json.load(f))

# # Dump all the Python objects into a single JSON file.
# with open("combined.json", "w") as f:
#     json.dump(python_objects, f, indent=4)
    
# files=["kinopoisk-1.json", "kinopoisk-2.json", "kinopoisk-3.json"]

# def merge_JsonFiles(filename):
#     result = list()
#     for f1 in filename:
#         with open(f1, 'r') as infile:
#             result.extend(json.load(infile))

#     with open('combined.json', 'w') as output_file:
#         json.dump(result, output_file)

# merge_JsonFiles(files)

import aspose.cells
from aspose.cells import License,Workbook,FileFormatType
workbook = Workbook("kinopoisk-1.json")
workbook.combine(Workbook("kinopoisk-2.json"))
workbook.save("kin.json")