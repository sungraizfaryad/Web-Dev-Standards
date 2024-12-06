<?php
/**
 * Template Name: WooCommerce
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main container mx-auto" role="main">

		<?php woocommerce_content(); ?>

	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>
