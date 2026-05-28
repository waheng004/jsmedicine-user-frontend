import json
import re

with open('c:/Users/10779/NuxtProject/api.json', 'r', encoding='utf-8') as f:
    api_data = json.load(f)

user_apis = []

for path, methods in api_data.get('paths', {}).items():
    if '/api/v1/app/' in path:
        for method, details in methods.items():
            api_info = {
                'path': path,
                'method': method.upper(),
                'summary': details.get('summary', ''),
                'tags': details.get('tags', []),
                'operationId': details.get('operationId', '')
            }
            user_apis.append(api_info)
            print(f"{method.upper():6} {path:50} - {details.get('summary', '')[:40]}")

print(f"\n\nTotal user-facing APIs: {len(user_apis)}")

with open('c:/Users/10779/NuxtProject/user_apis.json', 'w', encoding='utf-8') as f:
    json.dump(user_apis, f, ensure_ascii=False, indent=2)