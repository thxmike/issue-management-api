# Issue Management API

## Purpose
This is an opinionated RESTFul API which supports basic CRUD operations for Issues. It was built using NodeJS / Express / MongoDb along with some opinionated libraries.

### Schema

- Issue - This is the Primary Model
    - id - a unique identifier associated to the file
    - code - a friendly identifier associated to the issue
    - name - a title or name of the issue
    - description - a detailed description of the issue
    - tenant_id - the external identifier used for segregating the data. This can be sent via the header or derived from a JWT token
    - status -  Used to communicate an issues status
    - files - an array of external files/fileid's assocaited to the issue
    - comments - an array of comments/commentid's associated to the issue.
    - nonce - used for client side concurrency
    - timestamps
      - deleted - date the item was soft deleted
      - created - date the item was created
      - updated - date the item was updated
      - completed - date the issue was completed

### Deployment

This can be run as a docker container or directly from the node run time. 
An example Dockerfile has been created to run this application as a container.
An example launch.json and tasks.json files have been included in this project to run the application directly

### Prerequisits

- NodeJS vs 14.6 - https://nodejs.org/en/download/
- MongoDB - https://docs.mongodb.com/manual/installation/

Once NodeJS is installed run the following off the root of the project directory
:
```
npm install 
```

This was built using visual studio code and leverages a launch.json
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "preLaunchTask": "build",
            "program": "${workspaceFolder}\\server.ts",
            "outFiles": [
                "${workspaceFolder}/bin/**/*.js"
            ],
            "resolveSourceMapLocations": [
                "${workspaceFolder}/bin/**/*.js",
                "!**/node_modules/**"
            ]
        }
    ]
}
```
and a tasks.json
```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "clean",
      "command": "del",
      "args": ["/S", "/Q", "/F", "bin"],
      "type": "shell",
      "presentation": {
        "reveal": "always",
        "panel": "shared"
      }
    },
    {
      "label": "transpile",
      "command": "tsc",
      "type": "shell",
      "presentation": {
        "reveal": "always",
        "panel": "shared"
      }
    },
    {
      "label": "build",
      "dependsOrder": "sequence",
      "dependsOn": [
         //"clean", 
         "transpile"
      ]
    }
  ]
}

```

### Testing

This application has yaml file for leveraging (artillery.io)[https://artillery.io/] 
Once artillery is installed, to run some initial testing the following command can be executed

``
artillery run test/performance/applications.yml --environment local
``

### Additional Information

- Built in Routes
    - /health - This application has a simple health endpoint to test to see if the application is OK

    - /list route- This application provides a basic list of endpoint information, with the route and verbs defined on these routes

    - /api-docs - This API has a swagger page to provide more detail about the applications - To access this documentation use the /api-docs route