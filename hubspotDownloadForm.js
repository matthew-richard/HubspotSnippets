jQuery(document).ready(function() {
  
  // Check every second whether the HubSpot
  // form has loaded
  var interval = setInterval(function() {
    if (jQuery('.hbspt-form form').length != 0) {
      var accessGranted = false;
      
      // Grant access to files when submit is clicked
      jQuery('.hbspt-form form input[type="submit"]').click(function(e) {
        if (!accessGranted) {
          jQuery.ajax({
            type: 'get',
            url: '/system/files/grantaccess',
            success: function(data, status, req) {
              accessGranted = true;
              jQuery('.hbspt-form form input[type="submit"]').click();
            }
          });
          
          // Complete AJAX request before proceeding with submit
          return false;
        }
        
        // If access has been granted to the file, proceed with submit
        // as usual
      });
      
      // Parse file name from query string
      var file = decodeURIComponent(/[?&]file=([^&]+)(&|$)/.exec(location.href)[1]);
      
      // Populate the hidden 'file' field
      jQuery('.hbspt-form form .hs_downloaded_white_paper input').val(file);
    }
      
    // Stop polling
    clearInterval(interval);
  }, 1000);
});
