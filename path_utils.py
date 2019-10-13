import pathlib


def dir_items(path):
    files, folders = [], []
    for item in sorted(path.iterdir()):
        if item.name == '.DS_Store':
            continue
        if item.is_file():
            files.append({'name': item.name, 'type': 'file'})
        if item.is_dir():
            folders.append({'name': item.name, 'type': 'folder'})
    return folders + files


def is_text_file(bytes):
    # https://stackoverflow.com/a/7392391
    textchars = bytearray({7, 8, 9, 10, 12, 13, 27} | set(range(0x20, 0x100)) - {0x7f})
    return not bool(bytes.translate(None, textchars))


def file_info(path):
    info = {}
    info['description'] = 'lorem ipsum dolor sit'
    info['is_text'] = is_text_file(open(path, 'rb').read(1024))

    if info['is_text']:
        with open(path) as f:
            # info['head'] = ''.join(list(islice(f, 100))) # read 100 lines
            info['head'] = f.read(1000) # read 1000 characters

    return info
