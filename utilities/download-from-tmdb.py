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
    "la la land",
    "dunkirk",
    "alien romulus",
    "heretic",
    "into the spiderverse",
    "once upon a time in america",
    "once upon a time in the west",
    "avengers infinity war",
    "north by northwest",
    "eternal sunshine of the spotless mind",
    "three billboards",
    "return of the king",
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
    "Chernobyl",
]

PROJECT_NAMES = TV_SHOW_NAMES + MOVIE_NAMES

PEOPLE = [
    "Timothee Chalamet",
    "Rebecca Ferguson",
    "Ludwig Goransson",
    "Jason Sudeikis",
    "Hannah Waddingham",
    "Emily Blunt",
    "John Krasinski",
    "Edgar Wright",
    "Christopher McQuarrie",
    "Matt Reeves",
    "Brad Pitt",
    "Christopher Nolan",
    "Colin Farrell",
    "Cristin Milioti",
    "Hailee Steinfeld",
    "Margaret Qualley",
    "Paul Mescal",
    "Pedro Pascal",
    "Tom Cruise",
    "Ryan Gosling",
    "Emma Stone",
    "Margot Robbie",
    "Scarlett Johansson",
    "Greta Gerwig",
    "Martin Scorsese",
    "Hugh Grant"
]


PROJECTS_PATH = "data/projects/"
PEOPLE_PATH = "data/people/"
SEARCH_URL = "https://api.themoviedb.org/3/search/multi?query={query}&include_adult=false&language=en-US&page=1"
DONWLOAD_IMAGE_URL = "https://image.tmdb.org/t/p/{size}{image_path}"


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
    configuration = requests.get(
        "https://api.themoviedb.org/3/configuration", headers=headers
    ).json()
    images_configuration = configuration["images"]

    chosen_program = int(
        input(
            "Choose program: 1. Download movie and tv data; or 2. Download people data --- "
        )
    )
    if chosen_program == 1:
        reference_book_path = f"{PROJECTS_PATH}reference_book_object.json"

        default_value = {"movie": {}, "tv": {}}

        reference_book_object = default_value

        # Try to load the dictionary from the JSON file if it exists
        if os.path.exists(reference_book_path):
            with open(reference_book_path, "r") as file:
                try:
                    reference_book_object = json.load(file)
                except json.JSONDecodeError:
                    print("Error decoding JSON. Using default values.")
        else:
            print(f"{reference_book_path} does not exist. Using default values.")

        for project_name in PROJECT_NAMES:
            project_object = {}
            processed_name = urllib.parse.quote(project_name, safe="")
            response = requests.get(
                SEARCH_URL.format(query=processed_name),
                headers=headers,
            )
            data = response.json()

            if data.get("results"):
                first_result = data["results"][0]
                project_object["id"] = str(first_result["id"])

                if (
                    project_object["id"] in reference_book_object["movie"]
                    or project_object["id"] in reference_book_object["tv"]
                ):
                    continue

                if "title" in first_result:
                    project_object["title"] = first_result.get("title")
                    project_object["type"] = "movie"
                    reference_book_object["movie"][project_object["id"]] = (
                        project_object["title"]
                    )
                else:
                    project_object["title"] = first_result.get("name")
                    project_object["type"] = "tv"
                    reference_book_object["tv"][project_object["id"]] = project_object[
                        "title"
                    ]

                project_object["poster_path"] = first_result["poster_path"]
                if project_object["poster_path"]:  # Check if poster_path exists
                    for size in images_configuration["poster_sizes"]:
                        poster_url = DONWLOAD_IMAGE_URL.format(
                            size=size, image_path=project_object["poster_path"]
                        )
                        file_name = f"{PROJECTS_PATH}{project_object['id']}/{project_object["id"]}_poster_{size}.jpg"
                        project_object[f"poster_path_{size}_local"] = file_name
                        save_image(poster_url, file_name)

                images_response = requests.get(
                    f"https://api.themoviedb.org/3/{project_object['type']}/{project_object['id']}/images",
                    headers=headers,
                ).json()
                for index, logo_object in enumerate(images_response["logos"]):
                    if logo_object["iso_639_1"] not in [None, "en"]:
                        continue

                    logo_url_end = logo_object["file_path"]

                    logo_url = f"https://image.tmdb.org/t/p/original{logo_url_end}"
                    logo_extension = logo_url_end.split(".")[-1]
                    logo_file_name = f"{PROJECTS_PATH}{project_object['id']}/{project_object["id"]}_logo_{index}.{logo_extension}"
                    save_image(logo_url, logo_file_name)

                project_object_path = (
                    f"{PROJECTS_PATH}{project_object['id']}/{project_object['id']}.json"
                )
                os.makedirs(os.path.dirname(project_object_path), exist_ok=True)

                with open(project_object_path, "w") as json_file:
                    json.dump(project_object, json_file, indent=4)

                print(
                    f"Project: {project_object['title']}, ID: {project_object['id']} - data saved"
                )

            else:
                print(f"No results found for Project: {project_name}")

        with open(reference_book_path, "w") as reference_json:
            json.dump(reference_book_object, reference_json, indent=4)

    elif chosen_program == 2:
        people_reference_book_path = f"{PEOPLE_PATH}people_reference_book_object.json"

        people_reference_book_object = {}

        # Try to load the dictionary from the JSON file if it exists
        if os.path.exists(people_reference_book_path):
            with open(people_reference_book_path, "r") as file:
                try:
                    people_reference_book_object = json.load(file)
                except json.JSONDecodeError:
                    print("Error decoding JSON. Using default values.")
        else:
            print(f"{people_reference_book_path} does not exist. Using default values.")

        for person_name in PEOPLE:
            person_object = {}
            processed_person_name = urllib.parse.quote(person_name, safe="")
            response = requests.get(
                SEARCH_URL.format(query=processed_person_name), headers=headers
            )
            data = response.json()
            if data.get("results"):
                first_result = data["results"][0]
                person_object["id"] = str(first_result["id"])
                if person_object["id"] in people_reference_book_object:
                    continue

                person_object["name"] = first_result["name"]
                person_object["department"] = first_result["known_for_department"]
                person_object["profile_path"] = first_result["profile_path"]

                people_reference_book_object[person_object["id"]] = person_object[
                    "name"
                ]

                for size in images_configuration["profile_sizes"]:
                    profile_url = DONWLOAD_IMAGE_URL.format(
                        size=size, image_path=person_object["profile_path"]
                    )
                    profile_extension = person_object["profile_path"].split(".")[-1]
                    file_name = f"{PEOPLE_PATH}{person_object["id"]}/{person_object["id"]}_profile_{size}.{profile_extension}"
                    person_object[f"profile_path_{size}_local"] = file_name
                    save_image(profile_url, file_name)

                person_object_path = (
                    f"{PEOPLE_PATH}{person_object['id']}/{person_object["id"]}.json"
                )
                os.makedirs(os.path.dirname(person_object_path), exist_ok=True)

                with open(person_object_path, "w") as json_file:
                    json.dump(person_object, json_file, indent=4)

                print(
                    f"Person: {person_object['name']}, ID: {person_object['id']} - data saved"
                )

            else:
                print(f"No results found for Person: {person_name}")
        with open(people_reference_book_path, "w") as reference_json:
            json.dump(people_reference_book_object, reference_json, indent=4)


if __name__ == "__main__":
    main()
