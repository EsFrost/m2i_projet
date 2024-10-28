# Todo Backend

## Categories :

- ### Categories Model:

  - Create an edit category function
  - Add it to exports

- ### Categories Controller :

  - Create the edit category function in the controller
  - Get token and parse it. Only admin can edit categories
  - Add it to exports

- ### Categories Routes :
  - Add the route to the file

---

## Comments :

- ### Comments Model :

  - Create add comment
  - Create edit comment
  - Create delete comment

- ### Comments Controller :

  - Get the token and parse it for all the functions above
  - Make the checks, the user needs to post under his own id, can only edit or delete his own comments. Also, check if we are posting on the correcting photo
  - Don't forget the security checks

- ### Comments Routes :
  - Add the route to the file

---

## Security :

Add token checks wherever they're needed (photos for example need to have token checks).
