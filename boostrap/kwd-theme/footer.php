<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link    https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package AzanGuru
 * @since   1.0
 */

?>
</main>

<?php do_action( 'kwd_content_end' ); ?>

</div>

<?php do_action( 'kwd_content_after' ); ?>

<footer id="colophon" class="site-footer" role="contentinfo">
	<?php do_action( 'kwd_footer' ); ?>

	<div class="container-lg">
        <div id="footer-widget-area" class="row">
		        <?php
		        if ( is_active_sidebar( 'footer-widget-area' ) ) {
			        dynamic_sidebar( 'footer-widget-area' );
		        }
		        ?>
        </div>
	</div>
</footer>

</div>

<?php wp_footer(); ?>

</body>
</html>
