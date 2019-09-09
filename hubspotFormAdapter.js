/**
 * This script submits the Company form data
 * to HubSpot so that the client can analyze it on
 * hubspot.com.
 *
 * There are two requirements for this to work:
 *   (1) The HubSpot form must be embedded in the same
 *       page as the Company form (Use display: none
 *       to make it invisible), and it must appear AFTER
 *       the Company form. See the company
 *       module's hooks/block_view.php.
 *   (2) The fields of the HubSpot form must be in the
 *       EXACT same order as those of the Company
 *       form; that's how the script determines which
 *       Company field corresponds to which HubSpot
 *       field. The HubSpot form cannot have a reCAPTCHA.
 * 
 * When Submit is clicked, the script copies the data
 * from the Company form to the hidden HubSpot form
 * and then submits the HubSpot form via AJAX. Once the
 * HubSpot form is done submitting, the Company
 * form is allowed to submit as usual.
 *
 * Date: 6/23/2016
 * Author: Matt Richard
 */
jQuery(document).ready(function() {
  
  // Company form always comes first
  var tlForm = jQuery('article form').first();
  
  tlForm.submit(function(e) {
    
    // Populate the hidden HubSpot form
    var tlInputs = tlForm.find("input[name!=\"file_name\"], select"); // Ignore hidden "file name" input
    var hsInputs = jQuery(".hbspt-form form").find("input, select");
    
    hsInputs.each(function(index) {
      // Ignore the submit button and the hidden hs_context input
      if (jQuery(this).attr("type") === "submit" || jQuery(this).attr("name") === "hs_context")
        return true;
      
      // Transfer form data according to input type
      var type = jQuery(this).attr("type");
      if (type == undefined) type = jQuery(this).prop("tagName").toLowerCase();
      switch(type) {
        case "tel":
        case "email":
        case "text":
          jQuery(this).val(jQuery(tlInputs.get(index)).val());
          break;
        case "select":
          jQuery(this).val(jQuery(tlInputs.get(index)).find("option:selected").text());
          break;
        case "checkbox":
          jQuery(this).prop("checked", jQuery(tlInputs.get(index)).prop("checked"));
          break;
        default:
          console.log("Encountered unhandled input type: " + type);
          break;
      }
    });
    
    // Submit the HubSpot form via synchronous AJAX
    var hsForm = jQuery(".hbspt-form form");
    jQuery.ajax({
      type: 'post',
      url:  hsForm.attr("action"),
      data: hsForm.serialize(),
      async: false
    });
    console.log("HubSpot submitted");
    
  }); // Proceed to submit Company...
});
