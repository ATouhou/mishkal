﻿$().ready(function() {

  $('#btn1').click( function() {
      $.getJSON(script+"/ajaxGet", {}, function(d){
        $("#rnd").text(d.rnd);
        $("#result").text(d.result);		
        $("#t").text(d.time);
      });
  }); 

 	$('#randomMaqola').click(function() {
      $.getJSON("http://maqola.org/site/widget?nolayout",  function(d){
     // $("#InputText").text(d.result+"Taha");
	 if (d) document.NewForm.InputText.value=d.body.replace(/<\/?[^>]+(>|$)/g, "");
	 else document.NewForm.InputText.value="TZA";
;
        //"#result").text(d.time);
      });	
	});	 
	
	$('#random').click(function() {
      $.getJSON(script+"/ajaxGet", {text:'',action:"RandomText"}, function(data){
       if (data) document.NewForm.InputText.value= data.result;
	   else document.NewForm.InputText.value="TZA";

      });	
	}); 
 
  $('#stripharakat').click( function() {
	//	$("#result").html("<pre>TATAH\nNTATAH</pre>");
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"StripHarakat"}, function(d){
      $("#result").html("<p>"+d.result+"</p>");
        //"#result").text(d.time);
      }); 
	        }); 
	  $('#csv2data').click( function() {
      $.getJSON(script+")s/ajaxGet", {text:document.NewForm.InputText.value,action:"CsvToData"}, function(d){
        $("#result").html("<pre>"+d.result+"</pre>");
        //"#result").text(d.time);
      });
  }); 
 //--------------------------------------
  $('#number').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"NumberToLetters"}, function(d){
        $("#result").html("<p>"+d.result+"</p>");
        //"#result").text(d.time);
      });
  }); 
//-------------------------------------- 
  $('#named').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"extractNamed"}, function(d){
        $("#result").html("<p>"+d.result+"</p>");
        //"#result").text(d.time);
      });
  }); 
  
  $('#numbred').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"extractNumbered"}, function(d){
        $("#result").html("<p>"+d.result+"</p>");
        //"#result").text(d.time);
      });
  });   
//--------------------------------------  
   $('#more').click( function() {
      $(".moresection").toggle();
      });
 // }); 
  
 //Unshape text 
    $('#unshape').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Unshape"}, function(d){
        $("#result").html("<p>"+d.result+"</p>");
      });
	  });
 //move result into input 
    $('#move').click( function() {
       document.NewForm.InputText.value=$("#result").text();
  });
   $('#stem').click( function() {
		$("#loading").slideDown();
        var $table = $('<table/>');
        var table = $table.attr( "border", "1" )[0];
        var headers = ["<tr>",
				"<th>المدخل</th>", "<th>تشكيل</th>",   "<th> دون إعراب تشكيل</th>","<th>الأصل</th>","<th>الزوائد</th>", "<th>الجذع</th>",
 "<th>الحالة الإعرابية</th>", "<th>النوع</th><th>النحوي</th>",
				"<th>شيوع</th>",
				"</tr>"
				].join('');
         $table.append( headers ); 
		var item="";
		$("#result").html( "" );
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"LightStemmer"}, function(d){
		for (k in d.result)
		{
		var tbody = document.createElement('tbody');
		if (d.result[k].length==0)
		{
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.appendChild(document.createTextNode( k) );
		tr.appendChild(td);
		for (j=0;j<7;j++)
		{
		var td = document.createElement('td');
		td.appendChild(document.createTextNode("-") );
		tr.appendChild(td);
		}
		tbody.appendChild(tr);
		}
		else
		{
	  for (i=0;i<d.result[k].length;i++)
		{
		var tr = document.createElement('tr');
		item=d.result[k][i];
		var td = document.createElement('td');
		td.appendChild(document.createTextNode( item['word']) );
		tr.appendChild(td);

		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['vocalized']) );
		tr.appendChild(td);
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['semivocalized']) );
		tr.appendChild(td);		
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['original']) );
		tr.appendChild(td);	
		td = document.createElement('td');
		td.appendChild(document.createTextNode(item['affix']) );
		tr.appendChild(td);
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['stem']) );
		tr.appendChild(td);
		// td = document.createElement('td');
		// td.appendChild(document.createTextNode( item['suffix']+'-'+item['encletic']) );
		// tr.appendChild(td);
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['tags']) );
		tr.appendChild(td);
		// td = document.createElement('td');
		// td.appendChild(document.createTextNode( item['root']) );
		// tr.appendChild(td);
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['type']) );
		tr.appendChild(td);	
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['syntax']) );
		tr.appendChild(td);			
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item['freq']) );
		tr.appendChild(td);			
		tbody.appendChild(tr);
		}
		}
		table.appendChild(tbody);
		}
		$("#result").append( $table );		
      });
	  $("#loading").slideUp();
  }); 
  
  
   $('#tokenize').click( function() {
		var item;
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Tokenize"}, function(d){
		$("#result").html( "" );
	  for (i=0;i<d.result.length;i++)
		{
		$("#result").append( d.result[i]+"<br/>" );
		}
      });
  }); 
  // inverse order
   $('#inverse').click( function() {
		var item;
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Inverse"}, function(d){
		$("#result").html( "" );
	  for (i=0;i<d.result.length;i++)
		{
		$("#result").append( d.result[i]+"<br/>" );
		}
      });
  });   
  
