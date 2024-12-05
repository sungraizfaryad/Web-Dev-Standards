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
    - Add `alt` attributes to all `<img>` tags and follow semantic HTML standards. Validate your HTML using [W3School HTML Validator](https://www.w3schools.com/html/html_validator.asp).
    - Use `<img>` tags for images. Use background CSS images only when necessary.

8. **Vendor and Custom Scripts**
    - Load vendor JavaScript in the header.
    - Load custom JavaScript in the footer for better performance.

9. **Tracking Codes**  
   Add Google Tag Manager, schema code, and tracking codes via WordPress hooks instead of directly embedding them.

10. **Editor and Formatting**  
    Use modern code editors like **VS Code** or **PHPStorm** for clean, well-indented code.

---

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
