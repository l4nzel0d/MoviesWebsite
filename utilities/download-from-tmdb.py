from dotenv import load_dotenv
import os
import json
import requests
import urllib.parse


load_dotenv()
api_key = os.getenv("API_KEY")
bearer_token = os.getenv("BEARER_TOKEN")
if not api_key:
    raise ValueError("API_KEY not found in environment")

MOVIE_NAMES = [
    "Across the spiderverse",
    "Klaus",
    "Mission: Impossible Fallout",
    "wild robot",
    "godzilla king of the monsters",
    "we live in time",
    "alien",
    "dune part 2",
    "knives out",
    "lost in translation",
    "la la land",
    "dunkirk",
]

TV_SHOW_NAMES = [
    "Arcane",
    "Silo",
    "sopranos",
    "game of thrones",
    "ted lasso",
    "succession",
    "modern family",
]

PROJECT_NAMES = TV_SHOW_NAMES + MOVIE_NAMES

results = []

def save_image(image_url, file_name):
    """Download and save an image from the given URL."""
    response = requests.get(image_url, stream=True)  # Use stream=True to handle large images
    if response.status_code == 200:
        with open(file_name, "wb") as file:
            for chunk in response.iter_content(1024):  # Write in chunks to avoid memory issues
                file.write(chunk)
        print(f"Image saved as {file_name}")
    else:
        print(f"Failed to download image from {image_url}")

def main():
    headers = {"accept": "application/json", "Authorization": f"Bearer {bearer_token}"}

    for project_name in PROJECT_NAMES:
        processed_name = urllib.parse.quote(project_name, safe="")
        response = requests.get(
            f"https://api.themoviedb.org/3/search/multi?query={processed_name}&include_adult=false&language=en-US&page=1",
            headers=headers
        )
        data = response.json()
        
        if data.get("results"):
            first_result = data["results"][0]
            project_id = first_result["id"]
            project_title = first_result.get("name", first_result.get("title"))
            print(project_title)
            poster_path = first_result["poster_path"]
            
            if poster_path:  # Check if poster_path exists
                poster_url = f"https://image.tmdb.org/t/p/original{poster_path}"
                file_name = f"data/projects/{project_title.replace(' ', '_').replace(":", "")}.jpg"  
                save_image(poster_url, file_name)
            
            results.append({"name": project_title, "id": project_id})
            print(f"Project: {project_title}, ID: {project_id}, poster_path: {poster_path}")
        else:
            print(f"No results found for Project: {project_name}")

if __name__ == "__main__":
    main()
