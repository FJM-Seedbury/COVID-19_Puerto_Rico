/**
 * app.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { Index } from './Index.js';

window.onload = () => {
    const app = new Index();
    document.getElementById('root').appendChild(app.view);
}