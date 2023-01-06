C2DISTRO SUBTHEME

Following these instructions, you can create a new subtheme to any c2distro project:
1. Copy the `c2distro_subtheme` into your project _themes/custom_ folder.
2. Change all c2distro_subtheme machine names according to your project.
3. Change the `name` and `short_name` values in `site.webmanifest` file.
4. generate your favicons using [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
   - Select in the "Favicon Generator Options" the "I cannot or I do not want to place favicon files at the root of my web site. Instead I will place them here:" option.
   - Fill this field with: `/{{ directory }}/images/favicon/`.
   - Complete the version and a random string in "Version/Refresh" tab (ex. first field: v1.0 and the second field value can be a random string).
5. After you generate the favicon:
   - Download, extract and overwrite the favicon package into `images/favicon` folder.
   - Copy the `favicon.ico` file into the custom theme root folder.
   - Copy the `mstile-150x150.png` into the custom theme root folder.
6. Change the project specific values in `package.json` file.
7. Create an `.env` file from `env.example` and rewrite the url.
8. Run `yarn start`. This' going to install all npm modules and start watching changes.

All global variables are in this subtheme will overwrite the default ones in the c2theme.

Enable the new theme as default.
Enjoy :)