// Ajust an Arabic poetry in two columns  
   $('#poetry').click( function() {
        var $table = $('<table/>');
        var table = $table.attr( "border", "0" )[0];
		$table.attr( "width",'600');
		//$table.attr( "style",'text-align: justify; text-justify: newspaper; text-kashida-space: 100;”);
        var headers = ["<tr>",
				"<th>الصدر</th>", "<th>العجز</th>",
				"</tr>"
				].join('');
         $table.append( headers ); 
		var item;
		$("#result").html( "" );		
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Poetry"}, function(d){
       for (i=0;i<d.result.length;i++)
		{
		var tr = document.createElement('tr');	
		item=d.result[i];
		var td = document.createElement('td');
		td.appendChild(document.createTextNode( item[0]) );
		tr.appendChild(td);	
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item[1]) );
		tr.appendChild(td);
		table.appendChild(tr);
		}

		$("#result").append( $table );		

      });
  });   
 
  $('#romanize').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Romanize"}, function(d){
        $("#result").html("<p>"+d.result+"</p>");

      });
  });
  
   $('#contribute').click( function() {
      $.getJSON(script+"/ajaxGet", {text:$("#result").text(),action:"Contribute"}, function(d){
        alert(d.result);

      });
  });
  
  // normalize text
  $('#normalize').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Normalize"}, function(d){
        $("#result").html(d.result);

      });
  });    
    $('#wordtag').click( function() {
        var $table = $('<table/>');
        var $div = $('<div/>');		
       var div = $div[0];		
        var table = $table.attr( "border", "0" )[0];
		$table.attr( "width",'600');
		//$table.attr( "style",'text-align: justify; text-justify: newspaper; text-kashida-space: 100;”);
        var headers = ["<tr>",
				"<th>الكلمة</th>", "<th>تصنيفها</th>",
				"</tr>"
				].join('');
		
         $table.append( headers ); 
		$("#result").html( "" );
		var item;
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Wordtag"}, function(d){
		$("#result").html("" );
	  for (i=0;i<d.result.length;i++)
		{
			
		item=d.result[i];
		var span = document.createElement('span');
		//span.appendChild(document.createTextNode(  item.word) );
		//div.appendChild(span);	
		//span = document.createElement('span');
		span.setAttribute('class',item.tag);
		span.appendChild(document.createTextNode(" "+item.word) );
		div.appendChild(span);


		//display as table
		var tr = document.createElement('tr');
		var td = document.createElement('td');		
		td.appendChild(document.createTextNode(  item.word) );
		tr.appendChild(td);	
		td = document.createElement('td');
		td.setAttribute('class',item.tag);
		td.appendChild(document.createTextNode(item.tag) );
		tr.appendChild(td);
		table.appendChild(tr);
//		$("#result").append(+"  "++"<br/>" );
		}
		$("#result").append($div );
		$("#result").append($table );
		});
		

  });
  
  
      $('#language').click( function() {
        var $div = $('<div/>');		
       var div = $div[0];		
		$("#result").html( "" );
		var item;
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Language"}, function(d){
		$("#result").html("" );
	  for (i=0;i<d.result.length;i++)
		{
			
		item=d.result[i];
		var span = document.createElement('span');
		span.setAttribute('class',item[0]);
		span.appendChild(document.createTextNode(item[1]) );
		div.appendChild(span);
		}
		$("#result").append($div );
		});
		

  });
  
        $('#latexlanguage').click( function() {
        var $div = $('<pre/>');		
       var div = $div[0];
	   var txt="";
		$("#result").html( "" );
		var item;
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Language"}, function(d){
		$("#result").html("" );
	  for (i=0;i<d.result.length;i++)
		{
			
		item=d.result[i];
		var span = document.createElement('span');
		span.setAttribute('class',item[0]);
		if (item[0]=='arabic') txt="\\AR{"+item[1]+"}";
		else txt=item[1];
		
		span.appendChild(document.createTextNode(txt) );
		div.appendChild(span);
		}
		$("#result").append($div );
		});
		

  });
  
  //Latex some features
  $('#itemize').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Itemize"}, function(d){
        $("#result").html("<pre>"+d.result+"</pre>");

      });
 });
 
  $('#tabulize').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Tabulize"}, function(d){
        $("#result").html("<pre>"+d.result+"</pre>");

      });
  }); 

  $('#tabbing').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Tabbing"}, function(d){
        $("#result").html("<pre>"+d.result+"</pre>");

      });
  }); 
  
  
