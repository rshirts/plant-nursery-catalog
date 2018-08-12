/*global $*/

/*notes 10/30/2017 - monday
    after page loads, AJAX server for list of plant ids
    go through list and AJAX server for each plant
    for each plant, insert a row into teh HTML table

    -load JQUERY for DOM manipulate- in HTML -  done

*/
//****************************
//Start DataObjects
//****************************

let treeHeightSelections = {
  '10 - 20': 1,
  '20 - 30': 2,
  '30 - 40': 3,
  '40+': 4
};

let treeWidthSelections = {
  '05 - 10': 1,
  '10 - 15': 2,
  '15 - 20': 3,
  '20+': 4
};

let sunSelections = {
  Full: 1,
  Partial: 2,
  Shade: 3
};

let soilSelections = {
  Silt: 1,
  Sandy: 2,
  Clay: 3
};

let waterSelections = {
  Any: 1,
  Regularly: 2,
  Wet: 3,
  Dry: 4,
  'Drought Resistant': 5
};

//This is the array that holds all the plant information when a page is loaded.
let serverFormData = [];

// //****************************
// //End DataObjects
// //****************************

// //****************************
// //Start SortingFunctions
// //****************************

//Helper Sorting functions
function compareNumbers(a, b) {
  return a - b;
}

function compareNumbersDesc(b, a) {
  return a - b;
}

function compareStrings(a, b) {
  if (a < b) return -1;
  //a is greater than b by the ordering criterion
  if (a > b) return 1;
  // a must be equal to b
  return 0;
}

function compareStringsDesc(b, a) {
  if (a < b) return -1;
  //a is greater than b by the ordering criterion
  if (a > b) return 1;
  // a must be equal to b
  return 0;
}

//Standard sorts
function compareNames(a, b) {
  return compareStrings(a.name, b.name);
}
function compareHeight(a, b) {
  return compareNumbers(a.height, b.height);
}
function compareSpacing(a, b) {
  return compareNumbers(a.spacing, b.spacing);
}
function compareWidth(a, b) {
  return compareNumbers(a.width, b.width);
}
function compareNamesDesc(a, b) {
  return compareStringsDesc(a.name, b.name);
}
function compareHeightDesc(a, b) {
  return compareNumbersDesc(a.height, b.height);
}
function compareWidthDesc(a, b) {
  return compareNumbersDesc(a.width, b.width);
}
function compareSpacingDesc(a, b) {
  return compareNumbersDesc(a.spacing, b.spacing);
}

function compareWater(a, b) {
  return compareNumbers(waterSelections[a.water], waterSelections[b.water]);
}
function compareSoil(a, b) {
  return compareNumbers(soilSelections[a.soil], soilSelections[b.soil]);
}
function compareSun(a, b) {
  return compareNumbers(sunSelections[a.sun], sunSelections[b.sun]);
}
function compareTreeHeight(a, b) {
  return compareNumbers(treeHeightSelections[a.height], treeHeightSelections[b.height]);
}
function compareTreeWidth(a, b) {
  return compareNumbers(treeWidthSelections[a.width], treeWidthSelections[b.width]);
}

function compareWaterDesc(a, b) {
  return compareNumbersDesc(waterSelections[a.water], waterSelections[b.water]);
}
function compareSoilDesc(a, b) {
  return compareNumbersDesc(soilSelections[a.soil], soilSelections[b.soil]);
}
function compareSunDesc(a, b) {
  return compareNumbersDesc(sunSelections[a.sun], sunSelections[b.sun]);
}
function compareTreeHeightDesc(a, b) {
  return compareNumbersDesc(treeHeightSelections[a.height], treeHeightSelections[b.height]);
}
function compareTreeWidthDesc(a, b) {
  return compareNumbersDesc(treeWidthSelections[a.width], treeWidthSelections[b.width]);
}

function sortProducts(product, sortType, isAdmin) {
  $('#productBody').empty();
  serverFormData.sort(sortType);
  serverFormData.forEach(function(row) {
    $('#productData table tbody').append(insertRowData(product, row, isAdmin));
  });
}

//****************************
//End SortingFunctions
//****************************

// ***
// This is the first thing run when the page loads.
// ***
$().ready(function() {
  let htmlData = `
      <div class="row"> <!-- START admin content  -->
          <div class="column">
          <div id="frontImage" class ="carousel slide" data-ride="carousel">
              <ol class ="carousel-indicators">
                  <li data-target="#frontImage" data-slide-to="0" class="active"></li>
                  <li data-target="#frontImage" data-slide-to="1"></li>
                  <li data-target="#frontImage" data-slide-to="2"></li>
              </ol>
              <div class ="carousel-inner">
                  <div class = "item active">
                      <img src="/img/MainPagePic.jpg" class="img-responsive center-block" alt="Main image">
                      <div class="carousel-caption">

                          <p>Our main location</p>
                      </div>
                  </div>
                  <div class="item">
                      <img src="/img/2.jpg" class="img-responsive center-block" alt="Main image">
                      <div class="carousel-caption">

                          <p>Our main location</p>
                      </div>
                  </div>
                  <div class="item">
                      <img src="/img/3.jpg" class="img-responsive center-block" alt="Main image">
                      <div class="carousel-caption">

                          <p>Our main location</p>
                      </div>
                  </div>
              </div>
              <a class="left carousel-control" href="#carousel-main" role="button" data-slide="prev">
                  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#carousel-main" role="button" data-slide="next">
                  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
              </a>
          </div>

          </div><!-- end of column AND MAIN CONENT -->
      </div><!-- end of row -->
      `;
  //Display the image to the main screen and add an event to the logo to display this if clicked.
  $('#mainContent').html(htmlData);
  $('#mainLogo').click(function() {
    //check if user is in adim page vs client page then do toggle
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    $('#mainContent').html(htmlData);
  });
  //********************************
  //This is the Main nav click events
  //********************************
  $('#mainTrees').on('click', function(event) {
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    clientSideProductClick('trees');
    buildTable('trees', false);
  });
  $('#mainGrounds').on('click', function(event) {
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    clientSideProductClick('grounds');
    buildTable('grounds', false);
  });
  $('#mainShrubs').on('click', function(event) {
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    clientSideProductClick('shrubs');
    buildTable('shrubs', false);
  });

  //********************************
  //This is the footer click events
  //********************************
  $('#home').on('click', function(event) {
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    $('#mainContent').html(htmlData);
  });
  $('#contact').on('click', function(event) {
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    showContactUs();
  });
  $('#about').on('click', function(event) {
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    showAbout();
  });
  $('#faq').on('click', function(event) {
    $('#mainContent').toggleClass('navbar-buffer', true);
    $('#mainContent').toggleClass('navbar-buffer-admin', false);
    showFAQ();
  });
});

//each client side product will call this function to lay the base divs needed to display clientSide information.
function clientSideProductClick(product) {
  let htmlData = `
      <div class="row">
      <div class="column">
          <div class="container">

          <nav class="nav navbar-nav navbar-right">
              <div class="container-fluid text-center">
                  <ul class="nav navbar-nav iconHeaderColor">
                      <li class="iconHeaderText"><strong><span>Views</span></strong></li>
                      <li><a id="portraitView" href="#"><span class="glyphicon glyphicon-th" data-toggle="tooltip" data-placement="top" title="Portrait View"></a></li>
                      <li><a id="listView" href="#"><span class="glyphicon glyphicon-th-list" data-toggle="tooltip" data-placement="top" title="List View"></span></a></li>
                      <li><a id="tableView" href="#"><span class="glyphicon glyphicon-align-justify" data-toggle="tooltip" data-placement="top" title="Table View"></span></a></li>
                  </ul>
              </div> <!-- end container fluid -->
          </nav> <!-- End navbar -->
          </div> <!-- end container -->
          <div class="row">
              <div class="column">
              <div class="container">
                  <div id="productData">



                  </div><!-- end of product data -->
              </div><!-- end of container -->
              </div><!-- end of column -->
          </div><!-- end admin content end of row -->

      </div> <!-- end of column -->
      </div> <!-- end of row -->
  `;
  $('#mainContent').html(htmlData);
  applyClientSideOnClick(product);
}

