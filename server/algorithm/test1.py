import csv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

uri = "mongodb+srv://aneshkarki07:anesh07@project.u9rs2.mongodb.net/?retryWrites=true&w=majority&appName=Project"

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")

    db = client["test"]  # Replace with your actual database name
    collection = db["fooditemsdetails"]  # Replace with your actual collection name

    # Correct file path with raw string to avoid escape character issues
    file_path = r'C:\Users\Acer\Desktop\projectHK\HamroKitchen\server\algorithm\rec.csv'

    with open(file_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['product_id', 'foodType', 'spiceLevel', 'dietType'])

        # Retrieve all documents from the collection
        all_documents = collection.find()

        for document in all_documents:
            product_id = document['_id']
            foodType = document.get('foodType', 'Not available')
            spiceLevel = document.get('spiceLevel', 'Not available')
            dietType = document.get('dietType', 'Not available')

            writer.writerow([product_id, str(foodType), str(spiceLevel), str(dietType)])

    print("CSV file 'users_data.csv' created successfully!")

except Exception as e:
    print("Error:", e)