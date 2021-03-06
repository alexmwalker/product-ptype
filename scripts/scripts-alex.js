  /* ==  Alex's font-size changer   ==  */
  /* ==  Scaling the root scales all font's proportionally   ==  */
  var currentgrid = $(":root").css("--basegrid");
  var currentgridtablet = $(":root").css("--basegrid-tablet");
  var currentgridlaptop = $(":root").css("--basegrid-laptop");
  var currentgridwide = $(":root").css("--basegrid-wide");
  var newcurrentgrid;
  var newcurrentgridtablet;
  var newcurrentgridlaptop;
  var newcurrentgridwide;
  $('a.darkmode').click(function(e) {
  e.preventDefault();
  });

  /* === CREATE CLICKPOP TOOLBAR === */

  // TOOLBAR MENU ORDER: label, link, class
  let actions = [
    ['Ask a question','#', 'ask'],
    ['Link','#', 'link'],
    ['Tweet', '#', 'tweet'],
    ['Bookmark','#', 'bookmark']
  ];
  
  // CONSTRUCT THE TEXTTOOL UI UNIT FROM A UL
  let fragment = new DocumentFragment();

  let ul = document.createElement('ul');
  ul.setAttribute('class', 'tooltip');

  actions.forEach((action) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', action[1]);
    a.setAttribute('class', action[2]);
    a.innerHTML = action[0];
    li.appendChild(a);
    ul.appendChild(li);
  })

  fragment.appendChild(ul)




