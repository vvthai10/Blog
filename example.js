script(src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js")
    script(src='/editormd/editormd.min.js')
    script(src='/editormd/lib/prettify.min.js')
    script(src='/editormd/lib/marked.min.js')
    script(src="./editormd/languages/en.js")
    script(type='text/javascript').
      var testEditor;
      $(function () {
      testEditor = editormd("test-editormd", { // Test editormd is the id of the div where the editor was previously defined.
      width: "98%",
      height: 500,
      syncScrolling: "single",
      path: "/editormd/lib/", //Your path path (the location of the lib package in the original resource file in our project)
      saveHTMLToTextarea: true,
      emoji: true,
      taskList: true,
      tex: true,
      flowChart: true,
      tocm: true,
      sequenceDiagram: true,
      lang: {
        name: "en"
      },
      /* Upload picture configuration */
      imageUpload: true,
      imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"], // Upload image support format
      imageUploadURL: "/api/v1/uploads/image" // Path to upload image
      
      });
      });



      
    link(rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous")
    link(rel="stylesheet" href="/editormd/css/editormd.css")
    link(rel="stylesheet" href="/editormd/css/editormd.preview.min.css")