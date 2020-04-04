/**
 * Index.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString }from './utilities/renderer.js'

 export class Index{
     constructor(){
         this.view = elementFromHTMLString('<span class=index__view></span>');
     }
 }