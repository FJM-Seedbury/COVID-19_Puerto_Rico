/**
 * Constants.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2019-09-18 Initial Version 
 */

//Websocket interaction

export const wsInteract = {
    // WEBSOCKET_SERVER: 'wss://' + location.hostname + ':' + location.port
    WEBSOCKET_SERVER: 'ws://127.0.0.1:1337'//For Live-Server TODO: Comment for production
}
//Routing
export const routes = {
    HOME_VIEW_STATE: '#/home',
    SIGNIN_VIEW_STATE: '#/signin',
    ACCOUNT_VIEW_STATE: '#/account',
    ENTITIES_VIEW_STATE: '#/entities',
    NEW_ENTITY_VIEW_STATE: '#/newentity',
    CLIENTS_VIEW_STATE: '#/clients',
    PROJECTS_VIEW_STATE: '#/projects',
    TEAMMEMBERS_VIEW_STATE: '#/teammembers',
    PROFILE_VIEW_STATE: '#/profile',
    NOTEPAD_VIEW_STATE: '#/notepad',
    ANALYTICS_VIEW_STATE: '#/analytics',
    TASK_MANAGEMENT_VIEW_STATE: '#/taskmanagement',
    CALENDAR_VIEW: '#/calendar',
    SEARCH_VIEW: '#/searchscreen'
}
export const DEFAULT_ROUTE = routes.PROFILE_VIEW_STATE;
export const secondLevelRoutes = {
    TASK_MANAGEMENT_VIEW_STATE: '/taskmanagement',
    PROFILE_VIEW_STATE: '/profile'
}
// export const thirdLevelRoutes = {
//     TASK_VIEW_STATE: '/tasks',
//     CLIENT_VIEW_STATE: '/clients',
//     PROJECT_VIEW_STATE: '/projects',
// }
export const keys = {
    GOOGLE_MAPS: 'AIzaSyA3EKjTONcFTfzJARQolhQW9n62yB3iLvQ'
}
export const requesters = {
    CHECK_IF_SIGN_IN: 'checkIfSignIn',
    MAIN_HEADER: 'mainHeader',
    ADD_PANEL: 'addPanel'
}
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const WEEKDAYS = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
export const SHORT_WEEKDAYS = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
export const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const ANIMATIONS = ['hide', 'exitTop', 'exitRight', 'exitBottom', 'exitLeft', 'flatten'];
export const CUSTOMIZABLE_STYLES = [
    { property: 'Main_Header_Background', isColor: true, mayBeImage: true, isImage: false },
    { property: 'Background', isColor: true, mayBeImage: true, isImage: false },
    { property: 'Foreground', isColor: true, mayBeImage: true, isImage: false },
    { property: 'Headings', isColor: true, mayBeImage: false, isImage: false },
    { property: 'Font_-_Family', isColor: false, mayBeImage: false, isImage: false },
    { property: 'Font_Color', isColor: true, mayBeImage: false, isImage: false },
    { property: 'Reverse_Font_Color', isColor: true, mayBeImage: false, isImage: false },
    { property: 'Highlight_Color', isColor: true, mayBeImage: false, isImage: false },
    { property: 'Logo_Border', isColor: false, mayBeImage: false, isImage: false },
    { property: 'Logo_Border_Color', isColor: true, mayBeImage: false, isImage: false },
    { property: 'Logo_Background', isColor: true, mayBeImage: true, isImage: false },
];