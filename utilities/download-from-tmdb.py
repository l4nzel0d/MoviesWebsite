from dotenv import load_dotenv
import os
import json
import requests
import urllib.parse

PROJECTS_PATH = "data/projects/"

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
    "la la land",
    "dunkirk",
    "alien romulus",
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
    os.makedirs(os.path.dirname(file_name), exist_ok=True)
    response = requests.get(
        image_url, stream=True
    )  # Use stream=True to handle large images
    if response.status_code == 200:
        with open(file_name, "wb") as file:
            for chunk in response.iter_content(
                1024
            ):  # Write in chunks to avoid memory issues
                file.write(chunk)
    else:
        print(f"Failed to download image from {image_url}")


def main():
    headers = {"accept": "application/json", "Authorization": f"Bearer {bearer_token}"}

    configuration = requests.get("https://api.themoviedb.org/3/configuration", headers=headers).json()
    images_configuration = configuration["images"]

    reference_book_object = {"movie": {}, "tv": {}}

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
            if 'title' in first_result:
                project_object["title"] = first_result.get("title")
                project_object["type"] = 'movie'
                reference_book_object["movie"][project_object["id"]] = project_object["title"]
            else:
                project_object["title"] = first_result.get("name")
                project_object["type"] = 'tv'
                reference_book_object["tv"][project_object["id"]] = project_object["title"]


            project_object["poster_path"] = first_result["poster_path"]
            if project_object["poster_path"]:  # Check if poster_path exists
                for size in images_configuration["poster_sizes"]:
                    poster_url = f"https://image.tmdb.org/t/p/{size}{project_object['poster_path']}"
                    file_name = f"{PROJECTS_PATH}{project_object['id']}/{project_object["id"]}_poster_{size}.jpg"
                    project_object[f"poster_path_{size}_local"] = file_name
                    save_image(poster_url, file_name)
            

            images_response = requests.get(f"https://api.themoviedb.org/3/{project_object['type']}/{project_object['id']}/images", headers=headers).json()
            for index, logo_object in enumerate(images_response["logos"]):
                if logo_object["iso_639_1"] not in [None, "en"]: continue
                
                logo_url_end = logo_object["file_path"]

                logo_url = f"https://image.tmdb.org/t/p/original{logo_url_end}"
                logo_extension = logo_url_end.split(".")[-1]
                logo_file_name = f"{PROJECTS_PATH}{project_object['id']}/{project_object["id"]}_logo_{index}.{logo_extension}"
                save_image(logo_url, logo_file_name)
            
            project_object_path = f"{PROJECTS_PATH}/{project_object['id']}/{project_object['id']}.json"
            os.makedirs(os.path.dirname(project_object_path), exist_ok=True)

            with open(project_object_path, "w") as json_file:
                json.dump(project_object, json_file, indent=4)

            print(
                f"Project: {project_object['title']}, ID: {project_object['id']} - data saved"
            )

        else:
            print(f"No results found for Project: {project_name}")

    with open(f"{PROJECTS_PATH}/reference_book_object.json", "w") as reference_json:
        json.dump(reference_book_object, reference_json, indent=4)

if __name__ == "__main__":
    main()