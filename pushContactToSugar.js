jQuery(document).ready(function() {
  
  // Check every second whether the HubSpot
  // form has loaded
  var interval = setInterval(function() {
      if (jQuery('.hbspt-form form').length != 0) {
                    
          // Push contact info to Sugar CRM (using Company server as proxy)
          // when form is submitted
          jQuery('.hbspt-form form').submit(function(e) {
              jQuery.ajax({
                  type: 'post',
                  url: 'https://company.com/sugar',
                  data: jQuery('.hbspt-form form').serialize()
              });

              console.log(JSON.stringify(jQuery('.hbspt-form form').serialize()));
          });
      }
      
      // Stop polling
      clearInterval(interval);
  }, 1000);
});