/* == SIMPLE nav controls/animations  == */
  $(document).ready(function () {
    $('.hamburger').click(function () {
      $(this).toggleClass('open');
    $('.mobilenav').toggleClass('open');
  });
  $('.viewchapters').click(function () {
    $('.toc-container').toggleClass('open');
    $('.viewchapters').toggleClass('open');
  });
  $('#closetoc').click(function () {
    $('.toc-container').removeClass('open');
  });
  $('#showfontchanger').click(function () {
    $('#font-adjuster-container').toggleClass('show');
  });
  $('.social-anchor').click(function () {
    $('#reeedr-body>.container').toggleClass('social-panel');
  });
  
// TEXTTOOL controls
  $('#reeedr-body .col-12>p').append(fragment); // ATTACH a toolbar unit to every <P>

  
  $('#reeedr-body p'||'#reeedr-body ul').click(function () { // clear other 'selected's on click
    //$('p').remove( '.tooltip' );
    $('p'||'ul').removeClass('selected'); 
    $(this).addClass('selected');

  });


  // TEXTTOOL controls

  $('ul.tooltip li a.link').click(function () { // click copy link
      $('#modalbase').addClass('show');
      $('.linkmodal-body').addClass('show');
      return false;
    });
  $('ul.tooltip li a.bookmark').click(function () { // click bookmark
      $('#modalbase').addClass('show');
      $('.bookmark-body').addClass('show');
      return false;
    });
  $('ul.tooltip li a.tweet').click(function () { // click send tweet
      $('#modalbase').addClass('show');
      $('.tweet-body').addClass('show');
      return false;
    });
    $('ul.tooltip li a.ask').click(function () { // click send tweet
      $('#modalbase').addClass('show');
      $('.askquestion-body').addClass('show');
      return false;
    });

    $('#copy-link').click(function () { // Copy link button - confirm 'copy' was successful
    $('.linkback').addClass('copied');
    $("#copy-link").text("       Copied!  ");
    $("#copy-link").css("background", "#f60");
    setTimeout(function() {
      $(".linkback").removeClass("copied");
      $("#copy-link").text("Copy link");
      $("#copy-link").css("background", "#059FF5");
    }, 3000);
    return false;
  });

  $('#ask').click(function () { // Copy link button - confirm 'copy' was successful
    $('.part-1').css("display", "none");
    $('.part-2').css("display", "block");
    setTimeout(function() {
      $('.part-2').css("display", "none");
      $('.part-3').css("display", "block");
    }, 2000);
    return false;
  });

 
  //$('#modalbase'||'.close-link').click(function
  $('.closeme').click(function () { // close modal
        $('#modalbase').removeClass('show');
        $('#reeedr-body p').removeClass('selected');
        $('.linkmodal-body').removeClass('show');
        $('.bookmark-body').removeClass('show');
        $('.askquestion-body').removeClass('show');
        $('.tweet-body').removeClass('show');
        return false;
    });


// DARK MODE CONTROL

  $('.darkmode').click(function () {
    $('#reeedr').toggleClass('dark');
  });

  // OFFLINE MODE

  $("#offlinemode input").change(function () {
    $("body").toggleClass("local", this.checked);
    });


  // SEARCH 

  $('#start-search').click(function () {
    startSearch();
    $('#search-panel').toggleClass('showresults');

  });
  /* watch for search form submit */ 
  $( "#searchform" ).submit(function( event ) {
    //alert( "Handler for .submit() called." );
    //$('#search-panel').removeClass('open');
    //$('#search-panel').addClass('lock');
    startSearch();
    grabSearch();
    event.preventDefault();
  });





  /* CLICK SEARCH */ 
  $('.search-control').click(function () { 
    $('.search-container').addClass('open');
    $('#booksearch').focus();
 
  });

  $('#search-closeme').click(function () {
    //$('#search-panel').toggleClass('showresults');
    $('.book-search-results-list dt').remove();
    $('.book-search-results-list dd').remove();
    $('#search-panel').removeClass('showresults');
    //$('#search-panel').removeClass('open');
    $('.search-container').removeClass('open');
    /*$('#search-panel').removeClass('lock');
    $('#reeedr-body').css('height', 'auto');
    $('#reeedr-body').css('overflow', 'auto');
    $('#tool-container').css('position', 'relative');*/
  });



/*===================
  const openModalBtn = document.getElementById("open-modal-btn");
  const modalContainer = document.querySelector(".modal-container");
  const modalLayer = modalContainer.querySelector(".modal-layer");
  
  function hideModal() {
    document.documentElement.classList.remove("modal-active");
    modalContainer.style.display = "none";
  }
  
  function showModal() {
    document.documentElement.classList.add("modal-active");
    modalContainer.style.display = null;
  }
  
  openModalBtn.addEventListener("click", showModal);
  modalLayer.addEventListener("click", hideModal);
  
  showModal();

/*===================*/


  /* ===  Take search term from input for use in page  ===  */
    function grabSearch(){
      var searchterm = document.querySelector("#booksearch").value;
      //alert('The searchterm is ' + searchterm);
      //document.queryselectorAll("em.query");
      $( "em.query" ).append( searchterm );
    }



  /* ===  Font rescaling  ===  */
  /*   scaling the --basegrid :root font-size translates through to everything.   */
  $('.fontsizedown').click(function () {
    newcurrentgrid = parseInt(currentgrid, 10) - 4 + 'px';
    $(":root").css("--basegrid", newcurrentgrid);
    //console.log("currentgrid: " + currentgrid);
    //console.log("newcurrentgrid: " + newcurrentgrid);
    currentgrid = newcurrentgrid;
    newcurrentgridtablet = parseInt(currentgridtablet, 10) - 4 + 'px';
    $(":root").css("--basegrid-tablet", newcurrentgridtablet);
    //console.log("currentgridtablet: " + currentgridtablet);
    //console.log("newcurrentgridtablet: " + newcurrentgridtablet);
    currentgridtablet = newcurrentgridtablet;
    newcurrentgridlaptop = parseInt(currentgridlaptop, 10) - 4 + 'px';
    $(":root").css("--basegrid-laptop", newcurrentgridlaptop);
    currentgridlaptop = newcurrentgridlaptop;
    newcurrentgridwide = parseInt(currentgridwide, 10) - 4 + 'px';
    $(":root").css("--basegrid-wide", newcurrentgridwide);
    currentgridwide = newcurrentgridwide;
  });
  
  $('.fontsizeup').click(function () {
    newcurrentgrid = parseInt(currentgrid, 10) + 4 + 'px';
    $(":root").css("--basegrid", newcurrentgrid);
    currentgrid = newcurrentgrid;
    newcurrentgridtablet = parseInt(currentgridtablet, 10) + 4 + 'px';
    $(":root").css("--basegrid-tablet", newcurrentgridtablet);
    currentgridtablet = newcurrentgridtablet;
    newcurrentgridlaptop = parseInt(currentgridlaptop, 10) + 4 + 'px';
    $(":root").css("--basegrid-laptop", newcurrentgridlaptop);
    currentgridlaptop = newcurrentgridlaptop;
    newcurrentgridwide = parseInt(currentgridwide, 10) + 4 + 'px';
    $(":root").css("--basegrid-wide", newcurrentgridwide);
    currentgridwide = newcurrentgridwide;
    });

  });


  /* ==  Fixed nav   == */
  $(window).resize(function () {
      /* close the menu on screen resize */
      $('.showmobile').removeClass('open');
      $('.mobilenav').removeClass('open');
  });
  $(window).scroll(function () {
      /* close the menu on scroll */
      $('.showmobile').removeClass('open');
      $('.mobilenav').removeClass('open');
  });

  function scrollActions() {
  const brand = document.querySelector('.sitepoint-branding'); // select the brand
  const toolcontainer = document.querySelector('#tool-container'); // height of the toolstrip
  const toolstrip = document.querySelector('#toolstrip'); // height of the toolstrip
  const bookpanel = document.querySelector('.bookpanel'); // height of the bookpanel
  const totalbody = $( "#reeedr-body" ).height(); // height of the bookpanel
  //const previewMax = document.querySelector('.preview-label'); // height of the bookpanel
  const offlinebar = document.querySelector('#offline-notification'); // offline bar for tuckaway
  const navTop = toolcontainer.offsetTop; // distance from top edge
  const navMin = navTop / 4; // the delay before the title rolls on to the titlebar


  const maxpreview = totalbody-300;
  console.log('try this: ' + maxpreview);

  var lastScrollTop = 0; // set for updating to determine scroll direction
  function stickyNavigation() {
    //console.log('navTop = ' + navTop);
    //console.log('scrollY = ' + window.scrollY);
  //console.log('toolbaroffset = ' + toolbaroffset);
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (window.scrollY >= navTop) { // If scroll pos is greater than 418
      //console.log('scrollY = ' + window.scrollY + 'is greater than ' + navTop);
      toolcontainer.classList.add('fixed-nav'); // add class that fixes toolstrip in place
    } else {
      //console.log('scrollY = ' + window.scrollY + ' is less than ' + navTop);
      toolcontainer.classList.remove('fixed-nav');
    }

  /* minize brand bar on scroll */
  if (window.scrollY >= navMin) {
      brand.classList.add('min');
    } else {
      brand.classList.remove('min');
    }
  /*  //preview maxie - removed 24 mar 2020 - not being used for non=preview versions
  if (window.scrollY >= maxpreview) {
      previewMax.classList.add('min');
      console.log('scrollY = ' + window.scrollY + ' is more than ' + maxpreview);
    } else {
      previewMax.classList.remove('min');
      console.log('scrollY = ' + window.scrollY + ' is less than ' + maxpreview);
    }*/


  if (st > lastScrollTop && window.scrollY >= navTop) { // tuck the brandstrip away when scrolling down - reveal on up scroll
    brand.classList.add('tuckaway');
    toolstrip.classList.add('tuckaway');
    offlinebar.classList.add('tuckaway');   
  } else {
    brand.classList.remove('tuckaway');
    toolstrip.classList.remove('tuckaway');
    offlinebar.classList.remove('tuckaway');  
  }
    lastScrollTop = st <= 0 ? 0 : st; /* For Mobile or negative scrolling */
  }
    window.addEventListener('scroll', stickyNavigation);
  }
  scrollActions();

  /* ===  Mimic offline mode ===  */
  /*   http://10.48.101.187:7883/book.html?offline=1   */

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  var offline = getUrlVars()["offline"];
  var search = getUrlVars()["search"];
  console.log('Variable is: ' + search );

  function checkConnection(){
    if (offline == 1){
    //alert('You  are currently offline. Reconnect to the internet to access this item.');
    $('html').addClass('offline');
      } else {
    $('html').removeClass('offline');
    //alert('You  are currently online.');
    }
  }
  checkConnection();


  /* *****  Script for mimicking live 'in-book' search  **** */

  var i = 0;   

  function startSearch() { // triggered on 'Go' search
    //show search-body
    $('.search-body').css('display', 'block');
    $('#search-panel').css('position', 'relative');
    $('#reeedr-body').css('height', '100vh');
    $('#reeedr-body').css('overflow', 'hidden');
    //load search results from JSON
    fetch('search.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        myLoop(data);
      })
      .catch(function (err) {
        console.log('error: ' + err);
      });


  /* Load empty Skeletons for replacement with real results later  
  var mainContainer = document.getElementById("myData");
    var dt = document.createElement("dt");
        dt.appendChild(dth5);*/

  
  var magGlassSVG = "<svg class='svg-icon'><use fill='currentColor' href='#my-search'/></svg>"

  function myLoop(data) {           //  create a loop function
  var mainContainer = document.getElementById("myData");

    //$('#myData > dt').next('dt').style.border = "3px dashed green";

    setTimeout(function () {    //  call a 3s setTimeout when the loop is called
        
        var dta = document.createElement('a');
        var linkText = document.createTextNode(data[i].searchTitle);
        dta.appendChild(linkText);
        //dta.title = "Search result";
        dta.href = data[i].searchLink;
        //document.body.appendChild(a);


        // build the search result header <dt><h5>
        var dth5 = document.createElement("h5");
        dth5.className = "trim-singleline fade-inner";
        //dth5.innerHTML =  magGlassSVG + " - " + data[i].searchTitle;
        dth5.appendChild(dta);
        var dt = document.createElement("dt");
        dt.appendChild(dth5);
     
        // build the search result text <dd><p>

        var dd = document.createElement("dd");
        //var expand = document.createElement("input");
        //expand.className = "expand";
        //expand.type = "checkbox";
        //dd.appendChild(expand);

        var ddp = document.createElement("p");
        ddp.className = "trim-multiline fade-inner";
        //ddp.className = "fade-inner";

        ddp.innerHTML = data[i].searchDesc;
        dd.appendChild(ddp);


        // Inject new search result (with a slight delay)
        console.log("loop running");
        //mainContainer.prepend(dd);
        //mainContainer.prepend(dt);


        // replacer code DT
        var grabDtSkel = document.querySelector('#myData dt.skeleton');
        grabDtSkel.parentNode.replaceChild(dt, grabDtSkel); // switch it with real DT

        // replacer code DD
        var grabDdSkel = document.querySelector('#myData dd.skeleton');
        grabDdSkel.parentNode.replaceChild(dd, grabDdSkel); // switch it with real DD

        // create a new empty DT skeleton
        var nextDt = document.createElement('dt');
        nextDt.className = "skeleton";
        nextDt.innerHTML = '<h5 class="trim-singleline">  ...</h5>';;
        mainContainer.append(nextDt);

        // create a new empty DD skeleton
        var nextDd = document.createElement('dd');
        nextDd.className = "skeleton";
        nextDd.innerHTML = '<p class="trim-multiline">...</p>';
        mainContainer.append(nextDd);



      
        console.log('hello :# ' + i);         //  your code here
        console.log('Data length is: ' + data.length); 
        i++;                                  //  increment the counter
        if (i < data.length) {              //  if the counter < 10, call the loop function
          myLoop(data);   
          console.log("I'm in the loops !");  //  ..  again which will trigger another 
        }                        
      }, 1500)                                //  ..  setTimeout() delivers staggered results
      console.log("Loop done !");
    }
  }

