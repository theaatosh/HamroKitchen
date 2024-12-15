import numpy as np
import pandas as pd
import sys
from sklearn.feature_extraction.text import TfidfVectorizer

def main(foodtype,spice,diet):
    df1=pd.read_csv(r'C:\Users\Acer\Desktop\projectHK\HamroKitchen\server\algorithm\feature.csv')
    # print(df1.to_string)
    df2 = pd.DataFrame({
        'Food Type': [foodtype],
        'Spice': [spice],
        'Diet': [diet]
    })
    # print(pd.DataFrame(df2))
    
    df1['feature_overview']=df1['Food Type']+" "+df1['Spice']+" "+df1['Diet']
    # print(pd.DataFrame(df1)) 


    preference_overview= df2['Food Type']+" "+df2['Spice']+" "+df2['Diet']

    # print(preference_overview)

    #calling tf-idf vectorizer
    vectorizer=TfidfVectorizer()

    feature_vector= vectorizer.fit_transform(df1['feature_overview'])
    preference_vector=vectorizer.transform([preference_overview.iloc[0]])


    #define function named as cosine_similarity
    def cosine_similarity(feature_vector, preference_vector):
        # Calculate dot product between vectors
        dot_product = np.dot(feature_vector, preference_vector.T).toarray()[0][0]

        # Calculate the norms (magnitudes) of each vector
        norm_a = np.linalg.norm(feature_vector.toarray())
        # print(norm_a)
        norm_b = np.linalg.norm(preference_vector.toarray())
        # print(norm_b)
        if norm_a==0.0 or norm_b==0.0:
            return 0.0 #returns similarity score as 0
        else:
            magnitude=norm_a*norm_b
            # Calculate cosine similarity
            similarity = dot_product/magnitude
            return similarity

    #calculating similarity score for each food items
    similarity_scores=[]
    for i in range(feature_vector.shape[0]):
        score=cosine_similarity(feature_vector[i],preference_vector)
        similarity_scores.append(score)

    #add similarity score to the dataframe
    df1['similarity_score']=similarity_scores
    # print(similarity_scores)
    # print(pd.DataFrame(df1))

    # sort dishes based on similarity scores
    df1_sorted=df1.sort_values(by='similarity_score',ascending=False)

    # display recommended dishes
    # print("You might like following dishes:")
    dishes = []
    for index, row in df1_sorted.iloc[:5].iterrows():
        # print(f"{row['Food Name']} with similarity score: {row['similarity_score']:.2f}")
        # print(f"{row['Food Name']}")
        dishes.append(row['Food Name'])

    # print(dishes)
    return dishes

if __name__ == '__main__':
    foodtype = sys.argv[1]
    spice=sys.argv[2]
    diet=sys.argv[3]
    # print(foodtype,spice,diet)
    result = main(foodtype,spice,diet)
    # print("The Dishes:")
    # print(result)