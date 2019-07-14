from flask import Flask, request, jsonify, Response, abort, send_file
import os
from itertools import islice
import pathlib

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

# https://stackoverflow.com/a/7392391
textchars = bytearray({7,8,9,10,12,13,27} | set(range(0x20, 0x100)) - {0x7f})
is_text_file = lambda bytes: not bool(bytes.translate(None, textchars))

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    return response


def dir_items(path):
    files, folders = [], []
    for item in sorted(pathlib.Path(path).iterdir()):
        if item.name == '.DS_Store':
            continue
        if item.is_file():
            files.append({'name': item.name, 'type': 'file'})
        if item.is_dir():
            folders.append({'name': item.name, 'type': 'folder'})
    return folders + files

def file_description(path):
    # 'is_text': is_text_file(item)
    return f'{path} description description description description description description'

@app.route('/every_dir_in_path', methods=['POST'])
def every_dir_in_path():
    # root = request.get_json()['root'] # root should be without / in the end
    path = request.get_json()['path']
    
    dir_i = ''
    dirs = []
    # path_i = root
    # path_i = path[0]
    # path 
    # for dir_i in path.split(root)[-1].split('/'):
    for p in path:
        dir_i += p
        dirs.append(dir_items(dir_i))
        dir_i += '/'
    return jsonify(dirs)

@app.route('/last_dir_in_path', methods=['POST'])
def last_dir_in_path():
    path = request.get_json()['path']
    return jsonify(dir_items(path))

@app.route('/file_info', methods=['POST'])
def file_info():
    path = request.get_json()['path']

    info = {}
    info['description'] = 'lorem ipsum dolor sit'
    info['is_text'] = is_text_file(open(path, 'rb').read(1024))

    if info['is_text']:
        with open(path) as f:
            # info['head'] = ''.join(list(islice(f, 100))) # read 100 lines
            info['head'] = f.read(1000) # read 1000 characters

    return jsonify(info)

@app.route('/get_image', methods=['POST'])
def get_image():
    return send_file(request.get_json()['image_path'])

@app.route('/finder', methods=['POST'])
def open_in_finder():
    path = request.get_json()['path']
    os.system(f'open -R "{path}"')
    return Response(None, 200)

@app.route('/shell', methods=['POST'])
def eval_shell_script():
    # https://stackoverflow.com/a/6466753/4204843
    script = request.get_json()['script']
    if os.WEXITSTATUS(os.system(script)) == 0:
        return Response(None, 200)
    else:
        return Response(None, 500)
