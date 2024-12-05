<?php

/**
 * Theme setup.
 */
function kwd_setup() {
	add_theme_support( 'title-tag' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'kwd' ),
		)
	);

	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		)
	);

    add_theme_support( 'custom-logo' );
	add_theme_support( 'post-thumbnails' );

	add_theme_support( 'align-wide' );
//	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'woocommerce' );

//	add_theme_support( 'editor-styles' );
//	add_editor_style( 'css/editor-style.css' );
	remove_image_size( '2048x2048' );
	remove_image_size( '1536x1536' );
}
add_action( 'after_setup_theme', 'kwd_setup' );


// Create a function to register Poppins font and DM Sans font.
function ag_fonts_url(): string {
	$fonts_url = '';

	$poppins = _x( 'on', 'Poppins font: on or off', 'azanguru' );
	$dm_sans = _x( 'on', 'DM Sans font: on or off', 'azanguru' );

	if ( 'off' !== $poppins || 'off' !== $dm_sans ) {
		$font_families = array();

		if ( 'off' !== $poppins ) {
			$font_families[] = 'Poppins:400,500,600,700';
		}

		if ( 'off' !== $dm_sans ) {
			$font_families[] = 'DM Sans:400,500,700';
		}

		$query_args = array(
			'family'  => urlencode( implode( '|', $font_families ) ),
			'display' => 'swap',
		);

		$fonts_url = add_query_arg( $query_args,
			'https://fonts.googleapis.com/css' );
	}

	return $fonts_url;
}

/**
 * Enqueue theme assets.
 */
function kwd_enqueue_scripts() {
	$theme = wp_get_theme();

	wp_enqueue_style( 'opensans-google-fonts', 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap', false );
	wp_enqueue_style( 'manrope-google-fonts', 'https://fonts.googleapis.com/css?family=Manrope:400&display=swap', false );
	wp_enqueue_style( 'animatecss', kwd_asset( 'css/animate.min.css' ), array(), '4.1.1' );
	wp_enqueue_style( 'boostrap', kwd_asset( 'css/bootstrap.css' ), array(), $theme->get( 'Version' ) );
	wp_enqueue_script( 'boostrap', kwd_asset( 'js/bootstrap.min.js' ), array(), '5.0.2' );
	wp_enqueue_script( 'slick-slider', kwd_asset( 'resources/slick/slick.min.js' ), array(), '1.8.1' );
	//wp_enqueue_script( 'css3-animate', kwd_asset( 'js/css3-animate-it.js' ), array(), $theme->get( 'Version' ) );
	wp_enqueue_script( 'kwd', kwd_asset( 'js/app.js' ), array(), $theme->get( 'Version' ), true );
}

add_action( 'wp_enqueue_scripts', 'kwd_enqueue_scripts' );

/**
 * Get asset path.
 *
 * @param string  $path Path to asset.
 *
 * @return string
 */
function kwd_asset( $path ) {
	if ( wp_get_environment_type() === 'production' ) {
		return get_stylesheet_directory_uri() . '/' . $path;
	}

	return add_query_arg( 'time', time(),  get_stylesheet_directory_uri() . '/' . $path );
}

/**
 * Adds option 'li_class' to 'wp_nav_menu'.
 *
 * @param string  $classes String of classes.
 * @param mixed   $item The current item.
 * @param WP_Term $args Holds the nav menu arguments.
 *
 * @return array
 */
function kwd_nav_menu_add_li_class( $classes, $item, $args, $depth ) {
	if ( isset( $args->li_class ) ) {
		$classes[] = $args->li_class;
	}

	if ( isset( $args->{"li_class_$depth"} ) ) {
		$classes[] = $args->{"li_class_$depth"};
	}

	return $classes;
}

add_filter( 'nav_menu_css_class', 'kwd_nav_menu_add_li_class', 10, 4 );

/**
 * Adds option 'submenu_class' to 'wp_nav_menu'.
 *
 * @param string  $classes String of classes.
 * @param mixed   $item The current item.
 * @param WP_Term $args Holds the nav menu arguments.
 *
 * @return array
 */
function kwd_nav_menu_add_submenu_class( $classes, $args, $depth ) {
	if ( isset( $args->submenu_class ) ) {
		$classes[] = $args->submenu_class;
	}

	if ( isset( $args->{"submenu_class_$depth"} ) ) {
		$classes[] = $args->{"submenu_class_$depth"};
	}

	return $classes;
}

add_filter( 'nav_menu_submenu_css_class', 'kwd_nav_menu_add_submenu_class', 10, 3 );

function ag_widgets_init(): void {

	register_sidebar(
		array(
		'name'          => __( 'Primary Sidebar', 'kwd' ),
		'id'            => 'primary-sidebar',
		'description'   => __( 'This sidebar appears in the blog posts page.', 'kwd' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div></section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2><div class="widget-content">',
	)
	);
	register_sidebar(
		array(
		'name'          => __( 'Footer Widgets', 'kwd' ),
		'id'            => 'footer-widgets',
		'description'   => __( 'This sidebar appears in the footer of each page.', 'kwd' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div></section>',
		'before_title'  => '<h4 class="widget-title text-gray-800 text-2xl font-medium mb-4">',
		'after_title'   => '</h4><div class="widget-content col-span-1 md:col-span-2">',
	)
	);
}

add_action( 'widgets_init', 'ag_widgets_init' );

