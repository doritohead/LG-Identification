fx_version 'adamant'
games { 'gta5' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

lua54 'yes'

description 'LG Identification'

author 'Lance Good'

version '1.0.0'

ui_page {
	'html/index.html'
}

files {
    'html/images/*.png',
    'html/main.js',
    'html/style.css',
    'html/index.html',
}
shared_scripts {
    'config.lua'
}

server_scripts {
	'server.lua'
}

client_scripts {
	'client.lua'
}