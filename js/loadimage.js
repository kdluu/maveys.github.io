$(document).ready(function() {
    var left_x = -175;
	var mid_x = 100;
	var right_x = 400;
	var placement = [0,0,0];
    var position_as_int = 0;
    var position_as_string = "left";
    var num_of_images = {
    	'eli': 42,
    	'hanayo': 51,
    	'honoka': 55,
    	'nico': 55,
    	'kotori': 45,
    	'maki': 45,
    	'rin': 46,
    	'nozomi': 40,
    	'umi': 40,
    	'chika': 18,
    	'kanan': 15,
    	'riko': 19,
    	'dia': 22,
    	'hanamaru': 14,
    	'yohane': 21,
    	'you': 20,
    	'ruby': 17,
    	'mari': 17
    };
    var bg = new Image();
    var left_img = new Image();
    var right_img = new Image();
    var middle_img = new Image();
    var canvas_layout = {
        background: "",
        left_image: "",
        middle_image: "",
        right_image: "",
        speaker_left: "",
        speaker_middle: "",
        speaker_right: ""
    };
    var imgs = [];
    var img_count = 0;

	load_bg();

/*****************************************************************************************************************
LOADING IDOL IMAGE FUNCTIONS
*****************************************************************************************************************/
/* Displays all idol images in div */
function append_idol(index, position)
{
    document.getElementById('fade').style.display="block";
    document.getElementById('image-list').style.display="block";

    var group = get_idol_group(position_as_string);
    var idol = $("#idol-list-"+position_as_string).val();
    for(var i = 1; i <= index; i++) {
        var url = 'https://maveys.github.io/assets/girls/'+group+'/'+idol+'/'+idol+' ('+i+').png';
        console.log(url);
        $("#image-list").append('<img class="lazy" data-original="'+url+'"style="width:'+184.32+'px; height:'+184.32+'px;display:inline-block;"/>');
    }

    $(function() {
        $("#image-list img.lazy").lazyload({
            effect: "fadeIn",
            container:  $("#image-list"),
        });
    });

    $('#close').on('click', function() {
        close_image_window();
    });
}

/* Calls append_idol to display idols to choose to place at give position */
function load_idol(position)
{
    position_as_int = position;
    switch(position) {
        case 0:
            position_as_string =  "left";
            break;
        case 1:
            position_as_string = "middle";
            break;
        case 2:
            position_as_string = "right";
            break;
    }
    $("#image-list").empty();
    $("#image-list").show();
    $("#image-list").css({'overflow-y': 'scroll'});
    append_idol(num_of_images[$("#idol-list-"+position_as_string).val()], position);
}

/* Applies chosen Idol to canvas */
$("#image-list").on('click', 'img', function() {
    var canvas = document.getElementById('scene');
    var context = canvas.getContext('2d');

    var image = new Image();
    image.src = this.src;

    var width = position_as_int;
    switch(position_as_string) {
        case "left":
            canvas_layout.left_image = image.src;
            canvas_layout.speaker_left = $("#idol-list-"+position_as_string+" option:selected").text();
            left_img.src = image.src;
            break;
        case "middle":
            canvas_layout.middle_image = image.src;
            canvas_layout.speaker_middle = $("#idol-list-"+position_as_string+" option:selected").text();
            middle_img.src = image.src;
            break;
        case "right":
            canvas_layout.right_image = image.src;
            canvas_layout.speaker_right = $("#idol-list-"+position_as_string+" option:selected").text();
            right_img.src = image.src;
            break;
    }
    pre_load();
    close_image_window();
});

function get_idol_group(position)
{
    var group = "muse";
    switch($("#idol-list-"+position).val()) {
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

/* Display all idols based on position */
$("#idol-list-left").change(function() {
    if ($("#idol-list-left").val() === "none") {
        left_img.src = "";
        canvas_layout.left_image = "";
        canvas_layout.speaker_left = "";
        pre_load();
        return;
    }
    load_idol(0);
});

$("#idol-list-middle").change(function() {
    if ($("#idol-list-middle").val() === "none") {
        middle_img.src = "";
        canvas_layout.middle_image = "";
        canvas_layout.speaker_middle = "";
        pre_load();
        return;
    }
    load_idol(1);
});

$("#idol-list-right").change(function() {
    if ($("#idol-list-right").val() === "none") {
        right_img.src = "";
        canvas_layout.right_image = "";
        canvas_layout.speaker_right = "";
        pre_load();
        return;
    }
    load_idol(2);
});

/*****************************************************************************************************************
LOADING BACKGROUND IMAGE FUNCTIONS
*****************************************************************************************************************/
/* Loads backgrounds to allow users to choose from */
function load_bg()
{
    document.getElementById('fade').style.display="block";
    document.getElementById('bg-list').style.display="block";
    $("#cancel").append('<button type="button" id="close">Close</button>');
    $("#image-list").append('<br>');
    $('#close').on('click', function() {
        close_image_window();
    });
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

/* Applies Background to the canvas */
$("#bg-list").on('click','img',function(){
    //window.open(this.src);
    var canvas = document.getElementById('scene');
    var context = canvas.getContext('2d');
    //context.clearRect(0,0, canvas.width, canvas.height);

    var image = new Image();
    image.src = this.src;
    canvas_layout.background = image.src;
    bg.src = image.src;
    image.onload = function() {
        context.drawImage(image, 0, 0, image.width, image.height);
        $("#speaker").find('option').not(':first').remove();
        document.getElementById('idol-list-left').selectedIndex = 19;
        document.getElementById('idol-list-middle').selectedIndex = 19;
        document.getElementById('idol-list-right').selectedIndex = 19;
        close_image_window();
    };
});

/* When changing bg, reload */
$("#change_bg").click(function() {
    canvas_layout = {
        background: "",
        left_image: "",
        middle_image: "",
        right_image: "",
        speaker_left: "",
        speaker_middle: "",
        speaker_right: ""
    };
    load_bg();
});

/* Renders canvas after image changes, i.e. Idol, bg, or text changes */
function render_canvas()
{
    var canvas = document.getElementById('scene');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var width;
    var image = new Image();
    image.src = bg.src;
    context.drawImage(image, 0, 0, image.width, image.height);
    if (left_img.src != "") {
        image.src = imgs[1].src;
        width = left_x;
        context.drawImage(imgs[1], width, 640 - (imgs[1].height * 0.7), imgs[1].width * 0.7, imgs[1].height * 0.7);
    }
    if (middle_img.src != "") {
        image.src = imgs[2].src;
        width = mid_x;
        context.drawImage(imgs[2], width, 640 - (image.height * 0.7), image.width * 0.7, image.height * 0.7);
    }
    if (right_img.src != "") {
        image.src = imgs[3].src;
        width = right_x;
        context.drawImage(imgs[3], width, 640 - (imgs[3].height * 0.7), imgs[3].width * 0.7, imgs[3].height * 0.7);
    }
}
/*****************************************************************************************************************
APPLYING TEXT AND SPEAKER FUNCTIONS
*****************************************************************************************************************/
/* Append Idol Name as an options */
function add_speaker()
{
    $("#speaker").find('option').not(':first').remove();
    if(canvas_layout.speaker_left != "")  $("#speaker").append($('<option></option>').val(canvas_layout.speaker_left).html(canvas_layout.speaker_left));
        console.log('added: ' + canvas_layout.speaker_left);
    if(canvas_layout.speaker_middle != "") $("#speaker").append($('<option></option>').val(canvas_layout.speaker_middle).html(canvas_layout.speaker_middle));
        console.log('added: ' + canvas_layout.speaker_middle);
    if(canvas_layout.speaker_right != "") $("#speaker").append($('<option></option>').val(canvas_layout.speaker_right).html(canvas_layout.speaker_right));
        console.log('added: ' + canvas_layout.speaker_right);
}

/* Applies Idol name to the canvas */
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

/* Applies text to the canvas - Why am I passing in context? */
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
    add_idol_name();
    for (var i = 0; i < text_1.length; i++) {
        context.fillText(text_1[i], 125 + (i * 15)  , 510);
    }
    for (var i = 0; i < text_2.length; i++) {
        context.fillText(text_2[i], 125 + (i * 15), 545);
    }
    for (var i = 0; i < text_3.length; i++) {
        context.fillText(text_3[i], 125 + (i * 15), 580)
    }
    context.restore();
}

/* Applies text and speaker name to the canvas */
$("#apply").click(function(){
    if($("#speaker").val() === "-1") {
        $("#error").html("*Please select a speaker.");
        return;
    }
    var image = new Image();
    var canvas = document.getElementById('scene');
    var context = canvas.getContext('2d');
    render_canvas();
    image.src = "https://maveys.github.io/assets/sprites/text.png";

    image.onload = function() {
        context.drawImage(image, 50,640 - 175, image.width - 100, image.height);
        add_text(context);
    };
    var dataURL = canvas.toDataURL();
    document.getElementById('scene').src = dataURL;
    $("#error").html("");
});

/*****************************************************************************************************************
MAINAINANCE FUNCTIONS
*****************************************************************************************************************/
function close_image_window() {
    document.getElementById('image-list').style.display='none';
    document.getElementById('bg-list').style.display='none';
    document.getElementById('fade').style.display='none';
}

function get_num_loaded_images()
{
    var count = 0;

    if (canvas_layout.background != "") count++;
    if (canvas_layout.left_image != "") count++;
    if (canvas_layout.middle_image != "") count++;
    if (canvas_layout.right_image != "") count++;

    return count;
}

function pre_load() {
    imgs = [];
    img_count = 0;
    for (var i = 0; i < 4 ; i++) {
        var image = new Image();
        var repeat = false;
        imgs.push(image);
        image.onload = function() {
            if (repeat) return;
            render_canvas();
            add_speaker();
            repeat = true;
        }
        switch (i) {
            case 0:
                image.src = canvas_layout["background"];
                break;
            case 1:
                image.src = canvas_layout["left_image"];
                break;
            case 2:
                image.src = canvas_layout["middle_image"];
                break;
            case 3:
                image.src = canvas_layout["right_image"];
                break;
        }
    }
}

function reset() {
    placement = [0,0,0];
    $("#speaker").prop('selectedIndex', 0);
    var select = document.getElementById("speaker");
    for(var i = 1; i < select.length; i++) {
        console.log(select.remove(i));
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

$("#restart").click(function() {
    var canvas = document.getElementById('scene')
    var context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width,canvas.height);
    load_help();
    reset();
});

/*****************************************************************************************************************
IMAGE DOWNLOAD FUNCTIONS
*****************************************************************************************************************/

	$("#download").on('click', function() {
		var canvas = document.getElementById('scene');
		var dataURL = canvas.toDataURL('image/png');
// 		if(canvas.msToBlob) {
// 				var binary = atob(dataURL.split(',')[1]);
// 				var array = [];
// 				for( var i = 0; i < binary.length; i++) {
// 					array.push(binary.charCodeAt(i));
// 				}
// 				var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
// 				window.navigator.msSaveOrOpenBlob(blob, "scenario.png");
// 			} else {
// 				this.href = dataURL;
// 		}
		var img = new Image();
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = dataURL;
		this.href = dataURL;
	});
});


/*****************************************************************************************************************
LOCAL TESTING FUNCTIONS
*****************************************************************************************************************/

/*
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
*/
