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
    '''https://stackoverflow.com/a/7392391'''
    textchars = bytearray({7, 8, 9, 10, 12, 13, 27} | set(range(0x20, 0x100)) - {0x7f})
    return not bool(bytes.translate(None, textchars))


def file_info(path):
    info = {}
    info['description'] = 'lorem ipsum dolor sit'
    
    with open(path, 'rb') as f:
        head = f.read(1024)
    
    if is_text_file(head):
        info['is_text'] = True
        info['head']    = head.decode().replace('\r\n', '\n')
    else:
        info['is_text'] = False
    
    return info
