<?php
function company_block_view($delta = '')
{
	$block = array();
	switch ($delta)
	{
		case NEWS_CONTENT_TYPE:
			$block['content'] = theme( NEWS_CONTENT_TYPE, template_preprocess_news_block() );
			break;
		case CONTACT_US:
			$form = drupal_get_form('company_contact_us_form');
			$block['content'] = drupal_render( $form );
			break;
		case TLX_CONTACT:
			$form = drupal_get_form('company_tlx_contact_form');
			$block['content'] = drupal_render( $form );
			break;
		case DEFENSE_INTEL:
			$form = drupal_get_form('company_defense_intel_form');
			$block['content'] = drupal_render( $form );
			break;
		case INFOCOMM_TRAINING:
			$form = drupal_get_form('company_infocomm_training_form');
			$block['content'] = drupal_render( $form );
			break;
		case REQUEST_A_QUOTE:
			$form = drupal_get_form('company_request_a_quote_form');
			$block['content'] = drupal_render( $form );
			break;
		case PARTNER_APPLICATION:
			$form = drupal_get_form('company_partner_application_form');
			$block['content'] = drupal_render( $form );
			break;
		case SIGN_UP:
			$form = drupal_get_form('company_sign_up_form');
			$block['content'] = drupal_render( $form );
			break;
		case PRODUCT_CATEGORIES:
			$block['content'] = theme(PRODUCT_CATEGORIES);
			break;
    case DOWNLOAD_FILE_INFO:
      // Generate the form
			$form = drupal_get_form('company_file_download_info_form');
      $block['content'] = drupal_render( $form ) ;
      
      /* Include hidden Hubspot form. We embed the form using script provided
         by HubSpot.com and use hubspotFormAdapter.js to transfer
         the visible form's data over to the hidden Hubspot form. */
      $block['content'] .= "<style> .hbspt-form { display: none; } </style>";
      $block['content'] .= "<!--[if lte IE 8]><script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"></script><![endif]--><script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"></script><script>  hbspt.forms.create({     portalId: '1854085',    formId: '228370a1-1e42-4a24-9d2f-6feff6573870'  });</script>";
      $block['content'] .= "<script src=\"/js/hubspotFormAdapter.js\"></script>";

			break;
		case NEWSLETTERS:
			$form = drupal_get_form('company_newsletters_form');
			$block['content'] = drupal_render( $form );
			break;
	}
	return $block;
}
function template_preprocess_news_block()
{
	$path = drupal_get_path('theme', 'company');
	drupal_add_js( $path . '/js/news.js' );
	$result = db_query("SELECT n.nid FROM {node} n WHERE n.type = '" . NEWS_CONTENT_TYPE . "' AND n.promote = 1 ORDER BY n.changed DESC");
	$nodes = array();
	foreach ($result as $record){
		$variables['views'][] = node_view( $node = node_load($record->nid), 'teaser' );
		$nodes[] = $node;
	}
	$variables['nodes'] = $nodes;

	return $variables;
}
function company_preprocess_categories(&$variables) {
	$menuItem = variable_get(PRODUCT_MENU_ITEM, 'menu-main:0');
	$menuItem = explode(':', $menuItem);
	$tree = menu_tree( $menuItem[0] );
	if(isset($tree[$menuItem[1]]['#below']))
		$by_category = $tree[$menuItem[1]]['#below'][reset(element_children($tree[$menuItem[1]]['#below']))]['#below'];

	$variables['content'] = drupal_render($by_category);
}