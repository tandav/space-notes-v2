from flask import Flask, request, jsonify, Response, abort, send_file
import os
from itertools import islice
import pathlib
import config
import path_utils

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    return response


def file_description(path):
    # 'is_text': is_text_file(item)
    return f'{path} description description description description description description'


@app.route('/path/<path:path>', methods=['GET'])
def get_space_notes_and_files(path):
    '''returns info about every dir in path'''
    print(path)
    dir_i = config.root
    # dirs_path = [str(dir_i)]
    dirs_path = ['']
    dirs = [path_utils.dir_items(dir_i)]

    for part in path.split('/'):
        dir_i /= part
        dirs.append(path_utils.dir_items(dir_i))
        dirs_path.append(dir_i.name)
    return jsonify({
        'dirs': dirs,
        'path': dirs_path,
    })

@app.route('/last_dir_in_path/<path:path>', methods=['GET'])
def last_dir_in_path(path):
    return jsonify(path_utils.dir_items(config.root / path))

@app.route('/file_info', methods=['POST'])
def file_info():
    path = request.get_json()['path']
    return jsonify(path_utils.file_info(path))

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
