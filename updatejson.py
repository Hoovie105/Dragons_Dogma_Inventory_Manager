import json

def categorize_armor(input_file, output_file):
    with open(input_file, 'r') as f:
        data = json.load(f)

    for item in data:
        armor_id = item.get('id')
        # Ensure the 'stats' key exists to avoid errors
        if 'stats' not in item:
            item['stats'] = {}
        
        # Apply logic based on the identified ID ranges
        if 1 <= armor_id <= 70:
            item['stats']['Armor Type'] = "Head"
        elif 71 <= armor_id <= 138:
            item['stats']['Armor Type'] = "Torso"
        elif 139 <= armor_id <= 192:
            item['stats']['Armor Type'] = "Arms"
        elif 193 <= armor_id <= 256:
            item['stats']['Armor Type'] = "Legs"
        elif 257 <= armor_id <= 269:
            item['stats']['Armor Type'] = "Outfits"
        elif armor_id >= 270:
            item['stats']['Armor Type'] = "Cloak"

    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)

categorize_armor('data/all_armor_data.json', 'data/all_armor_data_fixed.json')