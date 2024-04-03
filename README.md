# Bootcamps Zendesk

## Customizations

We are primarily leveraging the Copenhagen Zendesk theme (see below), with some customizations.

### To update
- Go to: https://mitbootcamps.zendesk.com/theming/workbench
- Click on `Add theme`
- Select `Add from Github`
- Use this repo: `https://github.com/mitodl/bootcamps-zendesk-theme`
- Name the newly-created theme
- Click `Customize` on the theme
   - Under `Article Page Settings`
      - Uncheck `Author`
      - Uncheck `Comments`
      - Uncheck `Follow`
       - Uncheck `Social Sharing`
   - Under `Home Page Elements`
      - Uncheck `Recent Activity`
- When ready, choose `Set as live theme` in the menu for the new theme

Note that we have customized the footer of the theme to match the footer on the Boootcamps site.


## Copenhagen Theme by Zendesk

The Copenhagen theme is the default Zendesk Guide theme. It is designed to be responsive and accessible.
Learn more about customizing Zendesk Guide [here](https://support.zendesk.com/hc/en-us/sections/206670747).

The Copenhagen theme for Help Center consists of:
- [Manifest file](#manifest-file)
- [Set of templates](#templates)
- [Stylesheet and JavaScript files](#stylesheet-and-javascript)
- [Assets folder](#assets).

### How to use
This is the latest version of the Copenhagen theme available for Guide. It is possible to use this repository as a starting point to build your own custom theme. You can fork this repository as you see fit.
You can use your favorite IDE to develop themes and preview your changes locally in a web browser using [ZCLI](https://github.com/zendesk/zcli/). For details, read the [zcli themes](https://github.com/zendesk/zcli/blob/master/docs/themes.md) documentation.

### Customizing your theme
Once you have forked this repository you can feel free to edit templates, CSS, JavaScript and manage assets.

#### Manifest file
The manifest allows you to define a group of settings for your theme that can then be changed via the UI in Theming Center.
You can read more about the manifest file [here](https://support.zendesk.com/hc/en-us/articles/115012547687).

#### Settings folder
If you have a variable of type `file`, you need to provide a default file for that variable in the `/settings` folder. This file will be used on the settings panel by default and users can upload a different file if they like.
Ex.
If you would like to have a variable for the background image of a section, the variable in your manifest file would look something like this:

```js
{
  ...
  "settings": [{
    "label": "Images",
    "variables": [{
      "identifier": "background_image",
      "type": "file",
      "description": "Background image for X section",
      "label": "Background image",
    }]
  }]
}

```

And this would look for a file inside the settings folder named: `background_image`

#### Adding assets
You can add assets to the asset folder and use them in your CSS, JavaScript and templates.
You can read more about assets [here](https://support.zendesk.com/hc/en-us/articles/115012399428)

### Publishing your theme
After you have customized your theme you can download the repository as a `zip` file and import it into Theming Center.

You can follow the documentation for importing [here](https://support.zendesk.com/hc/en-us/articles/115012794168).

You can also import directly from GitHub - learn more [here](https://support.zendesk.com/hc/en-us/articles/4408832476698-Setting-up-the-GitHub-integration-with-your-Guide-theme).

### Templates
The theme includes all the templates that are used for a Help Center that has *all* the features available.
List of templates in the theme:
* Article page
* Category page
* Community post list page
* Community post page
* Community topic list page
* Community topic page
* Contributions page
* Document head
* Error page
* Footer
* Header
* Home page
* New community post page
* New request page
* Requests page
* Search results page
* Section page
* Subscriptions page
* User profile page

You can add up to 10 optional templates for:
 * Article page
 * Category page
 * Section page

You do this by creating files under the folders `templates/article_pages`, `templates/category_pages` or `templates/section_pages`.
Learn more [here](https://support.zendesk.com/hc/en-us/articles/360001948367).

## Stylesheet and JavaScript

We use Rollup to compile the JS and CSS files that are used in the theme - `style.css` and `script.js`. Do not edit these directly as they'll be regenerated during release.

To get started:

```console
$ yarn install
$ yarn start
```

This will compile all the source code in `src` and `styles` and watch for changes. It will also start `preview`.

Notes:

- We intentionally do not use babel when compiling `script.js` so we can get a clean bundle output. Make sure to only use widely supported ecmascript features (ES2015).
- Do not edit `style.css` and `script.js` directly. They are regenerated during release.
- Preview requires login so make sure to first run `yarn zcli login -i` if you haven't done that before.

### Assets
The Copenhagen theme doesn't have any assets, but you can add assets to your theme by placing them in the `assets` folder.

# Accessibility testing

We use a custom node script that runs [lighthouse](https://github.com/GoogleChrome/lighthouse) for automated accessibility testing.

There are two ways of running the script:
- **Development mode** - it runs the accessibility audits on the local theme preview, on a specific account. It requires `zcli themes:preview` to be running;
- **CI mode** - it runs the accessibility audits on the live theme of a specific account.

Depending on the scope of testing, some manual testing might be needed in addition to the above.
Tools like [axe DevTools](https://www.deque.com/axe/devtools/), screen readers e.g. [VoiceOver](https://www.apple.com/voiceover/info/guide/_1121.html), [contrast checkers](https://webaim.org/resources/contrastchecker/) etc. can assist such testing.

## Development mode

To run the accessibility audits while changing the theme:

1. Start compiling and previewing changes like you normally would:

```console
$ yarn install
$ yarn start
```

2. Create a `.a11yrc.json` file in the root folder (see [example](.a11yrc.json.example));
   1. Specify the account/subdomain to preview the theme making sure it matches the active `zcli` profile
   2. Fill `username` and `password` with the credentials of an admin user;
   3. Specify which `urls` to test (if left empty, the script will test all urls);

3. In a separate console, run the accessibility audits in development mode:

```console
yarn test-a11y -d
```

A11y audits will then run on the preview started in step `1`.

## CI mode

To run the accessibility audits on the live theme of a specific account, one must:

1. Install node modules:

```console
yarn install
```

2. Set `end_user_email`, `end_user_password`, `subdomain` and `urls` as environment variables and run the accessibility audits in CI mode i.e.:

```console
end_user_email=<EMAIL> \
end_user_password=<PASSWORD> \
subdomain=<SUBDOMAIN> \
urls="
    https://<SUBDOMAIN>.zendesk.com/hc/en-us/
    https://<SUBDOMAIN>.zendesk.com/hc/en-us/requests/new
    https://<SUBDOMAIN>.zendesk.com/hc/en-us/requests" \
yarn test-a11y
```

## Ignore list

If there is a known accessibility issue that should be ignored or can't be fixed right away, one may add a new entry to the ignore list in the [script's configuration object](bin/lighthouse/config.js). This will turn the accessibility issue into a warning instead of erroring.

The entry should include:
- the audit id;
- a `path` as a url pattern string;
- a `selector` as a string.

For example:

```js
  custom: {
    ignore: {
      tabindex: [
        {
          path: "*",
          selector: "body > a.skip-navigation",
        },
      ],
      aria-allowed-attr: [
        {
          path: "/hc/:locale/profiles/:id",
          selector: "body > div.profile-info"
        }
      ]
    },
  },
```

In this example, errors for the audit `tabindex` with the selector `body > a.skip-navigation` will be reported as warnings in all pages (`*`). The same will happen for the audit `aria-allowed-attr` with the selector `body > div.profile-info`, but only for the user profile page `/hc/:locale/profiles/:id`.

Please keep in mind that this should only be used when strictly necessarity. Accessibility should be a focus and a priority when making changes to the theme.

# Quick Setup Recall (Running and testing theme locally)

NOTE: This guide is to quickly setup and run the theme locally. To know more about how to customize the theme, See all the details above.

1. Create a trial account on https://www.zendesk.com/. This will let you create a subdomain Zendesk account that you can manage.
2. Make sure to opt-in for Guide integration once your trial account setup is done.
3. Create API keys for running the server locally and previewing them on your subdomain. `<YOUR_ZENDESK_DOMAIN>/admin/apps-integrations/apis/zendesk-api/settings`.
4. Enable Help Center for your account through `<YOUR_ZENDESK_DOMAIN>/hc/admin/general_settings`
5. Install [ZAT](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/) and [ZAT CLI](https://support.zendesk.com/hc/en-us/articles/4408822095642-Previewing-theme-changes-locally)
6. Run `npm i` to install all the node packages
7. Install `sassc` as mentioned in [Requirements sections](#requirements)
8. Create a `.zat` file in your main directory. You can read more about this in [Configuration section](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/#configuring-updates). This file content would look like:
```
{
  "subdomain": "<YOUR_SUB_DOMAIN>",
  "username": "<USERNAME>/token",
  "password": "<TOKEN_GENERATED_IN_STEP_3>",
  "zat_latest": "3.9.2",
  "zat_update_check": "2024-02-07"
}
```
9. Compile the assets `./bin/compile.rb`
10. Run the preview `zat theme preview`
11. (Optional) to build a zip of local theme and upload on your trial instance run `zip -vr <ZIP_FILE_NAME>.zip <YOUR_THEME_DIRECTORY> -x "*/node_modules/*"` and then upload the generated zip file on `<YOUR_ZENDESK_DOMAIN>/theming/workbench`
