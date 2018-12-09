from flask import Flask, request, jsonify, Response, abort, send_file
import os


SPACES_DIR = '/Users/tandav/Documents/spaces'

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    return response


def dir_items(path):
    items   = []
    files   = []
    folders = []
    for item in os.listdir(path):
        if item != '.DS_Store':
            if os.path.isfile(f'{path}/{item}'):
                files.append({ 'name' : item, 'type' : 'file' })
            else:
                folders.append({ 'name' : item, 'type' : 'folder' })
    items.extend(folders)
    items.extend(files)
    return items

def file_description(path):
    return f'{path} description description description description description description'

# @app.route('/<path>', methods=['GET'])
# http://flask.pocoo.org/snippets/57/
# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def list_dir(path):
#     print(path)
#     path = '/' + path
#     print(request.path)
#     if os.path.isdir(path):
#         return jsonify(dir_items(path))
#     elif os.path.isfile(path):
#         return jsonify({ 'file_description': file_description(path)})
#     else:
#         abort(404)

@app.route('/every_dir_in_path', methods=['POST'])
def every_dir_in_path():
    root = request.get_json()['root'] # root should be without / in the end
    path = request.get_json()['path']
    print('root', root)
    print('path', path)
    
    # root + rest = path
    dirs = []
    path_i = root

    for i in path.split(root)[-1].split('/'):
        path_i += i
        dirs.append(dir_items(path_i))
        path_i += '/'
    return jsonify(dirs)

@app.route('/last_dir_in_path', methods=['POST'])
def last_dir_in_path():
    path = request.get_json()['path']
    print(path)
    return jsonify(dir_items(path))