function applyClientSideOnClick(product) {
  $('#tableView').on('click', function() {
    buildTable(product, false);
  });
  $('#portraitView').on('click', function() {
    $('#productData').empty();
    //THIs is where the portrait view function can be added.
    //buildTable(product, false);
    //peter
    displayCards();
  });
  $('#listView').on('click', function() {
    $('#productData').empty();
    //THis is where the list view function can be added.
    //buildTable(product, false);
  });
}

// ***
//This is run when the login button is clicked.
// ***
$().ready(function() {
  $('#adminLogin').click(function() {
    $('#mainContent').toggleClass('navbar-buffer', false);
    $('#mainContent').toggleClass('navbar-buffer-admin', true);
    let htmlData = `
      <div class="row admin-div top-buffers">
      <div class="column">
          <nav class="navbar navbar-default navbar-fixed-top top-buffer well-sm">
              <div class="container-fluid well well-sm">
                  <div class="navbar-header">
                      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#adminNavBar">
                          <span class="sr-only">Toggle navigation</span>
                      </button>
                      <a id="mainLogo" class="navbar-brand" href="#"><span class="main-logo">Admin Portal</span></a>
                  </div> <!-- end navbar-header -->
                  <div class="collapse navbar-collapse" id="#adminNavBar">
                       <ul class="nav navbar-nav nav-pills nav-primary nav-fill">
                          <li class="nav-item"><a class="nav-link" id="trees"href="#trees">Trees</a></li>
                          <li class="nav-item"><a class="nav-link" id="shrubs" href="#shrubs">Shrubs</a></li>
                          <li class="nav-item"><a class="nav-link" id="grounds" href="#grounds">Ground Covers</a></li>
                      </ul> <!-- end of nav -->
                      <ul class="nav navbar-nav navbar-right hidden" id="insertButton">
                         <li>
                              <span>Add a new<span class="plantButtonType"> Plant</span></span>
                              <button id="insertPlantButton" type="button" class="btn btn-primary inactive insertButtonBuffer" on data-toggle="modal" data-target="#insertUpdateModal">
                                  <span class="glyphicon glyphicon-plus" title="Add new Plant"></span>
                              </button>
                         </li>
                      </ul>
                  </div>
              </div> <!-- end container-flud -->

          </nav> <!-- end top navbar -->

          <div class="row">
              <div class="column">
                  <div id="productData">

                  <div class="container">
                      Click on one of the admin links to display information about that product.
                  </div>

                  </div><!-- end of product data -->
              </div><!-- end of column -->
          </div><!-- end admin content end of row -->

      </div> <!-- end of column -->
      </div> <!-- end of row -->
      <!-- Start Modal -->
      <div id="insertUpdateModal" class="modal fade" role="dialog">
          <div class="modal-dialog">

              <!-- Start modal content -->
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title"><span id="modalFormType"></span><span class="plantButtonType"></span></h4>
                  </div>

                  <div id="modalForm" class="modal-body"></div>

                  <div class="modal-footer">
                  </div>
              </div> <!-- end modal content -->

          </div> <!-- end modal-dialog -->
      </div> <!-- end modal -->

      `;
    $('#mainContent').html(htmlData);
    refereshTableEventHandlers();
  });
});

// ***
// This is what happens when the admin plant links are clicked.
// ***
function refereshTableEventHandlers() {
  $('#trees').off();
  $('#trees').on('click', function() {
    $('#insertButton').toggleClass('hidden', false);
    $('#insertButton').off();
    $('#insertButton').on('click', function() {
      $('#modalFormType').html('Insert');
      $('#modalForm').html(showForm('trees', 'insert'));
      applyInsertFormSubmission('trees');
    });
    $('.plantButtonType').html(' Tree');
    buildTable('trees');
  });
  $('#grounds').off();
  $('#grounds').on('click', function() {
    $('#insertButton').toggleClass('hidden', false);
    $('#insertButton').off();
    $('#insertButton').on('click', function() {
      $('#modalFormType').html('Insert');
      $('#modalForm').html(showForm('grounds', 'insert'));
      applyInsertFormSubmission('grounds');
    });
    $('.plantButtonType').html(' Ground Cover');
    buildTable('grounds');
  });
  $('#shrubs').off();
  $('#shrubs').on('click', function() {
    $('#insertButton').toggleClass('hidden', false);
    $('#insertButton').off();
    $('#insertButton').on('click', function() {
      $('#modalFormType').html('Insert');
      $('#modalForm').html(showForm('shrubs', 'insert'));
      applyInsertFormSubmission('shrubs');
    });
    $('.plantButtonType').html(' Shrub');
    buildTable('shrubs');
  });
}

