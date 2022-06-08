import { StackActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */
let navigator: any;

/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

/**
 * Helper method to navigate to the requested route.
 *
 * @param {string} routeName
 * @param {object} params
 */
const navigateTo = (name: string, params: object = {}) => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
};

/**
 * Helper method to go back to the previous page in the stack
 */
function goBack() {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName: string, params: object = {}) {
  navigator.reset({
    index: 0,
    routes: [{ name: routeName, params }],
  });
}

/**
 * Helper method to go pop from the navigation stack
 *
 * @param {string} key
 */
function pop(key: string) {
  if (navigator) {
    navigator.dispatch(StackActions.pop({ key }));
  }
}

export { goBack, navigateTo, navigateAndReset, setTopLevelNavigator, pop };
