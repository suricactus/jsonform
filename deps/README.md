JSON Form dependencies
======================

This folder contains required and optional dependencies for JSON Form.

Required
--------
- [jQuery](http://jquery.com/) v1.7.2 or above
- The <del>[Underscore.js](http://documentcloud.github.com/underscore/) v1.3.3 or above </del> [lodash.js](https://lodash.com/) utility belt


Optional
--------
The libraries in the ```opt``` subfolder are optional as long as you do not use the feature they enable:
- The <del>[JSON Schema Validator](https://github.com/garycourt/JSV)</del> [Z-Schema Validator](https://github.com/zaggino/z-schema) is used to detect and report validation errors upon form submission. The [deps/opt](https://github.com/joshfire/jsonform/tree/master/deps/opt) folder contains a "build" of the Validator for use in JSON Form.
- [Bootstrap](http://twitter.github.com/bootstrap/) v2.0.3 or above for styling purpose (JSON Form only uses the ```bootstrap.css``` file)
- [wysihtml5](http://jhollingworth.github.com/bootstrap-wysihtml5/) if the form uses ```wysihtml5``` textarea fields
- [jQuery UI Sortable](http://jqueryui.com/demos/sortable/) v1.8.20 or above for drag-and-drop support within arrays and tabarrays. Note the plugin itself depends on jQuery IU Core, jQuery UI Mouse, and jQuery UI Widget.
- [ACE](http://ace.ajax.org/) is needed to render rich text input fields. The [deps/opt/ace](https://github.com/joshfire/jsonform/tree/master/deps/opt/ace) folder contains a minimal set of files from ACE to render a JSON input field. Beware that the code of `ace.js` needs to be encapsulated in `(function(require,define,requirejs) {...})(undefined,undefined,undefined);` before it may be used within JSON Form.
- [Bootstrap Dropdowns](https://github.com/twbs/bootstrap/blob/master/javascript.html) v2.0.3 or above is needed for ```imageselect``` fields.
- [wysihtml5](http://jhollingworth.github.com/bootstrap-wysihtml5/) is required if the form uses ```wysihtml5``` textarea fields.
- [Spectrum](http://bgrins.github.com/spectrum/) is required if the form uses `color` fields.
- [select2](https://github.com/select2/select2) is required if the form uses `select2` fields.
