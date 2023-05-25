// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  authorize: 'AAAAqwBNQjc:APA91bGGWx-Zw6-rDew7mUHuyxZy6c8tdhYQ0kJ7PLVmKokGxSiFZLev9Ec3oHv1mtXO3XFeV9TRgRq32e5NNseW85B62-phs4qxoNFdT0M5DuTXYQs6pRUry6VhQvSeJwNxB4NLypsu',
  fcmUrl:'https://fcm.googleapis.com/fcm/send',
  url:'http://192.168.1.10:3000'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
