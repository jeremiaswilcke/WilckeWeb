<?php
/**
 * Enables WP REST API access for the wwd_projekt CPT
 * Drop this file into wp-content/mu-plugins/
 */

// Expose wwd_projekt to REST API
add_filter('register_post_type_args', function ($args, $post_type) {
    if ($post_type === 'wwd_projekt') {
        $args['show_in_rest'] = true;
        $args['rest_base'] = 'projekte';
    }
    return $args;
}, 20, 2);

// Register meta fields for REST API
add_action('init', function () {
    $meta_fields = [
        'kunde_name'     => 'string',
        'kunde_email'    => 'string',
        'kunde_telefon'  => 'string',
        'token'          => 'string',
        'nachricht'      => 'string',
        'konfiguration'  => 'string',
        'preis'          => 'string',
        'monatlich'      => 'string',
        'status'         => 'string',
        'status_notiz'   => 'string',
        'notizen_intern' => 'string',
    ];

    foreach ($meta_fields as $field => $type) {
        register_post_meta('wwd_projekt', '_wwd_' . $field, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => function () use ($field) {
                // Public fields readable by anyone, writable by editors
                return current_user_can('edit_posts');
            },
        ]);
    }
});

// Allow querying by token via REST API
add_filter('rest_wwd_projekt_query', function ($args, $request) {
    $token = $request->get_param('token');
    if ($token) {
        $args['meta_query'] = [
            [
                'key'   => '_wwd_token',
                'value' => sanitize_text_field($token),
            ],
        ];
    }
    return $args;
}, 10, 2);

// Make meta fields readable without authentication
add_filter('rest_prepare_wwd_projekt', function ($response, $post) {
    $public_fields = ['kunde_name', 'status', 'status_notiz', 'preis', 'monatlich', 'konfiguration'];
    $meta = [];
    foreach ($public_fields as $field) {
        $meta['_wwd_' . $field] = get_post_meta($post->ID, '_wwd_' . $field, true);
    }
    $response->data['project_meta'] = $meta;
    return $response;
}, 10, 2);
