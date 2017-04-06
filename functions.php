<?php /* Template Name: Sexxxy Template*/ ?>
<?php
function addPageSlugs($items)
{
    $out = array();

    foreach ($items as $item) {
        $slug = get_post_field('post_name', $item->object_id);
        $out [] = (object)array_merge((array)$item, ['slug' => $slug]);
    }
    return $out;
}

function my_get_menus($data)
{
    $menus = wp_get_nav_menus();
    $out = array();
    foreach ($menus as $menu) {
        $items = addPageSlugs(wp_get_nav_menu_items($menu->slug));
        $out[$menu->slug] = $items;
    }
    return $out;
}

function my_normalize($input)
{
    $output = [];

    foreach ($input as $key => $value) {
        $key = preg_replace('/post_/', '', $key);
        $renderedKeys = ['guid', 'content', 'excerpt', 'title'];
        if (array_search($key, $renderedKeys) != false) {
            $output[$key] = array(
                'rendered' => $value
            );
        } else {
            $output[$key] = $value;
        }
    }
    return $output;
}

function my_get_page(WP_REST_Request $request)
{
    $slug = $request->get_params()['slug'];
    if (!isset($slug)) {
        $url = get_home_url();
        $id = url_to_postid($url);
        $result = get_post($id);
    } else {
        $page = get_page_by_path($slug);
    }

    if (isset($page)) {
        $result = $page;
    }

    if (empty($result)) {
        return new WP_Error('my_get_page', 'Page not found', array('status' => 404));
    }


    return my_normalize((array)$result);
}

function my_get_posts(WP_REST_Request $request)
{
    $mapper = function ($value) {
        return my_normalize((array)$value);
    };
    $slug = $request->get_params()['slug'];

    if (!isset($slug)) {
        $results = get_posts();
    } else {
        $results = get_posts(array(
            'category_name' => $slug
        ));
    }

    return array_map($mapper, $results);
}

add_action('rest_api_init', function () {


    register_rest_route('reactiso1/v1', '/menus', array(
        'methods' => 'GET',
        'callback' => 'my_get_menus',
    ));
    register_rest_route('reactiso1/v1', '/pages', array(
        'methods' => 'GET',
        'callback' => 'my_get_page'
    ));
    register_rest_route('reactiso1/v1', '/pages/(?P<slug>.*)', array(
        'methods' => 'GET',
        'callback' => 'my_get_page'
    ));
    register_rest_route('reactiso1/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'my_get_posts'
    ));
    register_rest_route('reactiso1/v1', '/posts/(?P<slug>.*)', array(
        'methods' => 'GET',
        'callback' => 'my_get_posts'
    ));
});

wp_enqueue_script('script', get_template_directory_uri() . '/js/public/bundle.js', null, null, true);

wp_enqueue_style('slider', get_template_directory_uri() . '/js/public/styles.css', false, null, 'all');