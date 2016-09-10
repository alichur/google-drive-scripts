/**
*  Log the name of every mp4 file in the user's Drive
*/

function logVideoFiles(){
  var files = DriveApp.getFiles(),
      file;
  while (files.hasNext()) {
    file = files.next();
    if(file.getMimeType()=="video/mp4"){
      Logger.log(file.getName());
    }
  }
}

/**
* Log the name of every file nested directly under the given folder of the given type
* @param {String} parentFolder - the folder for which you are logging the children
* @param {String} type - the MIME type of the file e.g. "video/mp4"
*/
function logChildrenOfType(parentFolder, type){
   var folder = DriveApp.getFoldersByName(parentFolder).next(),
       files = folder.getFiles(),
       file;
  while (files.hasNext()) {
      file = files.next();
    if(file.getMimeType()===type){
      Logger.log(file.getName());
    }
  }
}

/**
*Log the download link for every file in the user's Drive.
*/
function getDownloadLinks(){
  var files = DriveApp.getFiles(),
    file;
  while (files.hasNext()) {
    file = files.next();
    //replacement is to overcome bug https://code.google.com/p/google-apps-script-issues/issues/detail?id=3794
    Logger.log(file.getDownloadUrl().replace('&gd=true',''));
  }
}

// if running from script.google.com hardcode the arguments you want to use for logAncestorsOfType()
function logAllNestedVideos(){
  logAncestorsOfType("your-folder-here", "your-type-here");
}

/*
* Takes a given folder, drills down into all subfolders and logs all descendants that match the given file type.
* @param {String} parentFolder - the top level folder
* @param {String} type - the MIME type of the file e.g. "video/mp4"
*/
function logAncestorsOfType(parentFolder, type){
  var folder = DriveApp.getFoldersByName(parentFolder).next(),
      files = folder.getFiles(),
      subFolders = folder.getFolders(),
      file;
  while (subFolders.hasNext()){
    var subFolder = subFolders.next();
    logAncestorsOfType(subFolder);
   }
  while (files.hasNext()) {
    file = files.next();
    if(file.getMimeType()===type){
      Logger.log(file.getName());
    }
  }
}
