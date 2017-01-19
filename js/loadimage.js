$(document).ready(function() {
    var left_x = -175;
	var mid_x = 100;
	var right_x = 400;
	var placement = [0,0,0];
	var saved_context;
	var submit = 0;

	/* Default load Honoka */
	load_help();
	//tmp_load();
	load_idol();
	load_bg();
    $("#search").click(function() {
        var id = $("#get_by_id").val();
        $("#image-list").empty();
        $.getJSON('https://schoolido.lu/api/cards/'+id+'/', function(data) {
            $("#image-list").show();
            $("#image-list").append('<img src="'+data.transparent_image+'"style="width:'+184.32+'px; height:'+184.32+'px;display:inline-block;"/>');
        });
    });

    function search_by_id()
    {
        var id = $("#get_by_id").val();
        $("#image-list").empty();
        $.getJSON('http://schoolido.lu/api/cards/'+id+'/', function(data) {
            $("#image-list").show();
            $("#image-list").append('<img src="'+data.transparent_image+'"style="width:'+184.32+'px; height:'+184.32+'px;display:inline-block;"/>');
        });
    }

    function load_bg_tmp()
    {
        var d = new Date();
        var finish_time;
        var bg;
        $("#bg-list").show();
        $("#bg-list").css("overflow-y", "scroll");

        /* png */
        var begin_time = d.getTime()
        var url1 = 'https://maveys.github.io/assets/bg/bg (1).png';
        bg = new Image();
        bg.src = url1;
        console.log(bg.src);
        bg.onload = function() {
            $("#bg-list").append('<img src="'+ bg.src +'"style="width:'+bg.width*0.18+'px; height:'+bg.height*0.18+'px;display:inline-block;"/>');
            finish_time = d.getTime();
            console.log("START: "+begin_time);
            console.log("FINSIH: "+finish_time);
            console.log("PNG: " + (finish_time - begin_time));

        }

        /* jpg */
        begin_time = d.getTime();
        var url2 = 'https://maveys.github.io/assets/bg/test.jpg';
        bg = new Image();
        bg.src = url2;
        bg.onload = function() {
            $("#bg-list").append('<img src="'+ bg.src +'"style="width:'+bg.width*0.18+'px; height:'+bg.height*0.18+'px;display:inline-block;"/>');
            finish_time = d.getTime();
            console.log("START: "+begin_time);
            console.log("FINSIH: "+finish_time);
            console.log("JPG: " + (finish_time - begin_time));
        }
    }

	function tmp_load()
	{
			//$("#image-list").append('<ul>');
				//$("#bg-list").hide();
		var url = 'https://maveys.github.io/assets/girls/muse/honoka/honoka_01_01.png';
		var idol = new Image();
		idol.src = url;
		idol.src = url;
            	idol.onload = function() {
			var width = idol.width * 0.18;
			var height = idol.height * 0.18;
			$("#image-list").append('<img src="'+idol.src+'"style="width:'+width+'px; height:'+height+'px;display:inline-block;"/>');
            	}

	}
	function load_help()
	{
		var context = document.getElementById('scene').getContext('2d');
		var step_1 = "Step 1. Select a background image on the right.";
		var step_1_cont = "Selecting one will reset current scene.";
		var step_2 = "Step 2. Select a position then idol, default is left.";
		var step_2_cont = "One idol per position.";
		var step_3 = "Step 3. Enter text below.";
		var step_4 = "Step 4. Select speaker. There must be a speaker.";
		var step_5 = "Step 5. Click on 'Apply Text'.";
		var notice_1 = "All changes are final unfortunately meaning if there is a mistake";
		var notice_2 = "Either reselect another background or select restart";

		context.save();
		context.font = "25px motoyalmaruw3_mono";
		context.fillStyle = 'white';
		context.shadowColor = 'black';
		context.shadowOffsetX = 1;
		context.shadowOffsetY = 2;
		context.scale(1,1);
		context.fillText(step_1, 125, 25);
		context.fillText(step_1_cont, 225, 75);
		context.fillText(step_2, 125, 125);
		context.fillText(step_2_cont, 225, 175);
		context.fillText(step_3, 125, 225);
		context.fillText(step_4, 125, 325);
		context.fillText(step_5, 125, 425);
		context.fillText(notice_1, 125, 525);
		context.fillText(notice_2, 125, 575);
		context.restore();
	}

    function append_idol(index)
    {
        for(var i = 1; i <= index; i++) {
            var url = 'https://maveys.github.io/assets/girls/'+get_idol_group()+'/'+$("#idol-list").val()+'/'+$("#idol-list").val()+' ('+i+').png';
            $("#image-list").append('<img class="lazy" data-original="'+url+'"style="width:'+184.32+'px; height:'+184.32+'px;display:inline-block;"/>');
        }

            $(function() {
                $("#image-list img.lazy").lazyload({
                    effect: "fadeIn",
                    container:  $("#image-list"),
                });

            });

    }

    function load_idol()
    {
        var index = 0;
	    $("#image-list").empty();
	    $("#image-list").show();
	    $("#image-list").css({'overflow-y': 'scroll'});
        switch($("#idol-list").val()) {
            case 'eli':
                index = 42;
                break;
            case 'hanayo':
                index = 51;
                break;
            case 'honoka':
            case 'nico':
                index = 55;
                break;
            case 'kotori':
                index = 45;
                break;
            case 'maki':
            case 'rin':
                index = 46;
                break;
            case 'nozomi':
            case 'umi':
                index = 40;
                break;
            case 'chika':
                index = 19;
                break;
            case 'kanan':
                index = 15;
                break;
            case 'riko':
                index = 19;
                break;
            case 'dia':
                index = 22;
            case 'hanamaru':
                index = 14;
                break;
            case 'yohane':
                index = 21;
                break;
            case 'you':
                index = 20;
                break;
            case 'ruby':
            case 'mari':
                index = 17;
                break;
        }
        append_idol(index);
    }

	function load_idol_local()
	{
		var file_ext = {};
        file_ext[0]=".png";
		$.ajax({
			url: 'https://maveys.github.io/assets/girls/'+get_idol_group()+'/'+$("#idol-list").val()+'/',
			success: function(data) {
				//$("#image-list").append('<ul>');
				//$("#bg-list").hide();
				$("#image-list").empty();
				//$("#bg-list").empty();
				$("#image-list").show();
				$("#image-list").css("overflow-y", "scroll");

				$(data).find("a:contains(" + file_ext[0] + ")").each(function () {
					var filename = this.href.replace(window.location, "");
					var idol = new Image();
					idol.src = 'https://maveys.github.io/assets/girls/'+get_idol_group()+'/'+$('#idol-list').val()+'/'+filename;

					idol.onload = function() {
						$("#image-list").append('<img src="'+idol.src+'"style="width:'+idol.width*0.18+'; height:'+idol.height*0.18+';display:inline-block;"/>');
					}
				});
				//$("#image-list").append('</ul>');
			}
		});
	}

    function load_bg()
    {
        var bg;

        $("#bg-list").show();
        $("#bg-list").css("overflow-y", "scroll");
        for(var i = 1; i <= 100; i++) {
            var src = 'https://maveys.github.io/assets/bg/bg (' + i + ').jpg';
            $("#bg-list").append('<img class="lazy" data-original="'+ src +'"style="width:'+172.79999999999998+'px; height:'+115.19999999999999+'px;display:inline-block;"/>');
        }


            $(function() {
                $("#bg-list img.lazy").lazyload({
                    effect: "fadeIn",
                    container:  $("#bg-list"),
                });
            });
    }

	function load_bg_local()
	{
		var file_ext = {};
        file_ext[0]=".png";
		var src = 'https://maveys.github.io/assets/bg/001 - 2O1X0oi.png';
		$.ajax({
			url: src,
			success: function(data) {
			//$("#image-list").append('<ul>');
				//$("#image-list").empty();
				//$("#image-list").hide();
				$("#bg-list").empty();
				$("#bg-list").show();
				$("#bg-list").css("overflow-y", "scroll");
				//$(data).find("a:contains(" + file_ext[0] + ")").each(function () {
				//	var filename = this.href.replace(window.location, "");
					var bg = new Image();
					bg.src = src;//"https://mavveys.github.io/assets/bg/"+filename;

					bg.onload = function() {
						$("#bg-list").append('<img src="'+ bg.src +'"style="width:'+bg.width*0.18+'px; height:'+bg.height*0.18+'px;display:inline-block;"/>');
					}
			//});
			//$("#image-list").append('</ul>');
			}
		});
	}

	$("#restart").click(function() {
		var canvas = document.getElementById('scene')
		var context = canvas.getContext('2d');
		context.clearRect(0,0,canvas.width,canvas.height);
		load_help();
		reset();
	});

	function reset() {
		placement = [0,0,0];
        $("#speaker").prop('selectedIndex', 0);
        $("#speaker option").remove();
	}

	function get_idol_group()
	{
		var group = "muse";
		switch($("#idol-list").val()) {
			case 'chika':
			case 'riko':
			case 'you':
			case 'hanamaru':
			case 'ruby':
			case 'yohane':
			case 'dia':
			case 'kanan':
			case 'mari':
			    group = "aqours";
			    break;
		}
		return group;
	}

	/* Display all idols */
	$("#idol-list").change(function() {
        load_idol();
    });

	function add_idol_name()
	{
		var image = new Image();
		var context = document.getElementById('scene').getContext('2d');
		image.src = "https://maveys.github.io/assets/sprites/idol.png";

			image.onload = function() {
			context.drawImage(image, 100, 640 - 225);
			context.save();

			var text = $("#speaker").val();
			context.font = "25px motoyalmaruw3_mono";
			context.fillStyle = 'white';
			context.shadowColor = 'black';
			context.shadowOffsetX = 1;
			context.shadowOffsetY = 2;
			context.scale(1,1);
			context.fillText(text, 165, 450);
			context.restore();
		}
	}

	function add_text(context)
	{
		var text_1 = $("#story_text_1").val();
		var text_2 = $("#story_text_2").val();
		var text_3 = $("#story_text_3").val();
		context.save()
		context.font = "25px motoyalmaruw3_mono";
		context.fillStyle = 'white';
		context.shadowColor = 'black';
		context.shadowOffsetX = 1;
		context.shadowOffsetY = 2;
		context.scale(1,1);
		context.fillText(text_1, 125, 510);
		context.fillText(text_2, 125, 545);
		context.fillText(text_3, 125, 580);
		context.restore();

		add_idol_name();
	}

	$("#apply").click(function(){
		if($("#speaker").val() === "-1") {
			$("#error").html("*Please select a speaker.");
			return;
		}
		var image = new Image();
		var canvas = document.getElementById('scene');
		var context = canvas.getContext('2d');
		image.src = "https://maveys.github.io/assets/sprites/text.png";

		image.onload = function() {
			context.drawImage(image, 50,640 - 175, image.width - 100, image.height);
			add_text(context);
		};
		$("#error").html("");
	});

	/* Choose background */
	$("#bg-list").on('click','img',function(){
		//window.open(this.src);
		var canvas = document.getElementById('scene');
		var context = canvas.getContext('2d');
		//context.clearRect(0,0, canvas.width, canvas.height);

		var image = new Image();
		image.src = this.src;

		image.onload = function() {
			context.drawImage(image, 0, 0, image.width, image.height);
			reset();
        };
	});

	function add_speaker()
	{
		var speaker = $("#idol-list option:selected").text();
		$("#speaker").append($('<option></option>').val(speaker).html(speaker));

        /* Update later */
        $(".select option").each(function(){
            $(this).siblings("[value='"+ this.value+"']").remove();
        });
	}

	/* Choose idol */
	$("#image-list").on('click', 'img', function() {
		var canvas = document.getElementById('scene');
		var context = canvas.getContext('2d');

		var image = new Image();
		image.src = this.src;

		var width = $("#position").val();

		if(width == 0) {width = left_x;}
		else if(width == 1) {width = mid_x;}
		else {width = right_x;}

		image.onload = function() {
			if(placement[$("#position").val()] == 0){
				context.drawImage(image, width, 640 - (image.height * 0.7), image.width * 0.7, image.height * 0.7);
				placement[$("#position").val()] = 1;
				add_speaker();
				$("#error").html("");
			} else {
				$("#error").html("*Choose another position");
			}
		}
	});

	$("#download").on('click', function() {
		var canvas = document.getElementById('scene');
		var dataURL = canvas.toDataURL('image/png');
		dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
		dataURL = dataURL.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

		this.href = dataURL;
	});
});
