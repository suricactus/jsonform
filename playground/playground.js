/*global $, ace, console*/
$('document').ready(function () {
  var isBootstrap2 = JSONForm.isBootstrap2 = location.pathname.indexOf('bootstrap3') < 0;
  var formObject = {
    schema: {
      example: {
        title: 'JSON Form example to start from',
        type: 'string',
        'default': 'gettingstarted'
      },
      greatform: {
        title: 'JSON Form object to render',
        type: 'string'
      }
    },
    form: [
      {
        key: 'example',
        notitle: true,
        prepend: 'Try with',
        htmlClass: 'trywith',
        type: 'select',
        options: {
          'gettingstarted': 'Getting started',
          'tb-radiobuttonset': 'TB - Radio buttonset',
          'tb-select2': 'TB - Select2 example',
          // 'tb-tag-select': 'TB - Tag select',
          // 'tb-multiple-select': 'TB - Multiple select',
          // 'tb-ordered-select': 'TB - Ordered select',
          // 'tb-tabs': 'TB - Tabbed object properties',
          // 'tb-foreignkey': 'TB - Foreign key',
          'schema-basic': 'JSON Schema - A basic example',
          'schema-morecomplex': 'JSON Schema - Slightly more complex example',
          'schema-array': 'JSON Schema - Arrays',
          'schema-required': 'JSON Schema - Required field',
          'schema-default': 'JSON Schema - Default values',
          'schema-inline-ref': 'JSON Schema - Inline $ref to definitions',
          'fields-common': 'Fields - Common properties',
          'fields-password': 'Fields - Gathering secrets: the password type',
          'fields-textarea': 'Fields - Large text: the textarea type',
          'fields-text-autocomplete': 'Fields - Text field with jquery-ui autocomplete',
          'fields-ace': 'Fields - Code (JavaScript, JSON...): the ace type',
          'fields-color': 'Fields - Color picker: the color type',
          'fields-checkbox': 'Fields - Boolean flag: the checkbox type',
          'fields-checkboxes': 'Fields - Multiple options: the checkboxes type',
          'fields-select': 'Fields - Selection list: the select type',
          'fields-radios': 'Fields - A list of radio buttons: the radios type',
          'fields-radiobuttons': 'Fields - Radio buttons as real buttons: the radio buttons type',
          'fields-checkboxbuttons': 'Fields - Checkbox buttons: the checkbox buttons type',
          'fields-range': 'Fields - Number: the range type',
          'fields-imageselect': 'Fields - Image selector: the imageselect type',
          'fields-iconselect': 'Fields - Icon selector: the iconselect type',
          'fields-fieldset': 'Fields - Grouping: the fieldset type',
          'fields-advancedfieldset': 'Fields - Advanced options section: the advancedfieldset type',
          'fields-authfieldset': 'Fields - Authentication settings section: the authfieldset type',
          'fields-section': 'Fields - Generic group: the section type',
          'fields-actions': 'Fields - Group of buttons: the actions type',
          'fields-array': 'Fields - Generic array: the array type',
          'fields-tabarray': 'Fields - Arrays with tabs: the tabarray type',
          'fields-tabarray-maxitems': 'Fields - Arrays with tabs: the tabarray type w/ maxItems',
          'fields-tabarray-value': 'Fields - Arrays with tabs: the tabarray type w/ default & legend',
          'fields-selectfieldset': 'Fields - Alternative: the selectfieldset type',
          'fields-selectfieldset-key': 'Fields - Alternative with schema key',
          'fields-submit': 'Fields - Submit the form: the submit type',
          'fields-help': 'Fields - Guide users: the help type',
          'fields-hidden': 'Fields - Hidden form values: the hidden type',
          'fields-questions': 'Fields - Series of questions: the questions type',
          'templating-idx': 'Templating - item index with idx',
          'templating-value': 'Templating - tab legend with value and valueInLegend',
          'templating-values': 'Templating - values.xxx to reference another field',
          'templating-tpldata': 'Templating - Using the tpldata property',
          'events': 'Using event handlers',
          'previousvalues': 'Using previously submitted values',
          'previousvalues-multi-array': 'Using previously submitted values - Multidimensional Arrays',
          'factory-sleek': 'Joshfire Factory - Sleek template'
        },
        onChange: function (evt) {
          var selected = $(evt.target).val();

          loadExample(selected);
          if (history) history.pushState(
            { example: selected},
            'Example - ' + selected,
            '?example=' + selected);
        }
      },
      {
        key: 'greatform',
        type: 'ace',
        aceMode: 'json',
        width: '100%',
        height: '' + (window.innerHeight - 140) + 'px',
        notitle: true,
        onChange: function () {
          generateForm();
        }
      }
    ]
  };


  /**
   * Extracts a potential form to load from query string
   */
  var getRequestedExample = function () {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    var param = null;
    for (var i = 0; i < vars.length; i++) {
      param = vars[i].split('=');
      if (param[0] === 'example') {
        if (param[1].slice(-1) == '/')
          return param[1].slice(0, -1);
        return param[1];
      }
    }
    return null;
  };

  /**
   * Loads and displays the example identified by the given name
   */
  var loadExample = function (example) {
    var exampleDir = !isBootstrap2 ? '../examples/' : 'examples/';
    $.ajax({
      url: exampleDir + example + '.json',
      dataType: 'text'
    }).done(function (code) {
      var aceId = $('#form .ace_editor').attr('id');
      var editor = ace.edit(aceId);
      editor.getSession().setValue(code);
    }).fail(function () {
      $('#result').html('Sorry, I could not retrieve the example!');
    });
  };


  /**
   * Displays the form entered by the user
   * (this function runs whenever once per second whenever the user
   * changes the contents of the ACE input field)
   */
  var generateForm = function () {
    var values = $('#form').jsonFormValue();

    // Reset result pane
    $('#result').html('');

    // Parse entered content as JavaScript
    // (mostly JSON but functions are possible)
    var createdForm = null;
    try {
      // Most examples should be written in pure JSON,
      // but playground is helpful to check behaviors too!
      eval('createdForm=' + values.greatform);
    }
    catch (e) {
      $('#result').html('<pre>Entered content is not yet a valid' +
        ' JSON Form object.\n\nJavaScript parser returned:\n' +
        e + '</pre>');
      return;
    }

    // Render the resulting form, binding to onSubmitValid
    try {
      createdForm.onSubmitValid = function (values) {
        if (console && console.log) {
          console.log('Values extracted from submitted form', values);
        }
        window.alert('Form submitted. Values object:\n' +
          JSON.stringify(values, null, 2));
      };
      createdForm.onSubmit = function (errors, values) {
        if (errors) {
          console.log('Validation errors', errors);
          return false;
        }
        return true;
      };
      $('#result').html('<form id="result-form" class="form-vertical"></form>');
      $('#result-form').jsonForm(createdForm);
    }
    catch (e) {
      $('#result').html('<pre>Entered content is not yet a valid' +
        ' JSON Form object.\n\nThe JSON Form library returned:\n' +
        e + '</pre>');
      return;
    }
  };

  // Render the form
  $('#form').jsonForm(formObject);

  // Wait until ACE is loaded
  var itv = window.setInterval(function() {
    var example = getRequestedExample() || 'gettingstarted';
    $('.trywith select').val(example);
    if (window.ace) {
      window.clearInterval(itv);
      loadExample(example);
    }
  }, 1000);
});
