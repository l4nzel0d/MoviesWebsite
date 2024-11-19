import sys
import json
import unicodedata

def normalize_text(text):
    return text
    return (unicodedata.normalize('NFKD', text)
        .replace('—', '-')
        .replace('‘', "'")
        .replace('’', "'")
        .replace('“', '"')
        .replace('”', '"')) 

def main():
    if len(sys.argv) != 2:
        print("Usage: python txt-to-json-article-object.py <ArticleName>")
        sys.exit(1)
    
    article_name = sys.argv[1]
    input_file_name = f"utilities/make-articles-program/input-files/{article_name}.txt"
    output_file_name = f"data/articles/{article_name}-Article.json"
    img_path = f"data/articles/{article_name}-Article-Image.jpg"

    try:
        with open(input_file_name, 'r', encoding="utf-8") as input_file:
            content = input_file.readlines()
    except FileNotFoundError:
        print(f"Error: File '{input_file_name}' not found.")
        sys.exit(1)
    except UnicodeDecodeError:
        print("Error: Unable to decode the input file. Ensure it is UTF-8 encoded.")
        sys.exit(1)
    
    headline = normalize_text(content[0].strip())
    paragraphs = [normalize_text(p.strip()).replace('\n', '').replace('"', '\"')
                   for p in ''.join(content[1:]).split("\n\n") if p.strip()]

    formatted_paragraphs = [f"<p>{paragraph}</p>" for paragraph in paragraphs]

    article_data = {
        "ImgPath": img_path,
        "Headline": headline,
        "TextContent": ' '.join(formatted_paragraphs)
    }

    with open(output_file_name, 'w') as output_file:
        json.dump(article_data, output_file, indent=4)

if __name__ == "__main__":
    main()