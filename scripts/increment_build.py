import re
import os

def increment_build():
    version_file = os.path.join(os.getcwd(), 'src', 'version.ts')
    
    if not os.path.exists(version_file):
        print(f"Error: {version_file} not found.")
        return

    with open(version_file, 'r') as f:
        content = f.read()

    # Regex to find BUILD_NUMBER = X;
    match = re.search(r'export const BUILD_NUMBER = (\d+);', content)
    if match:
        current_build = int(match.group(1))
        new_build = current_build + 1
        new_content = re.sub(r'export const BUILD_NUMBER = (\d+);', f'export const BUILD_NUMBER = {new_build};', content)
        
        with open(version_file, 'w') as f:
            f.write(new_content)
        
        print(f"Build number incremented to {new_build}")
        
        # Also stage the file
        os.system(f'git add {version_file}')
    else:
        print("Error: BUILD_NUMBER not found in src/version.ts")

if __name__ == "__main__":
    increment_build()
