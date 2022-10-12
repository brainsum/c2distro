C2DISTRO SUBTHEME
--------------------------

Following these instructions, you can create a new subtheme to any c2distro project:
- copy the c2distro_subtheme into your proiect themes/custom folder
- change the "name" and "short_name" values in site.webmanifest file
- generate your favicons using https://realfavicongenerator.net/
  - Select in the "Favicon Generator Options" the "I cannot or I do not want to place favicon files at the root of my web site. Instead I will place them here:" option
    - Fill this field with: "/{{ directory }}/images/favicon/"
    - Complete the version and a random string in "Version/Refresh" tab (ex first field: v1.0 and the second field value can be a random string)
    After you generate the favicon:
      - Download, extract and overwrite the favicon package into images/favicon folder
      - Copy the favicon.ico into the custom theme root folder
      - Copy the mstile-150x150.png into the custom theme root folder
- change the "name" value in package.json file
- create an .env file from env.example and rewrite the url

Enable the new theme as default.
Enjoy :)