function refreshHeaderEventHandlers(product, isAdmin) {
  //set table arrows to default.
  $('.arrow').css('visibility', 'hidden');
  $('#nameHeaderArrow').html('⯅').css('visibility', 'visible');
  sortProducts(product, compareNames, isAdmin);

  // Name
  $('#nameHeader').on('click', function() {
    if ($('#nameHeaderArrow').css('visibility') === 'visible') {
      if ($('#nameHeaderArrow').html() === '⯅') {
        $('#nameHeaderArrow').html('⯆');
        sortProducts(product, compareNamesDesc, isAdmin);
      } else {
        $('#nameHeaderArrow').html('⯅');
        sortProducts(product, compareNames, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#nameHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareNames, isAdmin);
    }
  });
  // Tree Height
  $('#treeHeightHeader').on('click', function() {
    if ($('#heightHeaderArrow').css('visibility') === 'visible') {
      if ($('#heightHeaderArrow').html() === '⯅') {
        $('#heightHeaderArrow').html('⯆');
        //sortByTreeHeightDesc(product);
        sortProducts(product, compareTreeHeightDesc, isAdmin);
      } else {
        $('#heightHeaderArrow').html('⯅');
        sortProducts(product, compareTreeHeight, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#heightHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareTreeHeight, isAdmin);
    }
  });
  // Tree Width
  $('#treeWidthHeader').on('click', function() {
    if ($('#widthHeaderArrow').css('visibility') === 'visible') {
      if ($('#widthHeaderArrow').html() === '⯅') {
        $('#widthHeaderArrow').html('⯆');
        sortProducts(product, compareTreeWidthDesc, isAdmin);
      } else {
        $('#widthHeaderArrow').html('⯅');
        sortProducts(product, compareTreeWidth, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#widthHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareTreeWidth, isAdmin);
    }
  });
  // Height
  $('#heightHeader').on('click', function() {
    if ($('#heightHeaderArrow').css('visibility') === 'visible') {
      if ($('#heightHeaderArrow').html() === '⯅') {
        $('#heightHeaderArrow').html('⯆');
        //sortByTreeHeightDesc(product);
        sortProducts(product, compareHeightDesc, isAdmin);
      } else {
        $('#heightHeaderArrow').html('⯅');
        sortProducts(product, compareHeight, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#heightHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareHeight, isAdmin);
    }
  });
  // Width
  $('#widthHeader').on('click', function() {
    if ($('#widthHeaderArrow').css('visibility') === 'visible') {
      if ($('#widthHeaderArrow').html() === '⯅') {
        $('#widthHeaderArrow').html('⯆');
        sortProducts(product, compareWidthDesc, isAdmin);
      } else {
        $('#widthHeaderArrow').html('⯅');
        sortProducts(product, compareWidth, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#widthHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareWidth, isAdmin);
    }
  });

  // Sun
  $('#sunHeader').on('click', function() {
    if ($('#sunHeaderArrow').css('visibility') === 'visible') {
      if ($('#sunHeaderArrow').html() === '⯅') {
        $('#sunHeaderArrow').html('⯆');
        sortProducts(product, compareSunDesc, isAdmin);
      } else {
        $('#sunHeaderArrow').html('⯅');
        sortProducts(product, compareSun, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#sunHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareSun, isAdmin);
    }
  });
  // Soil
  $('#soilHeader').on('click', function() {
    if ($('#soilHeaderArrow').css('visibility') === 'visible') {
      if ($('#soilHeaderArrow').html() === '⯅') {
        $('#soilHeaderArrow').html('⯆');
        sortProducts(product, compareSoilDesc, isAdmin);
      } else {
        $('#soilHeaderArrow').html('⯅');
        sortProducts(product, compareSoil, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#soilHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareSoil, isAdmin);
    }
  });
  // Water
  $('#waterHeader').on('click', function() {
    if ($('#waterHeaderArrow').css('visibility') === 'visible') {
      if ($('#waterHeaderArrow').html() === '⯅') {
        $('#waterHeaderArrow').html('⯆');
        sortProducts(product, compareWaterDesc, isAdmin);
      } else {
        $('#waterHeaderArrow').html('⯅');
        sortProducts(product, compareWater, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#waterHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareWater, isAdmin);
    }
  });
  // Spacing
  $('#spacingHeader').on('click', function() {
    if ($('#spacingHeaderArrow').css('visibility') === 'visible') {
      if ($('#spacingHeaderArrow').html() === '⯅') {
        $('#spacingHeaderArrow').html('⯆');
        sortProducts(product, compareSpacingDesc, isAdmin);
      } else {
        $('#spacingHeaderArrow').html('⯅');
        sortProducts(product, compareSpacing, isAdmin);
      }
    } else {
      $('.arrow').css('visibility', 'hidden');
      $('#spacingHeaderArrow').html('⯅').css('visibility', 'visible');
      sortProducts(product, compareSpacing, isAdmin);
    }
  });
}

function updateRow(product, theRow) {
  //console.log('update pressed');
  //iterate over each <td> in this <tr> and get there values.
  var formValues = {};
  //set id
  formValues.id = theRow[0].id;
  //extrapolate all the data from each td in the row.
  $(theRow).find('td').each(function(index, value) {
    console.log(index, value);
    let formValue = $(value).text();

    switch (product) {
      case 'trees':
        switch (index) {
          case 0:
            formValues.name = formValue;
            break;
          case 1:
            formValues.photo = formValue;
            break;
          case 2:
            formValues.height = formValue;
            break;
          case 3:
            formValues.width = formValue;
            break;
          case 4:
            formValues.sun = formValue;
            break;
          case 5:
            formValues.soil = formValue;
            break;
          case 6:
            formValues.descr = formValue;
            break;
        }
        break;
      case 'shrubs':
        switch (index) {
          case 0:
            formValues.name = formValue;
            break;
          case 1:
            formValues.photo = formValue;
            break;
          case 2:
            formValues.height = formValue;
            break;
          case 3:
            formValues.width = formValue;
            break;
          case 4:
            formValues.sun = formValue;
            break;
          case 5:
            formValues.soil = formValue;
            break;
          case 6:
            formValues.spacing = formValue;
            break;
          case 7:
            formValues.descr = formValue;
            break;
        }
        break;
      case 'grounds':
        switch (index) {
          case 0:
            formValues.name = formValue;
            break;
          case 1:
            formValues.photo = formValue;
            break;
          case 2:
            formValues.width = formValue;
            break;
          case 3:
            formValues.sun = formValue;
            break;
          case 4:
            formValues.soil = formValue;
            break;
          case 5:
            formValues.water = formValue;
            break;
          case 6:
            formValues.descr = formValue;
            break;
        }
        break;
    }
  });
  $('#modalFormType').html('Update');
  $('#modalForm').html(showForm(product, 'update', formValues));
  //need to reapply the proper form submission
  applyUpdateFormSubmission(product, formValues);
}

function buildTable(product, isAdmin = true) {
  //clear data.
  $('#productData').empty();
  let header = '';
  switch (product) {
    case 'trees':
      header = `
          <th id="nameHeader" class="tableHeaderPointer">Name&nbsp;<span id="nameHeaderArrow" class="arrow">⯅</span></th>
          <th>Photo</th>
          <th id="treeHeightHeader" class="tableHeaderPointer">Height&nbsp;<span id="heightHeaderArrow" class="arrow">⯅</span></th>
          <th id="treeWidthHeader" class="tableHeaderPointer">Width&nbsp;<span id="widthHeaderArrow" class="arrow">⯅</span></th>
          <th id="sunHeader" class="tableHeaderPointer">Sun&nbsp;<span id="sunHeaderArrow" class="arrow">⯅</span></th>
          <th id="soilHeader" class="tableHeaderPointer">Soil&nbsp;<span id="soilHeaderArrow" class="arrow">⯅</span></th>
          <th>Description</th>`;
      break;
    case 'shrubs':
      header = `
          <th id="nameHeader" class="tableHeaderPointer">Name&nbsp;<span id="nameHeaderArrow" class="arrow">⯅</span></th>
          <th>Photo</th>
          <th id="heightHeader" class="tableHeaderPointer">Height&nbsp;<span id="heightHeaderArrow" class="arrow">⯅</span></th>
          <th id="widthHeader" class="tableHeaderPointer">Width&nbsp;<span id="widthHeaderArrow" class="arrow">⯅</span></th>
          <th id="sunHeader" class="tableHeaderPointer">Sun&nbsp;<span id="sunHeaderArrow" class="arrow">⯅</span></th>
          <th id="soilHeader" class="tableHeaderPointer">Soil&nbsp;<span id="soilHeaderArrow" class="arrow">⯅</span></th>
          <th id="spacingHeader" class="tableHeaderPointer">Spacing&nbsp;<span id="spacingHeaderArrow" class="arrow">⯅</span></th>
          <th>Description</th>`;
      break;
    case 'grounds':
      header = `
          <th id="nameHeader" class="tableHeaderPointer">Name&nbsp;<span id="nameHeaderArrow" class="arrow">⯅</span></th>
          <th>Photo</th>
          <th id="widthHeader" class="tableHeaderPointer">Width&nbsp;<span id="widthHeaderArrow" class="arrow" >⯅</span></th>
          <th id="sunHeader" class="tableHeaderPointer">Sun&nbsp;<span id="sunHeaderArrow" class="arrow">⯅</span></th>
          <th id="soilHeader" class="tableHeaderPointer">Soil&nbsp;<span id="soilHeaderArrow" class="arrow">⯅</span></th>
          <th id="waterHeader" class="tableHeaderPointer">Water&nbsp;<span id="waterHeaderArrow" class="arrow">⯅</span></th>
          <th >Description</th>`;
      break;
  }
  //Start building the table
  let htmlData = '';
  if (isAdmin) {
    htmlData = `
      <table id="adminTable" class="table">
          <thead>
              <tr>
                  ${header}
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody id="productBody">
          </tbody>
      </table>`;
  } else {
    htmlData = `
      <table id="adminTable" class="table">
          <thead>
              <tr>
                  ${header}
              </tr>
          </thead>
          <tbody id="productBody">
          </tbody>
      </table>`;
  }

  //Finish the table header before building the rows and add it to the page.
  $('#productData').html(htmlData);
  //Add all the on click events to the headers

  refreshHeaderEventHandlers(product, isAdmin);
  // ********
  // attach the onclick events to the TABLE BODY so that it can handle all the events for each <td>
  // ********
  // ********
  // This is what happens when update is clicked in the row
  // ********
  if (isAdmin) {
    $('#productBody').on('click', 'button.btn.btn-info', function() {
      updateRow(product, $(this).closest('tr'));
    });
    // ********
    // This is what happens when delete is clicked in the row
    // ********
    $('#productBody').on('click', 'button.btn.btn-danger', function() {
      deleteRow(product, $(this).closest('tr')[0].id);
      $(this).closest('tr').remove();
    });
  }
  $.get(`/api/v1/${product}/getIDs`).then(function(allIDs) {
    //reset the array of all the plant data for this view.
    serverFormData = [];
    allIDs.forEach(function(item) {
      $.get(`/api/v1/${product}/${item}`, function(values) {
        serverFormData.push(values[0]);
        //This was here to build the table async but we use sorting now so we put everything into an array.
        //$('#productData table tbody').append(insertRowData(product, values[0]));
        //Bandaid: wait for all calls to be made before sorting.
        //Note: each of these should return a promise and we use a promise.all() to execute the sortByNames.
        if (serverFormData.length === allIDs.length) {
          sortProducts(product, compareNames, isAdmin);
        }
      });
    });
  });
}

function insertRowData(product, rowData, isAdmin) {
  if (product === 'trees') {
    let returnString = '';
    if (isAdmin) {
      returnString = `
              <tr id="${rowData.id}">
                  <td>${rowData.name}</td>
                  <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
                  <td>${rowData.height}</td>
                  <td>${rowData.width}</td>
                  <td>${rowData.sun}</td>
                  <td>${rowData.soil}</td>
                  <td>${rowData.descr}</td>
                  <td>
                      <button type="button" class="btn btn-info"  on data-toggle="modal" data-target="#insertUpdateModal">
                          <span class="glyphicon glyphicon-pencil" title="edit an entry"></span>
                      </button>
                  </td>
                  <td>
                      <button type="button" class="btn btn-danger">
                          <span class="glyphicon glyphicon-remove" title="delete an entry"></span>
                      </button>
                  </td>
              </tr>
          `;
    } else {
      returnString = `
              <tr id="${rowData.id}">
                  <td>${rowData.name}</td>
                  <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
                  <td>${rowData.height}</td>
                  <td>${rowData.width}</td>
                  <td>${rowData.sun}</td>
                  <td>${rowData.soil}</td>
                  <td>${rowData.descr}</td>
              </tr>
          `;
    }

    return returnString;
  } else if (product === 'shrubs') {
    let returnString = '';
    if (isAdmin) {
      returnString = `
              <tr id="${rowData.id}">
                  <td>${rowData.name}</td>
                  <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
                  <td>${rowData.height}</td>
                  <td>${rowData.width}</td>
                  <td>${rowData.sun}</td>
                  <td>${rowData.soil}</td>
                  <td>${rowData.spacing}</td>
                  <td>${rowData.descr}</td>
                  <td>
                      <button type="button" class="btn btn-info"  on data-toggle="modal" data-target="#insertUpdateModal">
                          <span class="glyphicon glyphicon-pencil" title="edit an entry"></span>
                      </button>
                  </td>
                  <td>
                      <button type="button" class="btn btn-danger">
                          <span class="glyphicon glyphicon-remove" title="delete an entry"></span>
                      </button>
                  </td>
              </tr>
          `;
    } else {
      returnString = `
              <tr id="${rowData.id}">
                  <td>${rowData.name}</td>
                  <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
                  <td>${rowData.height}</td>
                  <td>${rowData.width}</td>
                  <td>${rowData.sun}</td>
                  <td>${rowData.soil}</td>
                  <td>${rowData.spacing}</td>
                  <td>${rowData.descr}</td>
              </tr>
          `;
    }

    return returnString;
  } else if (product === 'grounds') {
    let returnString = '';
    if (isAdmin) {
      returnString = `
          <tr id="${rowData.id}">
              <td>${rowData.name}</td>
              <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
              <td>${rowData.width}</td>
              <td>${rowData.sun}</td>
              <td>${rowData.soil}</td>
              <td>${rowData.water}</td>
              <td>${rowData.descr}</td>
              <td>
                  <button type="button" class="btn btn-info"  on data-toggle="modal" data-target="#insertUpdateModal">
                      <span class="glyphicon glyphicon-pencil" title="edit an entry"></span>
                  </button>
              </td>
              <td>
                  <button type="button" class="btn btn-danger">
                      <span class="glyphicon glyphicon-remove" title="delete an entry"></span>
                  </button>
              </td>
          </tr>`;
    } else {
      returnString = `
          <tr id="${rowData.id}">
              <td>${rowData.name}</td>
              <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
              <td>${rowData.width}</td>
              <td>${rowData.sun}</td>
              <td>${rowData.soil}</td>
              <td>${rowData.water}</td>
              <td>${rowData.descr}</td>
          </tr>`;
    }
    return returnString;
  } else {
    console.log('buildRow unable to build the row for ' + product);
  }
}

function updateRowData(product, rowData) {
  if (product === 'trees') {
    return `<td>${rowData.name}</td>
          <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
          <td>${rowData.height}</td>
          <td>${rowData.width}</td>
          <td>${rowData.sun}</td>
          <td>${rowData.soil}</td>
          <td>${rowData.descr}</td>
          <td>
              <button type="button" class="btn btn-info"  on data-toggle="modal" data-target="#insertUpdateModal">
                  <span class="glyphicon glyphicon-pencil" title="edit an entry"></span>
              </button>
          </td>
          <td>
              <button type="button" class="btn btn-danger">
                  <span class="glyphicon glyphicon-remove" title="delete an entry"></span>
              </button>
          </td>`;
  } else if (product === 'shrubs') {
    return `<td>${rowData.name}</td>
          <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
          <td>${rowData.height}</td>
          <td>${rowData.width}</td>
          <td>${rowData.sun}</td>
          <td>${rowData.soil}</td>
          <td>${rowData.spacing}</td>
          <td>${rowData.descr}</td>
          <td>
              <button type="button" class="btn btn-info"  on data-toggle="modal" data-target="#insertUpdateModal">
                  <span class="glyphicon glyphicon-pencil" title="edit an entry"></span>
              </button>
          </td>
          <td>
              <button type="button" class="btn btn-danger">
                  <span class="glyphicon glyphicon-remove" title="delete an entry"></span>
              </button>
          </td>`;
  } else if (product === 'grounds') {
    return `<td>${rowData.name}</td>
          <td><img src="${rowData.image}" class="img-thumbnail" alt="Plant Thumbnail"></td>
          <td>${rowData.width}</td>
          <td>${rowData.sun}</td>
          <td>${rowData.soil}</td>
          <td>${rowData.water}</td>
          <td>${rowData.descr}</td>
          <td>
              <button type="button" class="btn btn-info"  on data-toggle="modal" data-target="#insertUpdateModal">
                  <span class="glyphicon glyphicon-pencil" title="edit an entry"></span>
              </button>
          </td>
          <td>
              <button type="button" class="btn btn-danger">
                  <span class="glyphicon glyphicon-remove" title="delete an entry"></span>
              </button>
          </td>`;
  } else {
    console.log('buildRow unable to build the row for ' + product);
  }
}

// ***
// This will build the form/modal that's used for updating and inserting plants to the database
// ***
function showForm(product, formType, formValues) {
  // console.log('showform product to follow:');
  // console.log(product);

  // console.log('form values:')
  // console.log(formValues);
  let id = '';
  let productValue = '';
  let name = '';
  let photo = '';
  let descr = '';
  let submitButton = '';
  let cancelButton = '';
  //Create all the custom lines for either insert of update forms.
  switch (formType) {
    //something new "+"
    case 'insert':
      id = ``;
      formType = `<form id="insertForm" class="well bg-grey" action="/api/v1/${product}" method="post" encType="multipart/form-data">`;
      productValue = `<input type="hidden" name="productType" value="${product}">`;
      name = '<input type="text" class="form-control" name="name" id="formName" placeholder="Name">';
      photo = '<input type="file" class="form-control" name="image" id="formImage" placeholder="Image">';
      descr =
        '<textarea class="form-control" name="descr" placeholder="Description" rows="3" id="formTextArea"></textarea>';
      submitButton = '<input class="btn btn-primary" type="submit" value="Add">';
      cancelButton = '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>';
      break;
    //editing "pencil"
    case 'update':
      //IMPORTANT since put isn't used in a standard form the mehtod originally gets submited as a get, but the action hijack redoes it as a put.
      formType = `<form id="updateForm" class="well bg-grey" action="/api/v1/${product}" method="put" encType="multipart/form-data">`;
      id = `<input type="hidden" name="id" value="${formValues.id}">`;
      productValue = `<input type="hidden" name="productType" value="${product}">`;
      name = `<input type="text" class="form-control" name="name" value="${formValues.name}" id="formName" placeholder="Name">`;
      photo = `<input type="file" class="form-control" value="${formValues.photo}" name="image" id="formImage" placeholder="Image">`;
      descr = `<textarea class="form-control" name="descr" placeholder="Description" rows="3" id="formTextArea">${formValues.descr}</textarea>`;
      submitButton = '<input class="btn btn-primary" type="submit" value="update">';
      cancelButton = `<button class="btn btn-primary" type="cancel" data-dismiss="modal">Cancel</button>`;
      break;
  }

  //The creation of the displayed form.
  //TREE form
  if (product === 'trees') {
    let formHtml = `
      <tr>
      <td colspan="10">
          ${formType}
          ${productValue}
          ${id}
          <div class="row">

              <div class="form-group col-sm-6">
                  <label for="formName">Name</label>
                  ${name}

              </div>
              <div class="form-group col-sm-6" >
                  <label for="formImage">Image</label>
                  ${photo}
              </div>
          </div><!-- end row -->
          <div class="row">
              <div class="form-group col-sm-3">
                  <label for="formHeight">Tree Height(ft)</label>
                  <select class="form-control" name="height" id="formHeight">
                      <option value="10 - 20">10 - 20</option>
                      <option value="20 - 30">20 - 30</option>
                      <option value="30 - 40">30 - 40</option>
                      <option value="40+">40+</option>
                  </select>
              </div>
              <div class="form-group col-sm-3">
                  <label for="formWidth">Tree Width(ft)</label>
                  <select class="form-control" name="width" id="formWidth">
                      <option value="05 - 10">05 - 10</option>
                      <option value="10 - 15">10 - 15</option>
                      <option value="15 - 20">15 - 20</option>
                      <option value="20+">20+</option>
                  </select>
              </div>
              <div class="form-group col-sm-3">
                  <label for="formSun">Sun Type</label>
                  <select class="form-control" name="sun" id="formSun">
                      <option value="Full">Full</option>
                      <option value="Partial">Partial</option>
                      <option value="Shade">Shade</option>
                  </select>
              </div>
              <div class="form-group col-sm-3">
                  <label for="formSoil">Soil Type</label>
                  <select class="form-control" name="soil" id="formSoil">
                      <option value="Silt">Silt</option>
                      <option value="Sandy">Sandy</option>
                      <option value="Clay">Clay</option>
                  </select>
              </div>
          </div> <!-- end row -->
          <div class="row">
              <div class="form-group col-sm-12">
                  <label for="formTextArea">Description</label>
                  ${descr}
              </div>
          </div> <!-- end row -->
          <div class="row">
              <div class="col-sm-2">
                  ${submitButton}
              </div>
              <div class="col-sm-10">
                  ${cancelButton}
              </div>
          </div>
      </form>
      </td>
      </tr>
      `;
    return formHtml;
  } else if (product === 'shrubs') {
    //end of tree-if

    //SHRUB form
    let formHtml = `
      <tr>
      <td colspan="10">
       ${formType}
       ${productValue}
        ${id}
          <div class="row">
              <div class="form-group col-sm-6">
                  <label for="formName">Name</label>
                  ${name}
              </div>
              <div class="form-group col-sm-6">
                  <label for="formImage">Image</label>
                  ${photo}
              </div>
          </div><!-- end row -->
          <div class="row">
              <div class="form-group col-sm-3">
                  <label for="formHeight">Max Height(ft)</label>
                  <select class="form-control" name="height" id="formHeight">
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4</option>
                      <option value="4.5">4.5</option>
                      <option value="5">5</option>
                      <option value="5.5">5.5</option>
                      <option value="6">6</option>
                      <option value="6.5">6.5</option>
                      <option value="7">7</option>
                      <option value="7.5">7.5</option>
                      <option value="8">8</option>
                      <option value="8.5">8.5</option>
                      <option value="9">9</option>
                  </select>
              </div>
              <div class="form-group col-sm-3">
                  <label for="formWidth">Shrubs Width(ft)</label>
                  <select class="form-control" name="width" id="formWidth">
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4</option>
                      <option value="4.5">4.5</option>
                      <option value="5">5</option>
                      <option value="5.5">5.5</option>
                      <option value="6">6</option>
                      <option value="6.5">6.5</option>
                      <option value="7">7</option>
                      <option value="7.5">7.5</option>
                      <option value="8">8</option>
                      <option value="8.5">8.5</option>
                      <option value="9">9</option>
                  </select>
              </div>
              <div class="form-group col-sm-2">
                  <label for="formSun">Sun Type</label>
                  <select class="form-control" name="sun" id="formSun">
                      <option value="Full">Full</option>
                      <option value="Partial">Partial</option>
                      <option value="Shade">Shade</option>
                  </select>
              </div>
              <div class="form-group col-sm-2">
                  <label for="formSoil">Soil Type</label>
                  <select class="form-control" name="soil" id="formSoil">
                      <option value="Silt">Silt</option>
                      <option value="Sandy">Sandy</option>
                      <option value="Clay">Clay</option>
                  </select>
              </div>
              <div class="form-group col-sm-2">
                  <label for="formSpacing">Spacing(in)</label>
                  <select class="form-control" name="spacing" id="formSpacing">
                      <option value="6">6</option>
                      <option value="12">12</option>
                      <option value="18">18</option>
                      <option value="24">24</option>
                      <option value="30">30</option>
                      <option value="36">36</option>
                      <option value="42">42</option>
                  </select>
              </div>
          </div> <!-- end row -->
          <div class="row">
              <div class="form-group col-sm-12">
                  <label for="formTextArea">Description</label>
                  ${descr}
              </div>
          </div> <!-- end row -->
          <div class="row">
              <div class="col-sm-2">
                  ${submitButton}
              </div>
              <div class="col-sm-10">
                  ${cancelButton}
              </div>
          </div>
      </form>
      </td>
      </tr>
      `;
    return formHtml;
  } else if (product === 'grounds') {
    // end shrub

    //GROUND form
    let formHtml = `
      <tr>
      <td colspan="10">
       ${formType}
       ${productValue}
       ${id}
          <div class="row">
              <div class="form-group col-sm-6">
                  <label for="formName">Name</label>
                  ${name}
              </div>
              <div class="form-group col-sm-6">
                  <label for="formImage">Image</label>
                  ${photo}
              </div>
          </div><!-- end row -->
          <div class="row">
              <div class="form-group col-sm-3">
                  <label for="formWidth">Cover Width(in)</label>
                  <select class="form-control" name="width" id="formWidth">
                      <option value="4">4</option>
                      <option value="8">8</option>
                      <option value="12">12</option>
                      <option value="16">16</option>
                      <option value="20">20</option>
                      <option value="24">24</option>
                      <option value="28">28</option>
                      <option value="32">32</option>
                      <option value="36">36</option>
                      <option value="40">40</option>
                  </select>
              </div>
              <div class="form-group col-sm-3">
                  <label for="formSun">Sun Type</label>
                  <select class="form-control" name="sun" id="formSun">
                      <option value="Full">Full</option>
                      <option value="Partial">Partial</option>
                      <option value="Shade">Shade</option>
                  </select>
              </div>
              <div class="form-group col-sm-3">
                  <label for="formSoil">Soil Type</label>
                  <select class="form-control" name="soil" id="formSoil">
                      <option value="Silt">Silt</option>
                      <option value="Sandy">Sandy</option>
                      <option value="Clay">Clay</option>
                  </select>
              </div>
              <div class="form-group col-sm-3">
                  <label for="formWater">Frequency of Water</label>
                  <select class="form-control" name="water" id="formWater">
                      <option value="Any">Any</option>
                      <option value="Regularly">Regularly</option>
                      <option value="Wet">Wet</option>
                      <option value="Dry">Dry</option>
                      <option value="Drought Resistant">Drought Resistant</option>
                  </select>
              </div>
          </div> <!-- end row -->
          <div class="row">
              <div class="form-group col-sm-12">
                  <label for="formTextArea">Description</label>
                  ${descr}
              </div>
          </div> <!-- end row -->
          <div class="row">
              <div class="col-sm-2">
                  ${submitButton}
              </div>
              <div class="col-sm-10">
                  ${cancelButton}
              </div>
          </div>
      </form>
      </td>
      </tr>
      `;
    return formHtml;
  }
}

function UpdateFormSelectFields(formValues) {
  $('#formWater').val(formValues.water);
  $('#formSoil').val(formValues.soil);
  $('#formSun').val(formValues.sun);
  $('#formWidth').val(formValues.width);
  $('#formSpacing').val(formValues.spacing);
  $('#formHeight').val(formValues.height);
}

// ***
// this is called when the delete action is executed
// ***
function deleteRow(product, id) {
  $.ajax({
    url: `api/v1/${product}/${id}`,
    method: 'DELETE',
    //since I use the parameters for the values this isn't used but put here to demonstrate how it would work.
    data: { product: product, id: id },
    dataType: 'html',
    success: function(response) {
      //remove the object from the serverFormData
      response.id = parseInt(response.id);
      for (let i in serverFormData) {
        console.log(i);
        if (serverFormData[i].id === id) {
          serverFormData.splice(i, 1);
          continue;
        }
      }
    }
  });
}

function applyInsertFormSubmission(product) {
  $('#insertForm').on('submit', function(event) {
    event.preventDefault();

    //form validation
    let validForm = formValidation(this);
    if (!validForm) return false;

    //This is needed to send the form data to the server.
    let formData = new FormData(this);

    $.ajax({
      url: `api/v1/${product}`,
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        $('#productData table tbody').append(insertRowData(product, response));
        delete response.productType;
        serverFormData.push(response);
      }
    })
      .done(function() {
        console.log('insert completed.');
      })
      .fail(function() {
        console.log('insert not completed.');
      });
    $('#insertUpdateModal').modal('hide');
  });
}

function applyUpdateFormSubmission(product, formValues) {
  //set all the selected fields to there default values.
  UpdateFormSelectFields(formValues);
  $('#updateForm').on('submit', function(event) {
    event.preventDefault();

    //form validation
    let validForm = formValidation(this);
    if (!validForm) return false;

    //This is needed to send the form data to the server.
    let formData = new FormData(this);

    $.ajax({
      url: `api/v1/${product}`,
      method: 'PUT',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        $(`#${response.id}`).html(updateRowData(product, response));
        response.id = parseInt(response.id);
        for (let i in serverFormData) {
          console.log(i);
          if (serverFormData[i].id === response.id) {
            delete response.productType;
            serverFormData[i] = response;
            continue;
          }
        }
      }
    })
      .done(function() {
        console.log('update completed.');
      })
      .fail(function() {
        console.log('update not completed.');
      });

    $('#insertUpdateModal').modal('hide');
  });
}

function formValidation(formInfo) {
  //If the form data isn't correct \\ Data validation section
  let formData = FormDataToJSON(formInfo);
  console.log(formData);
  let retVal = true;
  let failData = {};

  if (formData.name === '') {
    retVal = false;
    $('#formName').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  if (formData.image.name === '') {
    //Change this to handle photos?
    //retVal = false;
    //$('#formImage').attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
  }
  if (formData.height === '') {
    retVal = false;
    $('#formHeight').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  if (formData.value === '') {
    //Value is width?
    retVal = false;
    $('#formWidth').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  if (formData.sun === '') {
    retVal = false;
    $('#formSun').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  if (!formData.soil) {
    retVal = false;
    $('#formSoil').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  if (formData.descr === '') {
    retVal = false;
    $('#formTextArea').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  if (formData.spacing === '') {
    retVal = false;
    $('#formSpacing').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  if (formData.water === '') {
    retVal = false;
    $('#formWater').attr('style', 'border-radius: 5px; border:#FF0000 1px solid;');
  }
  return retVal;
}

//Got this code from
//https://stackoverflow.com/questions/41431322/how-to-convert-formdatahtml5-object-to-json
function FormDataToJSON(FormElement) {
  var formData = new FormData(FormElement);
  var ConvertedJSON = {};
  for (const [ key, value ] of formData.entries()) {
    ConvertedJSON[key] = value;
  }

  return ConvertedJSON;
}

function showContactUs() {
  //tree.sort(compareName);
  //call reverse() on array object when want to do other sort
  let htmlData = `
      <div class="custoWell container">

          <h2 class="well">Contact Us</h2>
          <img src="/img/directions.PNG" style="float: left" class="img-thumbnail " alt="directions_image" >

      </div>

      <div class="custoWell container">
          <div class="well">
              <h4>Find us here!</h4>
              <img src="/img/home.jpeg" style="float: left" class="img-thumbnail w3-round" alt="phone_img" height="42" width="42">
              <p>123 Sesame St, Springville, UT 84663</p>
          </div>

          <div class="well ">
              <h4>Call Us!</h4>
              <img src="/img/phone.png" style="float: left" class="img-thumbnail w3-round" alt="phone_img" height="42" width="42">
              <p>Phone: (801)756-1234</p>
          </div>

          <div class="well">
              <h4>Hours of Operation!</h4>
              <img src="/img/clock.png" style="float: left" class="img-thumbnail w3-round" alt="phone_img" height="42" width="42">
              <p>Hours: (Monday - Friday) 9:00 am - 6:00 pm</p>
          </div>

          <div class="well">
              <h4>Email Us!</h4>
              <img src="/img/email.jpg" style="float: left" class="img-thumbnail w3-round" alt="phone_img" height="42" width="42">
              <p>Email: myBoo@hotmail.com</p>
          </div>


      </div>

  `;
  $('#mainContent').html(htmlData);
}

function showAbout() {
  //tree.sort(compareName);
  //call reverse() on array object when want to do other sort
  let htmlData = `
      <div class="custoWell container">
          <h2  class="well">About</h2>
          <img src="/img/about_us.jpg" style="float: left" class="contain" alt="directions_image" width="290" height="200">

          <div class="well">
              <p>"I didn't choose the thug life. The thug life choose me."</p>
              <p>Te facer albucius neglegentur pro, in justo vivendo dignissim vis.
                  Ne moderatius efficiendi his, populo singulis voluptatibus ad eum.
                  Nec ea sumo cetero prodesset, dolorum tractatos democritum ius eu,
                  ignota meliore patrioque te sea. His enim offendit definitiones at.
                  His ut debitis ceteros. Ad pri debitis appareat. Eos no quas hendrerit scribentur.
              </p>
          </div>

          <div class="well">
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Vitae nunc sed velit dignissim sodales ut eu sem. Eu turpis egestas pretium aenean pharetra magna.
                  Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Lorem ipsum dolor sit amet consectetur adipiscing elit duis.
                  Faucibus pulvinar elementum integer enim neque volutpat. Velit aliquet sagittis id consectetur purus ut.
                  Volutpat sed cras ornare arcu dui vivamus arcu felis. Sed euismod nisi porta lorem mollis aliquam ut porttitor leo.
                  Nullam ac tortor vitae purus faucibus ornare suspendisse sed.

                  Consequat interdum varius sit amet mattis vulputate enim. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam.
                  Vitae congue mauris rhoncus aenean. Facilisi etiam dignissim diam quis enim lobortis. Augue eget arcu dictum varius duis at consectetur lorem donec.
                  Augue lacus viverra vitae congue eu consequat ac. Faucibus a pellentesque sit amet porttitor eget dolor.
                  Feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Vitae tortor condimentum lacinia quis vel eros donec ac odio.
                  Hac habitasse platea dictumst quisque sagittis purus sit amet. Tristique magna sit amet purus gravida.
                  Commodo nulla facilisi nullam vehicula.
              </p>

              <img src="/img/happyTree.jpg" style="float: left" class="contain" alt="directions_image" width="200" height="140">

              <p>
                  In aliquam sem fringilla ut morbi tincidunt augue. Ultricies integer quis auctor elit sed vulputate mi sit amet.
                  Viverra nam libero justo laoreet sit amet. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est.
                  Eu consequat ac felis donec et odio pellentesque diam. Accumsan lacus vel facilisis volutpat est velit egestas dui.
                  Elit sed vulputate mi sit amet. Congue eu consequat ac felis donec et odio pellentesque.
                  Morbi tristique senectus et netus et malesuada. Neque convallis a cras semper auctor neque.
                  Nunc faucibus a pellentesque sit amet porttitor. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien.
                  Integer enim neque volutpat ac tincidunt vitae semper. Lacus laoreet non curabitur gravida arcu ac.
                  Arcu vitae elementum curabitur vitae nunc sed velit. Elementum pulvinar etiam non quam.
                  Id nibh tortor id aliquet lectus. Quis viverra nibh cras pulvinar mattis nunc sed blandit libero.
                  Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.
              </p>
          </div>
      </div>




  `;
  $('#mainContent').html(htmlData);
}

//just lots of HTML code
function showFAQ() {
  //tree.sort(compareName);
  //call reverse() on array object when want to do other sort
  //<div><img src="/img/faq.jpg" style="float: left" class="img-thumbnail" alt="directions_image" width="350" height="260"></div>

  let htmlData = `

      <div class="custoWell container">

          <div class="well">
          <h2 id="topQuestions">Frequently Asked Questions</h2>
          </div>

          <div class="well clear">
              <h3>How do I submit an order? </h2>
              <ol>
                  <li><a href="#Q1A1">What is a good email to contact you?</a></li>
                  <li><a href="#Q1A2">What is your phone number?</a></li>
                  <li><a href="#Q1A3">Where are you located?</a></li>
                  <li><a href="#Q1A4">How can I contact you?</a></li>
              </ol>


              <h3>How can i better take care of my plants?</h2>
              <ol>
                  <li><a href="#Q2A1">Fierent deserunt eu vix, vitae patrioque et eum?</a></li>
                  <li><a href="#Q2A2">Eruditi equidem propriae est id, esse sapientem intellegebat no nam?</a></li>
                  <li><a href="#Q2A3">Sea simul scaevola id. Vix tale laoreet ne?</a></li>
              </ol>


                  <h3>How often do I need to water my plants?</h2>
              <ol>
                  <li><a href="#Q3A1">Look at inventory for more instructions?</a></li>
                  <li><a href="#Q3A2">At decore tamquam pri. Sed nostro consequat cu?</a></li>
                  <li><a href="#Q3A3">Equidem hendrerit dissentias mei te, sanctus aliquando est no?</a></li>
                  <li><a href="#Q3A4">Justo soluta ad vis, idque ubique scaevola te pri?</a></li>
                  <li><a href="#Q3A5">Clita eligendi quaestio cu est, duo in nominati urbanitas?</a></li>
              </ol>


              <h3>Returns?</h2>
              <ol>
                  <li><a href="#Q4A1">I want to make a return. What do i do?</a></li>
                  <li><a href="#Q4A2">Vim menandri honestatis ut, vis in lorem sapientem ocurreret?</a></li>
                  <li><a href="#Q4A3">Affert recusabo persequeris vim te, no ridens ocurreret duo?</a></li>
                  <li><a href="#Q4A4">Ut agam modus deterruisset sit, ea pri graece essent gubergren?</a></li>
                  <li><a href="#Q4A5">Qui wisi decore at, ut pri dolor consequat abhorreant?</a></li>
                  <li><a href="#Q4A6">Esse sapientem intellegebat no nam, vix in dolorum quaestio appellantur?</a></li>
              </ol>

                  <h3>Payment Options?</h2>
                  <ol>
                  <li><a href="#Q5A1">Do you take cash?</a></li>
                  <li><a href="#Q5A2">Credit Cards? If yes, do you take American Express?</a></li>
                  <li><a href="#Q5A3">Do you take Bit Coin?</a></li>
              </ol>

          </div>


          <div class="well">

              <h3>How do I submit an order?</h3>
              <ol>
                  <li>
                      <dl>
                          <dt>
                              <abbr>Q: What is a good email to contact you?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong title="A1">A:</strong>
                                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </p>

                              <a title="topQuestions" id="Q1A1" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q1A2">Q: What is your phone number?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                  Orci nulla pellentesque dignissim enim sit amet. Blandit cursus risus at ultrices mi tempus imperdiet nulla.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q1A3">Q: Where are you located?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Donec ultrices tincidunt arcu non sodales.
                                  Ultrices neque ornare aenean euismod. Consectetur a erat nam at lectus urna duis convallis. Blandit massa enim nec dui nunc mattis enim ut.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q1A4">Q: How can I contact you?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Ultrices gravida dictum fusce ut placerat orci. Sit amet facilisis magna etiam tempor. Id donec ultrices tincidunt arcu.
                                  Et magnis dis parturient montes nascetur ridiculus mus mauris. Imperdiet dui accumsan sit amet nulla facilisi morbi tempus.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
              </ol>
          </div>



          <div class="well">
              <h3>How can i better take care of my plants?</h3>
              <ol>
                  <li>
                      <dl>
                          <dt>
                              <abbr id="Q2A1">Q: Fierent deserunt eu vix, vitae patrioque et eum?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Eget mi proin sed libero enim sed faucibus turpis. Nunc pulvinar sapien et ligula. Lacus sed viverra tellus in hac habitasse.
                                  Malesuada nunc vel risus commodo viverra maecenas accumsan.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q2A2">Q: Eruditi equidem propriae est id, esse sapientem intellegebat no nam?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Eget mi proin sed libero enim sed faucibus turpis. Nunc pulvinar sapien et ligula. Lacus sed viverra tellus in hac habitasse.
                                  Malesuada nunc vel risus commodo viverra maecenas accumsan.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q2A3">Q: Sea simul scaevola id. Vix tale laoreet ne?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  A cras semper auctor neque vitae. Enim nunc faucibus a pellentesque sit amet. Donec ultrices tincidunt arcu non sodales neque sodales ut etiam.
                                  Imperdiet nulla malesuada pellentesque elit eget. Eros in cursus turpis massa.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>

              </ol>
          </div>


          <div class="well">
              <h3>How often do I need to water my plants?</h3>
              <ol>
                  <li>
                      <dl>
                          <dt>
                              <abbr id="Q3A1">Q: Look at inventory for more instructions?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Pharetra massa massa ultricies mi quis hendrerit dolor magna. Amet consectetur adipiscing elit ut aliquam purus.
                                  Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Facilisi nullam vehicula ipsum a.
                                  Accumsan sit amet nulla facilisi morbi tempus. Amet massa vitae tortor condimentum lacinia.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q3A2">Q: At decore tamquam pri. Sed nostro consequat cu?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  In fermentum et sollicitudin ac orci phasellus egestas. Suspendisse potenti nullam ac tortor vitae.
                                  Orci eu lobortis elementum nibh tellus molestie. Sem integer vitae justo eget.
                                  Dolor sit amet consectetur adipiscing elit pellentesque habitant.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q3A3">Q: Equidem hendrerit dissentias mei te, sanctus aliquando est no?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Tempus quam pellentesque nec nam aliquam.
                                  Diam maecenas sed enim ut sem viverra aliquet eget sit. Vestibulum morbi blandit cursus risus.
                                  Facilisis mauris sit amet massa vitae tortor condimentum. Sed enim ut sem viverra aliquet eget sit.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q3A4">Q: Justo soluta ad vis, idque ubique scaevola te pri?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Risus pretium quam vulputate dignissim suspendisse in est ante. At auctor urna nunc id cursus.
                                  Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Mi eget mauris pharetra et ultrices neque ornare.
                                  Tellus molestie nunc non blandit massa. Faucibus scelerisque eleifend donec pretium vulputate sapien nec.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q3A5">Q: Clita eligendi quaestio cu est, duo in nominati urbanitas?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Adipiscing diam donec adipiscing tristique. Integer eget aliquet nibh praesent tristique magna.
                                  Tempus urna et pharetra pharetra massa massa ultricies. Sagittis nisl rhoncus mattis rhoncus urna.
                                  Sed cras ornare arcu dui vivamus arcu felis. Sit amet porttitor eget dolor morbi non arcu risus quis.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
              </ol>
          </div>


          <div class="well">
              <h3>Returns?</h3>
              <ol>
                  <li>
                      <dl>
                          <dt>
                              <abbr id="Q4A1">Q: I want to make a return. What do i do?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Pharetra massa massa ultricies mi quis hendrerit dolor magna. Amet consectetur adipiscing elit ut aliquam purus.
                                  Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Facilisi nullam vehicula ipsum a.
                                  Accumsan sit amet nulla facilisi morbi tempus. Amet massa vitae tortor condimentum lacinia.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q4A2">Q: Vim menandri honestatis ut, vis in lorem sapientem ocurreret?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  In fermentum et sollicitudin ac orci phasellus egestas. Suspendisse potenti nullam ac tortor vitae.
                                  Orci eu lobortis elementum nibh tellus molestie. Sem integer vitae justo eget.
                                  Dolor sit amet consectetur adipiscing elit pellentesque habitant.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q4A3">Q: Affert recusabo persequeris vim te, no ridens ocurreret duo?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Tempus quam pellentesque nec nam aliquam.
                                  Diam maecenas sed enim ut sem viverra aliquet eget sit. Vestibulum morbi blandit cursus risus.
                                  Facilisis mauris sit amet massa vitae tortor condimentum. Sed enim ut sem viverra aliquet eget sit.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q4A4">Q: Ut agam modus deterruisset sit, ea pri graece essent gubergren?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Risus pretium quam vulputate dignissim suspendisse in est ante. At auctor urna nunc id cursus.
                                  Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Mi eget mauris pharetra et ultrices neque ornare.
                                  Tellus molestie nunc non blandit massa. Faucibus scelerisque eleifend donec pretium vulputate sapien nec.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q4A5">Q: Qui wisi decore at, ut pri dolor consequat abhorreant?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Adipiscing diam donec adipiscing tristique. Integer eget aliquet nibh praesent tristique magna.
                                  Tempus urna et pharetra pharetra massa massa ultricies. Sagittis nisl rhoncus mattis rhoncus urna.
                                  Sed cras ornare arcu dui vivamus arcu felis. Sit amet porttitor eget dolor morbi non arcu risus quis.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q4A6">Q: Esse sapientem intellegebat no nam, vix in dolorum quaestio appellantur?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Adipiscing diam donec adipiscing tristique. Integer eget aliquet nibh praesent tristique magna.
                                  Tempus urna et pharetra pharetra massa massa ultricies. Sagittis nisl rhoncus mattis rhoncus urna.
                                  Sed cras ornare arcu dui vivamus arcu felis. Sit amet porttitor eget dolor morbi non arcu risus quis.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
              </ol>

          </div>


          <div class="well">
              <h3>Payment Options?</h3>
              <ol>
                  <li>
                      <dl>
                          <dt>
                              <abbr id="Q5A1">Q: Do you take cash?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Mi bibendum neque egestas congue quisque egestas diam in. Sit amet facilisis magna etiam tempor orci. Ac turpis egestas maecenas pharetra convallis posuere.
                                  A scelerisque purus semper eget duis at. Libero nunc consequat interdum varius sit.
                                  Fames ac turpis egestas sed tempus urna et pharetra pharetra. Maecenas accumsan lacus vel facilisis volutpat.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q5A2">Q: Credit Cards? If yes, do you take American Express?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Et malesuada fames ac turpis egestas. Suspendisse faucibus interdum posuere lorem ipsum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
                  <li>
                      <dl class="borderDots">
                          <dt>
                              <abbr id="Q5A3">Q: Do you take Bit Coin?</abbr>
                          </dt>
                          <dd>
                              <p>
                                  <strong>A:</strong>
                                  Et netus et malesuada fames ac turpis. Augue neque gravida in fermentum. Nibh tellus molestie nunc non blandit massa enim nec dui.
                                  Neque egestas congue quisque egestas diam in arcu cursus. Odio ut enim blandit volutpat.
                              </p>

                              <a title="topQuestions" href="#topQuestions">Return to Top</a>
                          </dd>
                      </dl>
                  </li>
              </ol>
          </div>
      </div>
  `;
  $('#mainContent').html(htmlData);
}

//serverFormData=array of cards-grid listed
function displayCards() {
  //let htmlData = `<div class="well">`;

  let htmlData = `<div class="custoWell">
                      <div class="card-group row grid">`;

  for (let i = 0; i < serverFormData.length; i++) {
    //to have 4 cards per row
    if (i % 4 == 0 && i != 0) {
      //end one row, start another
      htmlData += `</div>
                      <div class="card-group row grid">`;
    }

    htmlData += `<div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-3 card grid-item">
                          <div class="thumbnail " >
                              <img src="/../img/${serverFormData[i].image}" class="card-img-top" >
                              <div class="card-block aption ">
                                  <h3 id="thumbnail-label" style="center">${serverFormData[i].name}</h3>
                              </div>
                          </div><!-- thumbnail -->
                      </div> <!-- card -->`;
  }

  //end last row, end final div
  htmlData += `</div>
                  </div>`;

  $('#productData').html(htmlData);
}

/*hold for now

under thumbnail div
style="display:inline-block;position:relative"


*/
