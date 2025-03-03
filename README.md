# WP Dev Standards

This repository outlines best practices and standards for developing WordPress projects, ensuring maintainable, scalable, and efficient code.

## Folders

### Bootstrap
The `Bootstrap` folder includes starter files and guides for WordPress themes using the Bootstrap framework, offering a responsive grid system and pre-designed components.

### Tailwind
The `Tailwind` folder provides starter files and documentation for themes built with the Tailwind CSS framework, which emphasizes a utility-first approach and optimized CSS output.

---

## Guidelines

### General Practices
1. **Use Padding Instead of Fixed Sizes**  
   Buttons and form fields should not have fixed heights or widths. Use padding for consistent scalability.

2. **Avoid Hardcoding**
    - Do not hardcode Contact Form shortcodes.
    - Provide dynamic content as much as possible using tools like **ACF (Advanced Custom Fields)**. Avoid static content.

3. **Form Plugins**  
   Use **WPForms** instead of **Contact Form 7** for better performance and flexibility.

4. **JavaScript Best Practices**
    - Keep all JavaScript code in `.js` files instead of embedding it in the footer or any page.
    - Use `"use strict";` at the start of custom JS files to prevent conflicts.
    - Avoid using `ID` selectors in JavaScript. Prefer `class` selectors for flexibility and scalability.

5. **Function Naming**  
   Always prefix custom function names with the current project name to avoid conflicts. For example, instead of `myFunction`, use `projectName_myFunction`.

6. **Code Reviews**  
   If using AI tools like ChatGPT, review the generated code thoroughly before implementation to avoid potential issues or suboptimal approaches.

7. **Image Handling**
    - Use WordPress functions (e.g., `wp_get_attachment_url()`) to include media files rather than hardcoding URLs like `/wp-content/uploads/...`.
    - Add `alt` attributes to all `<img>` tags and follow semantic HTML standards. Validate your HTML using [W3School HTML Validator](https://validator.w3.org/).
    - Use `<img>` tags for images. Use background CSS images only when necessary.

8. **Vendor and Custom Scripts**
    - Load vendor JavaScript in the header.
    - Load custom JavaScript in the footer for better performance.

9. **Tracking Codes**  
   Add Google Tag Manager, schema code, and tracking codes via WordPress hooks instead of directly embedding them.

10. **Editor and Formatting**  
    Use modern code editors like **VS Code** or **PHPStorm** for clean, well-indented code.

11. **Value Checks**
    - Always check for the existence of a value before using it to avoid errors.
    - Use `isset()` or `!empty()` to check if a value exists.
    - Use `if ( function_exists() )` to check if a function exists before calling it.
    - Use `if ( class_exists() )` to check if a class exists before using it.
    - Use `if ( defined() )` to check if a constant is defined before using it.
    - Use `if ( is_callable() )` to check if a function is callable before calling it.
    - Use `if ( is_array() )` to check if a variable is an array before using it.
    - Use `if ( is_object() )` to check if a variable is an object before using it.
    - Use `if ( is_string() )` to check if a variable is a string before using it.
    - Use `if ( is_numeric() )` to check if a variable is numeric before using it.
    - Use `if ( is_int() )` to check if a variable is an integer before using it.
    
12. **Security**
    - Sanitize all inputs and outputs to prevent SQL injection and XSS attacks.
    - Use nonces to prevent CSRF attacks.
    - Use secure coding practices to prevent vulnerabilities.

13. **Performance**
    - Minify and concatenate CSS and JS files.
    - Optimize images for the web.
    - Use a caching plugin like **WP Rocket** for better performance.
    - Use a CDN for faster loading times.
    - Use lazy loading for images and videos.
    - Optimize database queries for better performance.

14. **SEO**
    - Use SEO-friendly URLs.
    - Use proper heading tags (H1, H2, H3, etc.).
    - Use meta tags for better SEO.
    - Use schema markup for better search engine visibility.
    - Use alt tags for images.
    - Use a sitemap for better indexing.

15. **Accessibility**
    - Use semantic HTML tags.
    - Use proper heading tags.
    - Use ARIA attributes for better accessibility.
    - Use proper color contrast for better readability.
    - Use keyboard navigation for better accessibility.

---

## WooCommerce Best Practices for Theme Development

This guide outlines best practices for integrating and customizing WooCommerce in a WordPress theme while maintaining compatibility and upgradability.

## Template Overrides

WooCommerce templates can be customized by copying them to your theme’s `woocommerce` folder and modifying them as needed.

### Steps to Override Templates:
1. **Locate the Template**  
   Find the template file inside the `woocommerce/templates` directory.

2. **Copy the Template**  
   Copy the template file to your theme inside the `woocommerce` folder.  
   Example:
   ```sh
   wp-content/themes/your-theme/woocommerce/cart/cart.php
    ```
3. **Modify the Template**
4. **Update the Template**  
   Ensure that the template file is updated when WooCommerce updates are released.
5. **Use Hooks**  
   Whenever possible, use hooks to modify the template instead of overriding it.
6. **Use Child Themes**  
   If you are using a child theme, place the template files in the child theme’s `woocommerce` folder.
7. **Use Conditional Tags**  
   Use conditional tags to check if WooCommerce is active before modifying templates.
8. **Use Hooks and Filters**  
   Use WooCommerce hooks and filters to modify the output instead of directly modifying the template files.
9. **Use Custom Hooks**  
   Create custom hooks in your theme to allow for easier customization of WooCommerce templates.
10. **Use Custom Functions**  
    Create custom functions in your theme to modify WooCommerce templates.

### Framework-Specific Suggestions

#### Bootstrap
While Bootstrap is widely used, it's becoming outdated compared to Tailwind CSS. Consider migrating to Tailwind for:
- Efficient CSS with unused styles purged.
- Improved performance, resulting in better scores on tools like Google Page Speed Insights.

#### Tailwind
Leverage Tailwind CSS for its utility-first approach and customizable configuration to build scalable designs faster.

---

### Recommended Plugins and Tools
- **Slick Slider**  
  Replace **OwlCarousel** with Slick Slider for better functionality, fewer issues, and minimal website impact.

- **HTML Validators**  
  Regularly validate your code to maintain semantic and accessible standards.

---

## Contribution
We welcome contributions to these standards. Please create a pull request with your proposed changes.

---

## License
This project is licensed under the MIT License. Refer to the LICENSE file for more information.
