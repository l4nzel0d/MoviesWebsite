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
    "alien romulus",
    "anora",
    "heretic",
]

TV_SHOW_NAMES = [
    "Arcane",
    "Silo",
    "sopranos",
    "game of thrones",
    "ted lasso",
    "succession",
    "modern family",
    "Breaking Bad",
    "Game of Thrones",
    "The Sopranos",
    "Sherlock",
    "The Twilight Zone",
    "Firefly",
    "True Detective",
    "Fargo",
    "Stranger Things",
    "Black Mirror",
    "The Office (US)",
    "The Crown",
    "Mr. Robot",
    "Better Call Saul",
    "The Mandalorian",
    "Westworld",
    "Peaky Blinders",
    "The Witcher",
    "Narcos",
    "Money Heist",
    "The Boys",
    "The Expanse",
    "The Handmaid's Tale",
    "Chernobyl"
]

PROJECT_NAMES = TV_SHOW_NAMES + MOVIE_NAMES



def save_image(image_url, file_name):
    """Download and save an image from the given URL."""
    response = requests.get(
        image_url, stream=True
    )  # Use stream=True to handle large images
    if response.status_code == 200:
        with open(file_name, "wb") as file:
            for chunk in response.iter_content(
                1024
            ):  # Write in chunks to avoid memory issues
                file.write(chunk)
        print(f"Image saved as {file_name}")
    else:
        print(f"Failed to download image from {image_url}")


def main():
    headers = {"accept": "application/json", "Authorization": f"Bearer {bearer_token}"}

    reference_book_object = {}

    for project_name in PROJECT_NAMES:
        project_object = {}
        processed_name = urllib.parse.quote(project_name, safe="")
        response = requests.get(
            f"https://api.themoviedb.org/3/search/multi?query={processed_name}&include_adult=false&language=en-US&page=1",
            headers=headers,
        )
        data = response.json()

        if data.get("results"):
            first_result = data["results"][0]
            project_object["id"] = first_result["id"]
            project_object["title"] = first_result.get(
                "name", first_result.get("title")
            )

            print(project_object["title"])
            reference_book_object[project_object["id"]] = project_object["title"]


            project_object["poster_path"] = first_result["poster_path"]
            if project_object["poster_path"]:  # Check if poster_path exists
                poster_url = f"https://image.tmdb.org/t/p/original{project_object['poster_path']}"
                file_name = f"data/projects/{project_object['title'].replace(" ", "_").replace(":", "")}.jpg"
                project_object["poster_path_local"] = file_name
                save_image(poster_url, file_name)

            project_object_path = f"data/projects/{project_object['id']}.json"
            with open(project_object_path, "w") as json_file:
                json.dump(project_object, json_file, indent=4)

            print(
                f"Project: {project_object['title']}, ID: {project_object['id']}, poster_path: {project_object['poster_path']}"
            )

        else:
            print(f"No results found for Project: {project_name}")

    with open("data/projects/reference_book_object.json", "w") as reference_json:
        json.dump(reference_book_object, reference_json, indent=4)

if __name__ == "__main__":
    main()
