var required_modules =
[
"jquery",
"util/gears",
"doc/docController",
"twitterFeed/twitterFeedController"
];

require(required_modules,
function($, Gears, DocController, TwitterFeedController) {
  $(function() {
    require.ready(function() {
      //START MAIN CODE
      //Innitializes the DocController.
      var docController = new DocController();
      docController.New();

      //If the systemData field in localStorage is not set, shows a welcome window.
      if (!localStorage.getItem('systemData')) {
        Gears.showPopup("<iframe style='border: 0px solid gray; width: 100%; height: 245px;' src='introduction.html'/>");
        var systemDataInitSettings = {
          "userStatus": "notnew",
          "feedInterval": "12000"
        };
        localStorage.setItem("systemData", JSON.stringify(systemDataInitSettings));
      }

      //Handles: Clicking the save doc icon
      //Action: Saves the document.
      $('#save').click(function() {
        docController.Save();
      });

      //Handles: Clicking the new doc icon.
      //Action: Clears the title and content field, or prompts the user to save.
      $('#new').click(function() {
        if (!docController.saved) {
          var options = {
            "yes": function() {
              docController.Save();
              docController.New();
            },
            "no": function() {
              docController.New();
            },
            "cancel": function() {
              //close warning
              }
          };
          Gears.warning('Thou should save that document?', options);
        } else {
          docController.New();
        }
      });

      //Handles: Clicking the open icon
      //Action: Opens the docbrowser, or prompts the user to save the current document.
      $('#open').click(function() {
        if (!docController.saved) {
          var options = {
            "yes": function() {
              docController.Save();
              Gears.docBrowser(docController.Index());
            },
            "no": function() {
              Gears.docBrowser(docController.Index());
            }
          };
          Gears.warning('Thou should save that document?', options);
        } else {
          Gears.docBrowser(docController.Index());
        }
      });

      //Handles: Clicking a document in the docbrowser
      //Action: Opens the document and hides the docbrowser
      $('#docBrowserDocs tr td:first-child').live('click',
      function() {
        var docId = $(this).parent().attr('id');
        docController.Open(docId);
        Gears.closePopup();
      });

      //Handles: clicking trashcan in docbrowser
      //Action: deleted the doc and removes the doc td representation
      $("#docBrowserDocs tr .docDestroy").live('click',
      function() {
        var id = $(this).attr('id');
        if (docController.Destroy(id)) {
          $("#" + id).fadeOut(400,
          function() {
            $(this).remove();
            if ($("#docBrowserDocs tbody").html() == "") {
              Gears.closePopup();
            }
          });
        }
      });

      //Handles: clicking outside popup.
      //Action: close the popup
      $(".shadowOverlay").live('click',
      function(event) {
        var $target = $(event.target);
        if ($target.attr("class") == "shadowOverlay") {
          Gears.closePopup();
        }
      });

      //Handles: pressing a key inside the title field
      //Action: sets the document to unsaved state
      $('#title').keydown(function() {
        docController.saved = false;
      });

      //Handles: pressing a key inside the content field
      //Action: sets the document to unsaved state
      $('#content').keydown(function() {
        docController.saved = false;
      });

      //Innitializes the TwitterFeed
      var twitterFeedController = new TwitterFeedController();


      //Handles: Clicking the bug button
      //Action: shows popup with information on how to report
      $('#oops').click(function() {
        Gears.showPopup("<div><h1>Crap.. :/</h1><p>No worries tough! Leave me a mail at <span style='color: rgba(211/100/59, 0.6);'>solitude@cygnus-group.net</span> or leave a issue on the <a href='https://github.com/andtan/Solitude/issues' target='_blank'>github page</a>. If you want a feature or have an opinion about an existing one feel free to email me. Your contribution to making the app better is much appreciated!</p></div>");
      });

      //END MAIN CODE
    });
  });
});
