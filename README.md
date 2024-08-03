Notes API

This is a simple Notes API built with Node.js and Express. It allows you to create, retrieve, update, delete, and query notes based on tags.

1.	Clone the repository:  git clone https://github.com/Nishant-Raj-Hub/Regrip-Node.js-assignment.git
2.	Navigate to the project directory
3.	Install dependencies: npm install
4.	Start the server: node app.js
The server will start on port 8000. You should see a message: Server is running on port 8000
	
	I’ve planted 3 dummy data but you can add yours

API Endpoints:

1. Create a New Note
	URL: /notes
	Method: POST
	Body: {
   	 "title": "Your Note Title",
   	 "content": "Your Note Content",
   	 "tags": ["tag1", "tag2"]
    }
   
2. Retrieve All Notes
	URL: /notes
	Method: GET

3. Retrieve a Note by ID
  URL: /notes/:id
  Method: GET

4. Update a Note by ID
URL: /notes/:id
Method: PUT
Body:
{
    "title": "Updated Note Title",
    "content": "Updated Note Content",
    "tags": ["updatedTag1", "updatedTag2"]
}

5. Delete a Note by ID
URL: /notes/:id
Method: DELETE

6. Add Tags to a Note
URL: /notes/:id/tags
Method: PUT
Body:
{
    "tags": ["newTag1", "newTag2"]
}

7. Remove Tags from a Note
URL: /notes/:id/tags
Method: DELETE
Body:
{
    "tags": ["tagToRemove1", "tagToRemove2"]
}

 8. Query Notes by Tags
URL: /notes/query
Method: POST
Body:
{
    "query": {
        "AND": ["tag1"],
        "OR": ["tag2"],
        "NOT": ["tag3"]
    }
}

you can test this using POSTMAN or any other software.


NOTE: The data is stored with in-memory data structured (as mentioned in the assignment) so when you restart the server, all the data which you inserted will be vanished.