// generate all affixation form of a word  
    $('#affixate').click( function() {
        var $table = $('<table/>');
        var table = $table.attr( "border", "0" )[0];
		$table.attr( "width",'600');
		//$table.attr( "style",'text-align: justify; text-justify: newspaper; text-kashida-space: 100;”);
        var headers = ["<tr>",
				"<th>الكلمة</th>", "<th>تقطيعها</th>",
				"</tr>"
				].join('');
         $table.append( headers ); 
		 		$("#result").html( "" );
		var item;
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"Affixate"}, function(d){
		$("#result").html("" );
	  for (i=0;i<d.result.length;i++)
		{
		var tr = document.createElement('tr');	
		item=d.result[i];
		var td = document.createElement('td');
		td.appendChild(document.createTextNode(  item.standard) );
		tr.appendChild(td);	
		td = document.createElement('td');
		td.appendChild(document.createTextNode( item.affixed) );
		tr.appendChild(td);
		table.appendChild(tr);
		
//		$("#result").append(+"  "++"<br/>" );
		}
		$("#result").append($table );
		});
  });  
  $('#btn2').click( function() {
      $.getJSON(script+"/ajaxToUpper", {text:document.myForm.typedTxt.value},function(d){
        $("#u").text(d);
      });

      $.getJSON(script+"/ajaxSplit", {by:'-',text:document.myForm.typedTxt.value},function(d){
        var ul=$("#s");
        ul.html('');
        for (var i in d){
          var li=$("<li/>").html(d[i]).appendTo(ul);
        }

      });

    });
   $('#tashkeel2').click( function() {

      $.getJSON(script+"/ajaxGet", {text:ocument.NewForm.InputText.value,action:"Tashkeel"}, function(d){
      $("#result").html("<p class=\'tashkeel\'>"+d.result+"</p>");
	  $("#contributeSection").show();
	  $("#help").hide();
      });
   });
    $('#reducetashkeel').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"ReduceTashkeel"}, function(d){
      $("#result").html("<p class=\'tashkeel\'>"+d.result+"</p>");
	  $("#contributeSection").show();
	  	  $("#help").hide();
      });
   });
    $('#comparetashkeel').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"CompareTashkeel"}, function(d){
      var table=d.result;
	  $("#result").html("<p class=\'tashkeel\'>"+table+"</p>");
      });
   });
	
    $('#showCollocations').click( function() {
      $.getJSON(script+"/ajaxGet", {text:document.NewForm.InputText.value,action:"showCollocations"}, function(d){
      var table=d.result;
	  $("#result").html("<p class=\'tashkeel\'>"+table+"</p>");
      });
   });	
   $('#tashkeel').click( function() {
		var collocation=1;
		// var SEPARATOR="###";
	    $("#help").hide();
		var vocalizewWordsEnds="0";
		if (document.NewForm.LastMark.checked == 1)
			vocalizewWordsEnds = "1";
		//alert('Taha '+Ignore); 
		var inputText=document.NewForm.InputText.value;
		inputText=inputText.replace(/(\.+)/g,"\$1\n");
		// replace all spaces to save it in the output
		// in order to keep the same typography 
		// inputText=inputText.replace(/ /g,SEPARATOR); 
		var textlistOne=inputText.split('\n');
		$("#result").html("");
		$("#loading").show();
		$('#loading').data('length',0);
		var textlist=new Array();
		for (var i=0;i<textlistOne.length;i++)
		{
		if (textlistOne[i]!="") textlist.push(textlistOne[i]);
		}
		$('#loading').data('length',textlist.length);		
		for (var i=0;i<textlist.length;i++)
		{
		// split inputtext into lines and clauses

		// add dots to save the phrases number.
	   $("#loading").html($("#loading").html()+".");
      $.getJSON(script+"/ajaxGet", {text:textlist[i],action:"Tashkeel2", order:i.toString(), lastmark:vocalizewWordsEnds}, function(d){
      //$("#result").html("<p class=\'tashkeel\'>"+d.result+"</p>");
	   console.log(d);


	  var text="";
	  var id=parseInt(d.order);
	  var openColocation=0;
	 for ( var i=0;i<d.result.length;i++)
		{
		item=d.result[i];
		var currentId=id*100+i;
		//text+=currentId.toString();
		if (item.chosen.indexOf("~~")>=0) 
		{// handle collocations
		openColocation=0;
		text+="</span><span class='collocation' title='دقّق تشكيل هذه العبارة'>"+item.chosen.replace("~~","");
		}		
		else if (item.chosen.indexOf("~")>=0) 
		{// handle collocations

		if (openColocation==0){openColocation=1;text+=item.chosen.replace("~","")+" <span class='collocation' title='دقّق تشكيل هذه العبارة'>";}
		else {
			openColocation=0;
			text+="</span>"+item.chosen.replace("~","");
			}
		}
		else
		{
		var pattern=/[-[\]{}()*+?.,،:\\^$|#\s]/;
		if (!pattern.test(item.chosen)) text+=" ";
		// item.chosen=item.chosen.replace(SEPARATOR,' '); 
		// if (item.chosen==SEPARATOR) text+=" ";
		// else  
		text+="<span class='vocalized' id='"+currentId+"'>"+item.chosen+"</span>";
		//text+=" <span>"+item.chosen+"</span>";
		$('#result').data(currentId.toString(), item.suggest);
		}
		}
		// display the result
		$("#loading").data(d.order, text);
      $("#result").html($("#result").html()+"<p class=\'tashkeel\'>"+text+"</p>");

		// dela dot, to count the phrase executed
			$("#loading").html($("#loading").html().replace('.',''));
			if ($("#loading").html().indexOf('.')<0)
			{// if no dot, the work is terminated
			// redraw the text result with order
			//$('#result').html('');
			var ordredtext="";
			for (var j=0; j<$("#loading").data('length'); j++)
			{
			ordredtext+="<br/>"+$("#loading").data(j.toString());
			}
			$('#result').html("<p class=\'tashkeel\'>"+ordredtext+"</p>");
			$("#loading").hide();
			}
      
      });

	}	  // end for i intextlist
	  	  $("#contributeSection").show();
		
    }); 
	
	
  $('.vocalized').live("click", function() {

  $(".txkl").change();
     //$("#vocalized").slideDown("slow");
	 var myword=$(this);
      //$.getJSON(script+"/ajaxGet", {text:myword.html(),action:"AssistantTashkeel"}, function(d){
	var id=myword.attr('id');
	var list=$("#result").data(id).split(';');
	var text="<select class='txkl' id='"+id+"'>";
		//text+="<option selected>"+myword.text()+"</option>";
	var	cpt=0;
	 for ( i in list)
		{
		if (list[i]!="")
			{
			if (myword.text()!=list[i])
			text+="<option>"+list[i]+"</option>";
			else text+="<option selected="+list[i]+">"+list[i]+"</option>";
			cpt+=1;
			}
		}
		text+="<option><strong>تعديــل...</strong></option>";
		text+="</select>";

	// disable others suggestion lists	
	 //$(".txkl").change();
	 if (cpt>1)  {
				myword.replaceWith(text);
				}
	else { 
		text="<input type='text' class='txkl'  size='10' id='"+myword.attr('id')+"' value='"+myword.text()+"'/>";
		myword.replaceWith(text);

		}	
   		
     // });
	
	 });

 
   $('.txkl').live('change',function() {
	if ($(this).val()!="تعديــل...")
	{
	var text="<span class='vocalized' id='"+$(this).attr('id')+"'>"+$(this).val()+"</span>";
	 $(this).replaceWith(text);	 
	 }
	 else // case of editing other choice
	 {
		var list=$("#result").data($(this).attr('id')).split(';');
		
	 		text="<input type='text' class='txkl'  size='10' id='"+$(this).attr('id')+"' value='"+list[0]+"'/>";
		$(this).replaceWith(text);	
	 }
	 });

   $('.collocation').live('change',function() {
      $.getJSON(script+"/ajaxGet", {text:$(this).text(),action:"Contribute"}, function(d){
        //alert(d.result);
		});
		});
		
		
	// spell checking
	$('#spellcheck').click( function() {
		var collocation=1;
		// var SEPARATOR="###";
	    $("#help").hide();
		var vocalizewWordsEnds="0";
		if (document.NewForm.LastMark.checked == 1)
			vocalizewWordsEnds = "1";
		//alert('Taha '+Ignore); 
		var inputText=document.NewForm.InputText.value;
		inputText=inputText.replace(/(\.+)/g,"\$1\n");
		// replace all spaces to save it in the output
		// in order to keep the same typography 
		// inputText=inputText.replace(/ /g,SEPARATOR); 
		var textlistOne=inputText.split('\n');
		$("#result").html("");
		$("#loading").show();
		$('#loading').data('length',0);
		var textlist=new Array();
		for (var i=0;i<textlistOne.length;i++)
		{
		if (textlistOne[i]!="") textlist.push(textlistOne[i]);
		}
		$('#loading').data('length',textlist.length);		
		for (var i=0;i<textlist.length;i++)
		{
		// split inputtext into lines and clauses

		// add dots to save the phrases number.
	   $("#loading").html($("#loading").html()+".");
      $.getJSON(script+"/ajaxGet", {text:textlist[i],action:"SpellCheck", order:i.toString(), lastmark:vocalizewWordsEnds}, function(d){
      //$("#result").html("<p class=\'tashkeel\'>"+d.result+"</p>");
	   console.log(d);


	  var text="";
	  var id=parseInt(d.order);
	  var openColocation=0;
	 for ( var i=0;i<d.result.length;i++)
		{
		item=d.result[i];
		var currentId=id*100+i;
		//text+=currentId.toString();
		if (item.chosen.indexOf("~~")>=0) 
		{// handle collocations
		openColocation=0;
		text+="</span><span class='collocation' title='دقّق تشكيل هذه العبارة'>"+item.chosen.replace("~~","");
		}		
		else if (item.chosen.indexOf("~")>=0) 
		{// handle collocations

		if (openColocation==0){openColocation=1;text+=item.chosen.replace("~","")+" <span class='collocation' title='دقّق تشكيل هذه العبارة'>";}
		else {
			openColocation=0;
			text+="</span>"+item.chosen.replace("~","");
			}
		}
		else
		{
		var pattern=/[-[\]{}()*+?.,،:\\^$|#\s]/;
		if (!pattern.test(item.chosen)) text+=" ";
		// item.chosen=item.chosen.replace(SEPARATOR,' '); 
		// if (item.chosen==SEPARATOR) text+=" ";
		// else 

		if (item.suggest!='')
		text+="<span class='spelled-incorrect' id='"+currentId+"'>"+item.chosen+"</span>";
		else text+="<span class='spelled' id='"+currentId+"'>"+item.chosen+"</span>";
		//text+=" <span>"+item.chosen+"</span>";
		$('#result').data(currentId.toString(), item.suggest);
		}
		}
		// display the result
		$("#loading").data(d.order, text);
      $("#result").html($("#result").html()+"<p class=\'spellStyle\'>"+text+"</p>");

		// dela dot, to count the phrase executed
			$("#loading").html($("#loading").html().replace('.',''));
			if ($("#loading").html().indexOf('.')<0)
			{// if no dot, the work is terminated
			// redraw the text result with order
			//$('#result').html('');
			var ordredtext="";
			for (var j=0; j<$("#loading").data('length'); j++)
			{
			ordredtext+="<br/>"+$("#loading").data(j.toString());
			}
			$('#result').html("<p class=\'spellStyle\'>"+ordredtext+"</p>");
			$("#loading").hide();
			}
      
      });

	}	  // end for i intextlist
	  	  $("#contributeSection").show();
		
    }); 
	
	
	
	  $('.spelled-incorrect').live("click", function() {

  $(".txkl").change();
     //$("#vocalized").slideDown("slow");
	 var myword=$(this);
      //$.getJSON(script+"/ajaxGet", {text:myword.html(),action:"AssistantTashkeel"}, function(d){
	var id=myword.attr('id');
	var list=$("#result").data(id).split(';');
	var text="<select class='txkl' id='"+id+"'>";
		//text+="<option selected>"+myword.text()+"</option>";
	var	cpt=0;
	 for ( i in list)
		{
		if (list[i]!="")
			{
			if (myword.text()!=list[i])
			text+="<option>"+list[i]+"</option>";
			else text+="<option selected="+list[i]+">"+list[i]+"</option>";
			cpt+=1;
			}
		}
		text+="<option><strong>تعديــل...</strong></option>";
		text+="</select>";

	// disable others suggestion lists	
	 //$(".txkl").change();
	 if (cpt>1)  {
				myword.replaceWith(text);
				}
	else { 
		text="<input type='text' class='txkl'  size='10' id='"+myword.attr('id')+"' value='"+myword.text()+"'/>";
		myword.replaceWith(text);

		}	
   		
     // });
	
	 });



});
//});
