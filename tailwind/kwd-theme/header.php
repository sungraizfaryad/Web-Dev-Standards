<?php
/**
 * The header.
 *
 * This is the template that displays all the <head> section and everything up until main.
 *
 * @link    https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package AzanGuru
 * @since   1.0
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( "charset" ); ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php do_action( 'kwd_site_before' ); ?>

<div id="page" class="min-h-screen flex flex-col relative">

	<?php do_action( 'kwd_header' ); ?>

	<header class="main-site-header clearfix position-absolute mx-auto my-0 w-100 pt-6">
		<div class="container-lg">
			<div class="row">
                <div class="col-4 animated bounceInDown">
					<?php if ( has_custom_logo() ) { ?>
						<?php the_custom_logo(); ?>
					<?php } else { ?>
                        <a href="<?php echo get_bloginfo( 'url' ); ?>" class="font-extrabold text-lg uppercase">
							<?php echo get_bloginfo( 'name' ); ?>
                        </a>

                        <p class="text-sm font-light text-gray-600">
							<?php echo get_bloginfo( 'description' ); ?>
                        </p>

					<?php } ?>
                </div>
				<?php
				wp_nav_menu(
					array(
						'container_id'    => 'primary-menu',
						'container_class' => 'col-8 animated fadeInRightShort',
						'menu_class'      => 'list-unstyled list-inline text-end m-0',
						'theme_location'  => 'primary',
						'li_class'        => 'list-inline-item text-white',
						'fallback_cb'     => false,
					)
				);
				?>
            </div>
		</div>
	</header>
	<div id="content" class="site-content flex-grow">
		<?php do_action( 'kwd_content_start' ); ?>

		<main>
