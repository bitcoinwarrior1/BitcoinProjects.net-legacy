
Project list:
https://docs.google.com/spreadsheets/d/1mabXCaQwt8pxq45xsqosEAUqZ-F6csD3r771DxE9fJE/edit#gid=0

This repo is a originally forked from [State of the Dapps](https://github.com/state-of-the-dapps/state-of-the-dapps) but has been altered for Bitcoin Projects and is an independant repo, project and website.

## Development

### Meteor Web Application

Ensure you have [Meteor](https://www.meteor.com/install) installed.

To run the app:

    $ meteor

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to see the app running.

## Sync tool

Go the the tool directory:

    $ cd private/sync

Install the Python requirements:

    $ pip install -r requirements.txt

Setup an OAuth2 key for the Google Sheets synchroniztion:

https://gspread.readthedocs.org/en/latest/oauth2.html

Sync:

    $ GOOGLE_APPLICATION_CREDENTIALS=/path/to/google-client-id.json MONGODB_URL=mongodb://127.0.0.1:3001/meteor ./sync.py

## License

Released under the MIT License.
